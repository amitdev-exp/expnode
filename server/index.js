const express = require('express')
const app  = express();
const port = 5000;
const fs = require("fs");
const cors = require('cors');
const req = require('http')

app.use(cors())

const loadData = function () {
    try{
        let databuffer = fs.readFileSync('./resources/sample.json')
        let data = databuffer.toString();
        return JSON.parse(data)

    }catch(e){
        console.log(e);
    }
}

const saveData = function (data) {
    const dataJSON = JSON.stringify(data);
    fs.writeFileSync('./resources/sample.json',dataJSON)
} 

app.get('/api/readData/', (req,res) => {
    const data = loadData();
    res.send(data);
});

app.post('/api/writeData/', (req,res) => {
    
    console.log("data", req.query )
    let data = loadData()
    data.push(JSON.parse(req.query.value))
    saveData(data)
    res.send("Data saved successfully");
});



app.listen(port, () => console.log(`server is running on ${port}`));
