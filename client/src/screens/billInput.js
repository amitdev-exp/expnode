import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import {
    Input,
    Button,
    Table,
    Select,
    InputNumber,
    DatePicker,
    AutoComplete,
    Cascader,
    Tooltip,
} from 'antd';
import 'antd/dist/antd.css';
import ProductView from '../screens/productView'
import './billInput.css'
import axios from 'axios'
class BillInput extends Component {
    constructor() {
        super();
        this.state = {

            customerName : '',
            add : '',
            mob : '',
            gst : '',
            pan : '',
            bdate : '',
            mop : '',
            discount : '',
            prod : ''
            
        }

        this.createBillHandler = this.createBillHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.saveProdDetails = this.saveProdDetails.bind(this);
        
    }

    saveProdDetails = (data) => {
        this.setState({ prod : data})
    }

    createBillHandler = () => {

      let data = {
            "customerDetails":{
               "name": this.state.customerName,
               "address":this.state.add,
               "mob":this.state.mob,
               "gstNO":this.state.gst,
               "pan":this.state.pan
            },
            "productDetails":{
               
            //       "sn1":"1",
            //       "productName1":"Gold Ornament",
            //       "gw1":"1.5",
            //       "nw1":"1.5",
            //       "rpu1":"2.5",
            //       "amount1":"3000",
            // //    },
            // //    {
            //       "sn2":"2",
            //       "productName2":"Ear Ring",
            //       "gw2":"1.5",
            //       "nw2":"1.5",
            //       "rpu2":"2.5",
            //       "amount2":"3000"
            //    }
            },
            "other":{
               "total":"6000.00",
               "cgst":"90.00",
               "sgst":"90.00",
               "discount": this.state.discount,
               "netAm":"6100.00",
               "inWords":"Rupees Six thousand only",
               "mode": this.state.mop
            },
            "invoiceNo":"12343",
            "date": this.state.bdate
         };

         let temp  = {}

        for(let i=0 ;i< this.state.prod.length; i++){
            
            temp[`sn${i}`] = i,
            temp[`productName${i}`] = this.state.prod[i].name,
            temp[`gw${i}`] = this.state.prod[i].gw,
            temp[`nw${i}`] = this.state.prod[i].nw,
            temp[`rpu${i}`] = this.state.prod[i].rpu,
            temp[`amount${i}`] = "3000"
          
        }
        data.productDetails = temp
        this.handleInvoice(data);
    }

    handleInvoice = (data) => {
        axios.post(`http://localhost:5000/api/pdf/generatePDF`,data)
            .then(response => {
                this.setState({ alert: true })
                console.log(response)
               
            })
    }

    handleChange = (event) => {
        let value = event.target.value;
        let headerName = event.target.name;
        this.setState({ [event.target.name] : value })
    }

    handleDateChange = (event) => {
        let value = event._d.toDateString().substring(4,15)
        this.setState({ 'bdate' : value })
    }

    

    render() {

        
        

        return (
            <div className="billView">
                <h2 className='label'>Create New Bill</h2>
               
                <Container id="billTemplate" >

                    <form method="post" onSubmit={this.createBillHandler}>
                        <Row style={{ padding: '5px', margin: '10px' }}>
                            <Col xs={12} md={8}>Customer Name <Input style={{ width: '50%' }} placeholder="Enter Customer Name" maxLength={25} name="customerName" value={this.state.customerName} onChange={this.handleChange}/></Col>
                            <Col xs={6} md={4}>Mobile No <Input style={{ width: '50%' }} placeholder="Enter Mob no" maxLength={25} name="mob" value={this.state.mob} onChange={this.handleChange}/> </Col>
                        </Row>
                        <Row style={{ padding: '5px', margin: '10px' }}>
                            <Col xs={12} md={8}>Address <Input style={{ width: '50%' }} placeholder="Input a number" maxLength={25} name="add" value={this.state.add} onChange={this.handleChange}/></Col>
                            <Col xs={6} md={4}>Bill Date <DatePicker style={{ width: '50%' }} name="bdate" onChange={this.handleDateChange}/></Col>
                        </Row>
                        <Row style={{ padding: '5px', margin: '10px' }}>
                            <Col xs={12} md={8}>GSTIN <Input style={{ width: '50%' }} placeholder="Input a number" maxLength={25} name="gst" value={this.state.gst} onChange={this.handleChange}/></Col>
                            <Col xs={6} md={4}>PAN <Input style={{ width: '50%' }} placeholder="Input a number" maxLength={25} name="pan" value={this.state.pan} onChange={this.handleChange} /></Col>
                        </Row>
                        <Row style={{ padding: '5px', margin: '10px' }}>
                            <ProductView submit={this.saveProdDetails} />
                        </Row>
                        <Row style={{ padding: '5px', margin: '10px' }}>
                            <Col xs={12} md={8}>Mode of Payment <Input style={{ width: '50%' }} placeholder="Input a number" maxLength={25} name="mop" value={this.state.mop} onChange={this.handleChange} /></Col>
                            <Col xs={6} md={4}>Discount <Input style={{ width: '50%' }} placeholder="Input a number" maxLength={25} name="discount" value={this.state.discount} onChange={this.handleChange} /></Col>
                        </Row> 
                        <Row>
                            <Col xs={12} md={12}></Col>
                            <Col xs={12} md={12} style={{float:"right"}}><Button type="submit" shape="round" size="medium" onClick={this.createBillHandler} style={{float:"right"}}>Create</Button></Col>
                        </Row>  
                    </form >
                    
                </Container>
            </div>
        );
    }
}

export default BillInput