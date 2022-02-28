import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './billHistory.css'
import { Table } from 'antd';
import axios from 'axios'
class billHistory extends Component {
    constructor() {
        super();
        this.state = {
            invoiceDetails : ''
        }

        this.getInvoiceDetails = this.getInvoiceDetails.bind(this);
        
    }

    componentDidMount(){
        this.getInvoiceDetails()
    }
    

    getInvoiceDetails = () => {
        axios.get(`http://localhost:5000/api/getInvoiceDetails/`)
            .then(response => {
                this.setState({ invoiceDetails: response.data })
                console.log(response)
               
            })
    }

    render() {

        let data = []
        let mainData  = []

        if(this.state.invoiceDetails){
            data = this.state.invoiceDetails
        }

        for(let i=0;i<data.length;i++){
            let temp = {}
            temp["name"] = data[i].customerDetails.name
            temp["mob"] = data[i].customerDetails.mob 
            temp["invoiceNo"] = data[i].invoiceNo  
            temp["amount"] = data[i].other.netAm
            temp["pType"] = data[i].pType
            temp["date"] = data[i].date
            mainData.push(temp)
        }

        // const dataSource = [
        //     {
        //       key: '1',
        //       name: 'Mike',
        //       age: 32,
        //       address: '10 Downing Street',
        //     },
        //     {
        //       key: '2',
        //       name: 'John',
        //       age: 42,
        //       address: '10 Downing Street',
        //     },
        //   ];
          
          const columns = [
            {
                title: 'Invoice',
                dataIndex: 'invoiceNo',
                key: 'invoiceNo',
              },
              {
                title: 'Product',
                dataIndex: 'pType',
                key: 'pType',
              },
              {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
              },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Mobile No',
              dataIndex: 'mob',
              key: 'mob',
            },
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            },
          ];

        

        return (
            <div className="billHistory">
                <div style={{width:"100%", padding: '100px'}}>
                    <Table dataSource={mainData} columns={columns} />
                </div>   
            </div>
        );
    }
}

export default billHistory