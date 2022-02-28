import React, { Component } from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'
import Submit from '../screens/submit'
import axios from 'axios'
import solarImg from '../../src/sonar_map.png'
import BillView from '../components/billTemplate.js'
import { Container, Col, Row } from 'react-bootstrap'
import mj from '../resource/mj.jpg'
class Home extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            mainData: [],
            alert: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.saveData = this.saveData.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleInvoice = this.handleInvoice.bind(this);
    }

    componentDidMount() {
        // this.fetchData()
    }


    handleClose() {
        this.setState({ modal: false })
    }

    handleShow() {
        this.setState({ modal: true })
    }

    handleInvoice = () => {
        axios.post(`http://localhost:5000/api/pdf/generatePDF`)
            .then(response => {
                this.setState({ alert: true })
                console.log(response)
               
            })
    }

    fetchData = () => {
        fetch('/api/readData/')
            .then(res => res.json())
            .then(data =>
                this.setState({ mainData: data })
            )
    }

    saveData = (value) => {
        this.handleClose();
        axios.post(`http://localhost:5000/api/writeData?value=${JSON.stringify(value)}`)
            .then(response => {
                this.setState({ alert: true })
                console.log(response)
                this.fetchData();
            })
    }

    

    render() {
        let inpurModel = null
        let alertPop = null
        if (this.state.modal) {
            inpurModel = (
                <Modal show={this.state.modal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Enter New Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Submit onSendData={this.saveData} /></Modal.Body>
                </Modal>
            )
        }

        if (this.state.alert) {
            alertPop = (
                <Alert key={1}>
                    Data Saved successfully
                </Alert>
            )
        }

        return (
            <div className="home" style= {{  textAlign : 'center', padding : '10px'}}>
                <h2>Welcome Mahalaxmi Jewellers </h2>
                <Row style={{ padding: '5px', margin: '10px' }}>
                        <Col md={4}><img src={mj} style={{ width: "1200px", maxWidth: "1200px", height: '300px',paddingTop: '40px',marginLeft: "40px" }} /></Col>

                </Row>
                {inpurModel}
                {alertPop}
                
            </div>
        );
    }
}

export default Home