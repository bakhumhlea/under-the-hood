import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar';

import { ApolloProvider, Query } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag';

import styles from './styles.scss';
import VisualBoard from '../VisualBoard';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard';

class App extends Component {
  render() {
    console.log(process.env);
    const GRAPHQL_URL = process.env.GRAPHQL_URL;
    const client = new ApolloClient({
      link: new HttpLink({ uri: GRAPHQL_URL }),
      cache: new InMemoryCache()
    });
    const uid = "5d321fe220822bf91e0bfcfd";
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className={styles.mainContainer}>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/visualboard" render={(props) => <VisualBoard {...props} user={"name"}/>}/>
            <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;