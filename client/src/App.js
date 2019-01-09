import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import logo from './spacex.png';
import Launches from './components/Launches';
import Launch from './components/Launch';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Link to="/">
            <img 
            src={logo} 
            alt="SpaceX" 
            style={{ width: 300, height:'auto', display: 'block', margin: 'auto'}}
            />
          </Link>
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
      </ApolloProvider>
    );
  }
}

export default App;
