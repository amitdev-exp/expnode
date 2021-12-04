import React, { Component } from 'react'

class Home extends Component {
    constructor(){
        super();
        this.state = {
            customers: []
        }
    }

    componentDidMount(){
        fetch('/api/customers/')
        .then( res => res.json())
        .then(data =>
             this.setState({customers : data})
        )
    }
       

    
    render() {
        let customerList = null
        if(this.state.customers !== undefined){
            customerList = this.state.customers.map( element => {
                return (
                    <li key={element.id}>{element.firstName}  {element.lastName}</li>    
                )
            })
        }
        
      return (
          <div className="home">
              <h2>My Exp Node </h2>
              <ul>
                {customerList}
              </ul>
          </div>
      );
    }
  }

  export default Home