import React, {Component} from 'react';
import Filter from '../../components/Filter/Filter'
import Grid from '../../components/Grid/Grid'
import Trip from '../../components/Trip/Trip'
import './TripPlanner.css'
import TokenServices from '../../utils/tokenServices'
class TripPlanner extends Component {
  state = {
    createTrip: false
  }
  componentDidMount(){
    if(!TokenServices.getToken()){
     console.log('No token availbe pushing back to login') 
     this.props.history.push('/');
    }
  }
  fetchTrips = () =>{
    console.log('Fetching Trips');
  }
  toggleCreateTrip = () =>{
    this.setState(prevState=>({
      createTrip: !prevState.createTrip
    }))
  }
  removeTripHandler = () =>{
    console.log('This trip is removed.');
  }
  render(){ 
    return (
    <div className="wrapper">
      <Filter toggleTrip={this.toggleCreateTrip}/>
      <Grid fetchTrips={this.fetchTrips}/>
      {this.state.createTrip? <Trip toggleTrip={this.toggleCreateTrip} removertrip={this.removeTripHandler}/>:null}
      
    </div>);
  }
}

export default TripPlanner;