import React from 'react';
import TripPlanner from './containers/TripPlanner/TripPlanner';
import Authentication from './containers/Authentication/Authentication';
import TokenServices from './utils/tokenServices';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  /*
  let temp;
  if(TokenServices.getToken()){
    temp = <TripPlanner/>
  }else{
    temp = <Authentication/>
  }
  */
  
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
