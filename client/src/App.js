import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from "@apollo/react-hooks";

import { isLoggedIn, logout } from './auth';
import { client } from "./graphql/requests";
import { CompanyDetail } from './components/Company/Detail';
import { LoginForm } from './components/Login/Form';
import { JobBoard } from './components/Job/Board';
import { JobDetail } from './components/Job/Detail';
import { JobForm } from './components/Job/Form';
import { NavBar } from './components/NavBar/NavBar';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: isLoggedIn()};
  }

  handleLogin() {
    this.setState({loggedIn: true});
    this.router.history.push('/');
  }

  handleLogout() {
    logout();
    this.setState({loggedIn: false});
    this.router.history.push('/');
  }

  render() {
    const {loggedIn} = this.state;
    return (
      <ApolloProvider client={client}>
        <Router ref={(router) => (this.router = router)}>
          <div>
            <NavBar
              loggedIn={loggedIn}
              onLogout={this.handleLogout.bind(this)}
            />
            <section className="section">
              <div className="container">
                <Switch>
                  <Route exact path="/" component={JobBoard} />
                  <Route
                    path="/companies/:companyId"
                    component={CompanyDetail}
                  />
                  <Route exact path="/jobs/new" component={JobForm} />
                  <Route path="/jobs/:jobId" component={JobDetail} />
                  <Route
                    exact
                    path="/login"
                    render={() => (
                      <LoginForm onLogin={this.handleLogin.bind(this)} />
                    )}
                  />
                </Switch>
              </div>
            </section>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
