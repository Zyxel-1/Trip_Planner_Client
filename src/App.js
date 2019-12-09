import React from 'react';
import TripPlanner from './containers/TripPlanner/TripPlanner';
import Authentication from './containers/Authentication/Authentication';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact component={Authentication}/>
      <Route path="/home" exact component={TripPlanner}/>
      </Switch>
    </Router>
    
  );
}

export default App;
