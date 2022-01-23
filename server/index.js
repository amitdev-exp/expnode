
import  express from 'express'
const app = express();
const port = 5000;
import cors from 'cors'
import mjRouter from "./routes/mjService.js"
import mongoose from 'mongoose'

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.use('/api',mjRouter)


const url = 'mongodb://localhost/mjdatabase'

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.listen(port, () => console.log(`server is running on ${port}`));
