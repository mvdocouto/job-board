import React, { useState } from 'react';
import styled  from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";

import { isLoggedIn, logout } from './auth';
import { client } from "./graphql/requests";
import { CompanyDetail } from './components/Company/Detail';
import { LoginForm } from './components/Login/Form';
import { JobBoard } from './components/Job/Board';
import { JobDetail } from './components/Job/Detail';
import { JobForm } from './components/Job/Form';
import { NavBar } from './components/NavBar/NavBar';


const WrapperContainer = styled.div`
  width: 900px;
  margin: 0 auto;
`


export const App = () => {
  const history = useHistory();
  const [userLogin, setUserLogin] = useState({ loggedIn: isLoggedIn() });
  const handleLogin = () => {
    setUserLogin({ loggedIn: true });
    console.log(history);
    // history.push('/');
  }

  const handleLogout = () => {
    logout();
    setUserLogin({ loggedIn: false });
    // history.push("/");
    console.log(history);
  };

  const { loggedIn } = userLogin;
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <WrapperContainer>
          <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={JobBoard} />
                <Route path="/companies/:companyId" component={CompanyDetail} />
                <Route exact path="/jobs/new" component={JobForm} />
                <Route path="/jobs/:jobId" component={JobDetail} />
                <Route
                  exact
                  path="/login"
                  render={() => <LoginForm onLogin={handleLogin} />}
                />
              </Switch>
            </div>
          </section>
        </WrapperContainer>
      </Router>
    </ApolloProvider>
  );
}
