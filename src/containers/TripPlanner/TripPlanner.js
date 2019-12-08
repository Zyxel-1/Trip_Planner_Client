import React, {Component} from 'react';
import Filter from '../../components/Filter/Filter';
import Grid from '../../components/Grid/Grid';
import Trip from '../../components/Trip/Trip';
import './TripPlanner.css';
import axios from 'axios';
import TokenServices from '../../utils/tokenServices';
class TripPlanner extends Component {
  state = {
    createTrip: false,
    Trips: []
  }
  componentDidMount(){
    if(!TokenServices.getToken()){
     console.log('No token availbe pushing back to login') 
     this.props.history.push('/');
    }
    this.fetchTrips();
  }
  fetchTrips = () =>{
    console.log('Fetching Trips');
    const URL = process.env.REACT_APP_URL;
    const token = TokenServices.getWholeToken();

    axios.get(`${URL}/api/trip`,{
      headers: {'Authorization': `bearer ${token}`}
    })
    .then((response)=>{
      console.log(response.data)
      window.localStorage.setItem('Trips', JSON.stringify(response.data));
      this.setState({Trips: response.data})
      
    })
    .catch((error)=>{
      console.log(error);
    })
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
      <Grid fetchTrips={this.fetchTrips} Trips={this.state.Trips}/>
      {this.state.createTrip? <Trip toggleTrip={this.toggleCreateTrip} removertrip={this.removeTripHandler}/>:null}
      
    </div>);
  }
}

export default TripPlanner;