import React from 'react';
// Import to use styled-components
import styled from 'styled-components';
// Import for page routing
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import './App.css';
// Import Our MovieList and MovieDetail Components
import MoviesList from './Components/MoviesList';
import MovieDetail from './Components/MovieDetail';

// App is defined as a stateless functional component
const App = () => (
  // Define our router
  <Router>
    <div className="App">
      <header className="App-header">
        {/* When they click on moviefy, we route them to homepage */}
        <Link to="/">
          <PageTitle>MOVIEFY</PageTitle>
        </Link>
      </header>
      {/* Define our switch for the the different routes */}
      <Switch>
        {/* If the route is / then render the MovieList with the top trending movies */}
        <Route exact path="/" component={MoviesList} />
        {/* click on a movie poster we will render a page with info pertaining to that movie */}
        <Route path="/id/:id" component={MovieDetail} />
        {/* Our catch all for all other routes */}
        <Route path="/*" component={MoviesList} />
      </Switch>
    </div>
  </Router>
);

export default App;

// This styles the Moviefy title in the header
const PageTitle = styled.h1`
  text-decoration: none;
  color: white;
`;
