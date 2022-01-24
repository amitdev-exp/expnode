import React, { Component } from 'react'
import BillView from  '../components/billTemplate'
class billViewGtn extends Component {
    constructor() {
        super();
        this.state = {
            
        }
        
    }

    render() {

        return (
            <div className="billView">
                <BillView />
            </div>
        );
    }
}

export default billViewGtn