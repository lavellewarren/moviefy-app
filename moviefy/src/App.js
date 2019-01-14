import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import './App.css';

import MoviesList from './Components/MoviesList';
import MovieDetail from './Components/MovieDetail';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <PageTitle>MOVIEFY</PageTitle>
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;

const PageTitle = styled.h1`
  text-decoration: none;
  color: white;
`;
