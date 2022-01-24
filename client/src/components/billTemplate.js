import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import mj from '../resource/mj.jpg'
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
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

class billTemplateView extends Component {
    constructor() {
        super();
        this.state = {

        }

        this.printDocument = this.printDocument.bind(this);


    }

    printDocument() {
        //const input = document.getElementById('divToPrint');

        const doc = new jsPDF();

        //get table html
        const pdfTable = document.getElementById('billTemplpate');
        //html to pdf format
        let html = htmlToPdfmake(pdfTable.innerHTML);

        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();

        console.log(documentDefinition)

    }

    render() {

        const renderContent = (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };
            if (index === 4) {
                obj.props.colSpan = 0;
            }
            return obj;
        };



        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: (text, row, index) => {
                    if (index < 4) {
                        return <a>{text}</a>;
                    }
                    return {
                        children: <a>{text}</a>,
                        props: {
                            colSpan: 5,
                        },
                    };
                },
            },
            {
                title: 'Gross Weight',
                dataIndex: 'gross_w',
                render: renderContent,
            },
            {
                title: 'Stone Weight',
                dataIndex: 'stone_w',
                render: renderContent,
            },
            {
                title: 'Net Weight',
                dataIndex: 'net_w',
                render: renderContent,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                render: renderContent,
            },
        ];

        const data = [
            {
                key: '1',
                name: 'John Brown',
                gross_w: 32,
                stone_w: '0571-22098909',
                net_w: 18889898989,
                amount: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                name: 'Amit Brown',
                gross_w: 32,
                stone_w: '0571-22098909',
                net_w: 18889898989,
                amount: 'New York No. 2 Lake Park',
            }]

        return (
            <div class="invoice-box">
                <Container id="billTemplpate" >
                    <Row style={{ padding: '5px', margin: '10px' }}>
                        <Col md={4}><img src={mj} style={{ width: "900px", maxWidth: "1200px", height: '200px' }} /></Col>

                    </Row>
                    <Row style={{ padding: '5px', margin: '10px' }}>
                        <Col xs={12} md={8}>Customer <Input style={{ width: '50%' }} placeholder="Input a number" maxLength={25} /></Col>
                        <Col xs={6} md={4} >Bill No <Input style={{ width: '20%' }} placeholder="Input a number" maxLength={25} /> </Col>
                    </Row>
                    <Row style={{ padding: '5px', margin: '10px' }}>
                        <Col xs={12} md={8}>Address <Input style={{ width: '50%' }} placeholder="Input a number" maxLength={25} /></Col>
                        <Col xs={6} md={4}>Bill Date : <DatePicker style={{ width: '50%' }} /></Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}><Table columns={columns} dataSource={data} bordered /></Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}><p>This is Desclaimer </p></Col>
                    </Row>
                </Container>

                <div style={{ float: 'right', marginRight: '50px' }}>
                    <Button variant="primary" onClick={this.printDocument}>
                        download Invoice
                    </Button>
                </div>
            </div>
        );
    }
}

export default billTemplateView;
