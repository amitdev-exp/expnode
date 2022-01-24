import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
class Submit extends Component {
    constructor() {
        super();
        this.state = {
            title : '',
            cord : '',
            shape : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
    }

    handleSubmit(event) {
        let submitData = {
            title : event.currentTarget[0].value,
            coords : event.currentTarget[1].value,
            shape : event.currentTarget[2].value,
        }
        event.preventDefault();
        this.props.onSendData(submitData);
      }


    render() {
        

        return (
            <div className="submit">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Enter Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" ref={this.input}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Enter coordinates</Form.Label>
                        <Form.Control type="text" placeholder="Password" ref={this.input}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Enter Shape</Form.Label>
                        <Form.Select defaultValue="default">
                            <option value="rect">Rectangle</option>
                            <option value="circle">circle</option>
                            <option value="poly">polygon</option>
                            <option value="default">default</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Submit