import React, { Component } from 'react'
import { useLocation, Navigate } from "react-router-dom"
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
const fs = require('fs')
import swal from 'sweetalert';
const { TextArea } = Input;
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
            prod : '',
            netAmount : 0,
            pType : 'gold',
            oldProdName: '',
            oldGW : 0,
            oldNW : 0,
            oldRPU : 0,
            oldAmount : 0,
            alert : false
            
        }

        this.createBillHandler = this.createBillHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.saveProdDetails = this.saveProdDetails.bind(this);
        this.handleNumberToWords = this.handleNumberToWords.bind(this);
        this.handleNetAmount= this.handleNetAmount.bind(this);
        this.routeChange = this.routeChange.bind(this);
        this.handleOldGWChange = this.handleOldGWChange.bind(this);
        
    }

    saveProdDetails = (data) => {
        this.setState({ prod : data})
    }

    createBillHandler = () => {

        console.log(this.prod)

      let data = {
            "customerDetails":{
               "name": this.state.customerName,
               "address":this.state.add,
               "mob":this.state.mob,
               "gstNO":this.state.gst,
               "pan":this.state.pan
            },
            "productDetails":{
            },
            "other":{
               "discount": this.state.discount,
               "mode": this.state.mop
            },
            "invoiceNo":"",
            "date": this.state.bdate,
            "pType": this.state.pType
         };
        
         
        
         let temp  = {}
         let netTotal = 0
         let grandTotal = 0

        for(let i=0 ;i< this.state.prod.length; i++){
            
            temp[`sn${i}`] = i+1,
            temp[`productName${i}`] = this.state.prod[i].name,
            temp[`gw${i}`] = this.state.prod[i].gw,
            temp[`nw${i}`] = this.state.prod[i].nw,
            temp[`rpu${i}`] = this.state.prod[i].rpu,
            temp[`amount${i}`] = this.state.prod[i].nw * this.state.prod[i].rpu
            netTotal = netTotal + (this.state.prod[i].nw * this.state.prod[i].rpu )
          
        }

        if(this.state.prod.length<2){
            temp['sn1'] = '',
            temp[`productName1`] = '',
            temp['gw1'] = '',
            temp[`nw1`] = '',
            temp[`rpu1`] = '',
            temp[`amount1`] = ''
        }

        if(this.state.oldProdName !== ''){
            temp['sn2'] = this.state.prod.length+1,
            temp[`oldProductName`] = this.state.oldProdName,
            temp['oldGW'] = this.state.oldGW,
            temp[`oldNW`] = this.state.oldNW,
            temp[`oldRPU`] = this.state.oldRPU,
            temp[`oldAmount`] = (this.state.oldAmount)
        }else{
            temp['sn2'] = ''
            temp[`oldProductName`] = '',
            temp['oldGW'] = '',
            temp[`oldNW`] = '',
            temp[`oldRPU`] = '',
            temp[`oldAmount`] = ''
        }


        
        let cgstTax = ( netTotal * 1.5 ) / 100
        grandTotal = netTotal + cgstTax * 2 - this.state.discount
        grandTotal = grandTotal.toFixed(2)

        data.productDetails = temp
        data.other.total = netTotal.toFixed(2)
        data.other.cgst = cgstTax.toFixed(2)
        data.other.sgst = cgstTax.toFixed(2)   
        data.other.netAm = Math.round(grandTotal).toFixed(2)
        data.other.inWords = "Rupees " + this.handleNumberToWords(Math.round(grandTotal)) + " Only."

        console.log(data)

        this.handleInvoice(data);
    }

    handleInvoice = (data) => {
        axios.post(`/api/pdf/generatePDF`,data)
            .then(response => {
                this.setState({ alert: true })
                console.log(response)
               
            })
    }

    handleChange = (event) => {
        let value = event.target.value;
        this.setState({ [event.target.name] : value })
    }

    handleChangePType = (value) => {
        this.setState({ 'pType' : value})
    }

    handleDateChange = (event) => {
        let value = event._d.toLocaleDateString()
        this.setState({ 'bdate' : value })
    }

    handleOldGWChange = (event ) => {
        let value = event.target.value;
        let prd = [...this.state.prod]
        prd[0].nw = prd[0].gw - value
        
        this.setState({ [event.target.name] : value, prod : prd })
    }


    

    handleNumberToWords = (num) => {
        let a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen ']
        let b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
        if ((num = num.toString()).length > 9) return 'overflow';
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'And ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
        return str;
    }

    handleNetAmount = (event) => {
        let discount = this.state.discount;
        let totalcost = 0
        let cost = 0
        let tax = 0 
        if(this.state.prod.length > 0){
            for(let i=0; i<this.state.prod.length;i++){
                cost = cost + this.state.prod[i].nw * this.state.prod[i].rpu
            }
        }

        // cost = cost - (this.state.oldAmount)

        tax = cost * 1.5 / 100
        totalcost = cost + tax* 2 - discount

        this.setState({ [event.target.name] : discount, netAmount : Math.round(totalcost) })

    }

    routeChange=()=> {
        let path = `/`;
        let history = useHistory();
        history.push(path);
    }

    

    render() {

        if(this.state.alert){
            swal("Bill Created Successfully.", "", "success");
            // this.routeChange()
            return <Navigate to="/" replace />;
        }

        return (
            <div className="billView">
                <h2 className='label'>Create New Bill</h2>
               
                <Container id="billTemplate" >

                    <form method="post" onSubmit={this.createBillHandler}>
                    <Row style={{ padding: '5px', margin: '10px' }}>

                    <Col xs={6} md={4}><span style={{ marginRight: '35px' }}> Product Type</span><Select defaultValue={this.state.pType} name="pType" style={{ width: 120 }} onChange={this.handleChangePType}>
                        <Option value="gold">Gold</Option>
                        <Option value="silver">Silver</Option>
                    </Select>
                    </Col>
                    </Row>
                        <Row style={{ padding: '5px', margin: '10px' }}>

                            <Col xs={12} md={8}><span style={{ marginRight: 8 }}>Customer Name </span><Input style={{ width: '50%' }} placeholder="Enter Customer Name" maxLength={25} name="customerName" value={this.state.customerName} onChange={this.handleChange}/></Col>
                            <Col xs={6} md={4}><span style={{ marginRight: 8 }}>Mobile No </span><Input style={{ width: '50%' }} placeholder="Enter Mob no" maxLength={25} name="mob" value={this.state.mob} onChange={this.handleChange}/> </Col>
                        </Row>
                        <Row style={{ padding: '5px', margin: '10px' }}>
                            <Col xs={12} md={8}><span style={{ marginRight: '65px' }}>Address </span><Input style={{ width: '50%' }} placeholder="Enter Address" maxLength={50} name="add" value={this.state.add} onChange={this.handleChange}/></Col>
                            <Col xs={6} md={4}><span style={{ marginRight: '24px' }}>Bill Date </span><DatePicker style={{ width: '50%' }} name="bdate" onChange={this.handleDateChange}/></Col>
                        </Row>
                        <Row style={{ padding: '5px', margin: '10px' }}>
                            <Col xs={12} md={8}><span style={{ marginRight: '78px' }}>GSTIN </span> <Input style={{ width: '50%' }} placeholder="Enter GST NO" maxLength={25} name="gst" value={this.state.gst} onChange={this.handleChange}/></Col>
                            <Col xs={6} md={4}><span style={{ marginRight: '52px' }}>PAN </span><Input style={{ width: '50%' }} placeholder="Enter PAN" maxLength={25} name="pan" value={this.state.pan} onChange={this.handleChange} /></Col>
                        </Row>
                        <Row style={{ padding: '5px', margin: '10px' }}>
                            <ProductView submit={this.saveProdDetails} />
                        </Row>
                        <div className='oldProductDetails'>
                        <span style={{ marginLeft : '10px', fontWeight: 'bold' }}>Old Product Details:</span>
                        <Row style={{ padding: '5px', margin: '10px' }}>

                            <Col xs={6} md={6}><span style={{ marginRight: 8 }}>Product name</span><Input style={{ width: '50%' }} placeholder="Name" maxLength={25} name="oldProdName" value={this.state.oldProdName} onChange={this.handleChange}/></Col>
                            <Col xs={3} md={3}><span style={{ marginRight: 8 }}>Gross Weight</span><Input style={{ width: '30%' }} placeholder="Gross Weight" maxLength={25} name="oldGW" value={this.state.oldGW} onChange={this.handleOldGWChange}/> </Col>
                            
                           
                        </Row>
                        </div>
                        
                        <Row style={{ padding: '5px', margin: '10px' }}>
                            <Col xs={12} md={8}><span style={{ marginTop : '-12px', marginRight: 8 }}>Mode of Payment </span> <TextArea style={{ width: '50%' }} placeholder="Enter payment information" name="mop" value={this.state.mop} onChange={this.handleChange} /></Col>
                            <Col xs={6} md={4}><span style={{ marginRight: '22px' }}>Discount </span> <Input style={{ width: '50%' }} placeholder="Enter Discount" maxLength={25} name="discount" value={this.state.discount} onChange={this.handleChange} /></Col>
                        </Row> 
                        <Row>
                            <Col xs={12} md={12}></Col>
                            <Col xs={4} md={4} style={{float:"right"}}><Button type="submit" shape="round" size="medium" onClick={this.handleNetAmount} style={{float:"right"}}>Check Net Amount</Button></Col>
                            <Col xs={6} md={6} style={{float:"right"}}><Button type="primary" shape="round" size="medium" onClick={this.createBillHandler} style={{float:"right"}}>Create</Button></Col>
                        </Row> 
                        <Row>
                            
                            <Col xs={12} md={12}><span style={{ marginLeft: '450px',color : 'green',font : 'bold 14px/30px Georgia, serif;' }}>Net Amount : {this.state.netAmount}</span></Col>
                            
                        </Row>  
                    </form >
                    
                </Container>
            </div>
        );
    }
}

export default BillInput