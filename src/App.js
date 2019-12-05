import React from 'react';
import TripPlanner from './containers/TripPlanner/TripPlanner';
import Authentication from './containers/Authentication/Authentication';
import TokenServices from './utils/tokenServices';
import './App.css';

function App() {
  let temp;
  if(TokenServices.getToken()){
    temp = <TripPlanner/>
  }else{
    temp = <Authentication/>
  }
  return (
    temp
  );
}

export default App;
