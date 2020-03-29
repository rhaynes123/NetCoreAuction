import React, { Component } from 'react';
//import { Button, ButtonGroup, Container, Table } from 'reactstrap';
//import AppNavbar from './AppNavbar';
import logo from './ally.png';
//import { Link } from 'react-router-dom';

class ItemsList extends Component {

  constructor(props) {
    super(props);
    this.state = {items: [], isLoading: true};
    this.bidItemClicked = this.bidItemClicked.bind(this)
   // this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/v1/item')
      .then(response => response.json())
      .then(data => this.setState({items: data, isLoading: false}));
  }
  bidItemClicked(id,description,price){
        console.log('update' + id)
        console.log('update' + description)
        
        alert('Bid place for item number: ' + id+' '+ description);
        this.props.history.push('api/v1/item/'+id)
        
  }
  

  render() {
   
/*
    const itemList = items.map(item => {
      
      return <tr key={item.id}>
        <td style={{whiteSpace: 'nowrap'}}>{item.description}</td>
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"api/v1/listitems/" + item.id}>Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });//TODO likely need to either reuse or remove
*/
    console.log('render')
        return (
            <div className="container">
                <h3>All Items</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <img src={logo} alt="logo" />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id Number</th>
                                <th>Description</th>
                                <th>Current Price</th>
                                <th>Place Bid</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(
                                    item =>
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.description}</td>
                                            <td>{"$"}{item.reservePrice}</td>
                                            <td><button className="btn btn-warning"  onClick={() => this.bidItemClicked(item.id,item.description,item.reservePrice)}>Bid</button></td>
                                            
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
  }
}

export default ItemsList;
