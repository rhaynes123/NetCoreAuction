import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemsList from './ItemsList';
import ItemComponent from './ItemComponent';

class App extends Component{
  state={
    isLoading:true,
    items: []
  };
  bidItemClicked(id) {
    console.log('update ' + id)
    this.props.history.push(`/api/v1/item/${id}`)
}
  async componentDidMount(){
    const response = await fetch('/api/v1/item');
    const body = await response.json();
    this.setState({items: body, isLoading: false});
  }
  render(){
    
    //App();

      return (
        <Router>
                <>
                    <h1>Ally Financial Auction House  Application</h1>
                    <Switch>
                        <Route path="/" exact component={ItemsList} />
                        <Route path="/api/v1/item" exact component={ItemsList} />
                        <Route path="/api/v1/item/" component={ItemComponent} />
                    </Switch>
                </>
            </Router>
        /*
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Items List</h2>
            {items.map(item =>
              <div key={item.id}>
               <td>{"Item number"}:{item.id}</td> 
               <td>{"Item"}:{item.description}</td>
               <td>{"Current Price: "}:{"$"}{item.reservePrice}</td>
               <td><button className="btn btn-warning" onClick={() => this.bidItemClicked(item.id)}>Place Bid</button></td>
              </div>
              
            )}
          </header>
        </div>
        */
      );
    }
  }



export default App;
