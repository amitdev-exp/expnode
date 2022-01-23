import  express from 'express'
const router = express.Router()
import mjModel from "../models/modelSchema.js"
import path from 'path'
import fs from 'fs'
import puppeteer from 'puppeteer';
import hb from 'handlebars';
// import template from "../resources/template.html"
import utils from 'util'
const readFile = utils.promisify(fs.readFile) 


async function getTemplateHtml(){
    console.log("Loading html file");
    try{
        const invoicePath = path.resolve("../server/resources/template.html")
        console.log("invoice path ", invoicePath)
        return await readFile(invoicePath, 'utf8')
        // return await fs.readFileSync('./resources/template.html')
    } catch (err){
       return Promise.reject("Failed to load html")
    }
}

async function generatedPdf( record) {
    let data = record
    // let data = {
    //     "customerDetails":{
    //        "name":"Amit Vishwakarma",
    //        "address":"Bramha Vishnu Mahesh Kurar Village malad east mumbai 400097",
    //        "mob":"8286683323",
    //        "gstNO":"443664364663",
    //        "pan":"AFFD453455"
    //     },
    //     "productDetails":{
           
    //           "sn1":"1",
    //           "productName1":"Gold Ornament",
    //           "gw1":"1.5",
    //           "nw1":"1.5",
    //           "rpu1":"2.5",
    //           "amount1":"3000",
    //     //    },
    //     //    {
    //           "sn2":"2",
    //           "productName2":"Ear Ring",
    //           "gw2":"1.5",
    //           "nw2":"1.5",
    //           "rpu2":"2.5",
    //           "amount2":"3000"
    //     //    }
    //     },
    //     "other":{
    //        "total":"6000.00",
    //        "cgst":"90.00",
    //        "sgst":"90.00",
    //        "discount":"80.00",
    //        "netAm":"6100.00",
    //        "inWords":"Rupees Six thousand only",
    //        "mode":"Cash"
    //     },
    //     "invoiceNo":"12343",
    //     "date":"22/01/2022"
    //  };

    getTemplateHtml().then(async (res) => {

        console.log("inside getTemplate");

        const template = hb.compile( res, { strict : true });

        console.log("PDF GENERATED1", template)

        const result = template(data);

        const html = result;

        const browser = await puppeteer.launch();
        const page = await browser.newPage()

        await page.setContent(html)
        await page.pdf({path : 'invoice1.pdf', format : 'A4'})
        await browser.close();
        console.log("PDF GENERATED")

    }).catch ( err => {
        console.log("ERROR in get html", err)
    })
}

const saveData = function (data) {
    const dataJSON = JSON.stringify(data);
    fs.writeFileSync('./resources/sample.json', dataJSON)
}

const loadData = function () {
    try {
        let databuffer = fs.readFileSync('./resources/sample.json')
        let data = databuffer.toString();
        return JSON.parse(data)

    } catch (e) {
        console.log(e);
    }
}

router.post('/pdf/generatePDF/', async (req, res) => { 
    let temp = req.body
    await generatedPdf(temp)
    console.log("Done")
})

router.get('/readMj/', async(req,res) => {
    console.log("i am inside id one")
    try{
           const aliens = await mjModel.find()
           res.json(aliens)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/readMj/:id', async(req,res) => {
    console.log("i am inside id 2")
    try{
           const alien = await mjModel.findById(req.params.id)
           res.json(alien)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/writeMj/', async(req,res) => {
    console.log("i am inside id 3")
    console.log("")
    const alien = new mjModel({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try{
        const a1 =  await alien.save() 
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})

router.patch('/readMj/:id',async(req,res)=> {
    try{
        console.log("i am inside id 4")
        const alien = await mjModel.findById(req.params.id) 
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)   

    }catch(err){
        console.log("err")
    }

})

router.get('/api/readData/', (req, res) => {
    const data = loadData();
    res.send(data);
});

router.post('/api/writeData/', (req, res) => {

    console.log("data", req.query)
    let data = loadData()
    data.push(JSON.parse(req.query.value))
    saveData(data)
    res.send("Data saved successfully");
});

export default router