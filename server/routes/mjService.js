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

    data.invoiceNo = getlatestBillNo(data.pType) + 1

    let date = new Date();
    const folderName = `/Users/rajudaroga//Documents/${date.getFullYear()}`

    let fileName = data.customerDetails.name + date.getDay() +date.getDate()+(date.getMonth()+1)+date.getFullYear()+date.getTime()

    let month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

    let type = data.pType

    let currentFolder = folderName +"/"+month[date.getMonth()]+"/"+type.toUpperCase()+"/"

    try {
        if (!fs.existsSync(currentFolder)) {
          fs.mkdirSync(currentFolder)
        }
      } catch (err) {
        console.error(err)
    }

    if(date.getDate() !== 1){

    }
    

    getTemplateHtml().then(async (res) => {

        console.log("inside getTemplate");

        const template = hb.compile( res, { strict : true });

        console.log("PDF GENERATED1", template)

        const result = template(data);

        const html = result;

        const browser = await puppeteer.launch();
        const page = await browser.newPage()

        await page.setContent(html)
        const fullPath = currentFolder + fileName + '.pdf'
        await page.pdf({path : fullPath, format : 'A4'})
        await browser.close();
        console.log("PDF GENERATED")
        // saveRecordOnDatabase(data);
        saveRecordOnJSONFile(data)

    }).catch ( err => {
        console.log("ERROR in get html", err)
    })
}

const saveData = function (data) {
    const dataJSON = JSON.stringify(data);
    fs.writeFileSync('./resources/sample.json', dataJSON)
}

const saveRecordOnJSONFile = function (newdata) {
    
    let data = loadData()
    data.push(JSON.parse(JSON.stringify(newdata).replace('",]','"]').replace('",}','"}')))
    saveData(data)
    console.log("Data saved successfully")  
}

const getlatestBillNo = function (type) {
    
    
    let list = []
    let data = loadData()
    data.map(key => {
        if(key.pType === type)
            list.push(key.invoiceNo)
    })
    
    return Math.max(...list) 
}


async function saveRecordOnDatabase(data) {
    console.log(JSON.stringify(data))
    // const dataJSON = JSON.stringify(data);
    const alien = new mjModel({
        customerDetails:{
            name: data.customerDetails.name,
            address: data.customerDetails.address,
            mob: data.customerDetails.mob,
            gstNO: data.customerDetails.gstNO,
            pan: data.customerDetails.pan
         },
         productDetails: data.productDetails,
         other:{
            total: data.other.total,
            cgst: data.other.cgst,
            sgst: data.other.sgst,
            discount: data.other.discount,
            netAm: data.other.netAm,
            inWords: data.other.inWords,
            mode: data.other.mode
         },
         invoiceNo: data.invoiceNo,
         date: data.date
    })

    try{
        const a1 =  await alien.save() 
        
    }catch(err){
        console.log("ERROR in DB INSERTION", err)
    }
    console.log("Record Saved")
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
    res.send("true")
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

router.get('/getInvoiceDetails/', (req, res) => {
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