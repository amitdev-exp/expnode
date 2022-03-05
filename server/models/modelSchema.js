// const mongoose = require('mongoose')
import mongoose from 'mongoose'


const mjSchema = new mongoose.Schema({

    customerDetails:{
               name: String,
               address: String,
               mob: Number,
               gstNO: String,
               pan: String
            },
            productDetails:[
               {
                  sn0: Number,
                  productName0: String,
                  gw0: Number,
                  nw0: Number,
                  rpu0: Number,
                  amount0:Number,
               },
               {
                sn1: Number,
                productName1: String,
                gw1: Number,
                nw1: Number,
                rpu1: Number,
                amount1:Number,
               }
            ],
            other:{
               total: Number,
               cgst: Number,
               sgst: Number,
               discount: Number,
               netAm: Number,
               inWords: String,
               mode: String
            },
            invoiceNo: Number,
            date: String

})

export default mongoose.model('test',mjSchema)