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
    .catch(error => {
      try {
        // Handles errors that are not HTTP specific
        console.error(error);
        this.setState({ showRegistrationFailure: true });
        if (!error.status) {
          console.error('A network error has occured.');
        } else if (error.response.status === 400) {
          console.error('Bad Request');
        } else if (error.response.status === 500) {
          console.error('Something bad happended on the server.');
        } else {
          console.error('An unknown error has occurred');
        }
      } catch (ex) {
        Promise.reject(ex);
      }
    });
  }
  toggleCreateTrip = () =>{
    this.setState(prevState=>({
      createTrip: !prevState.createTrip
    }))
  }
  removeTripHandler = () =>{
    console.log('This trip is removed.');
  }
  sortByCategories = (category) => {
    console.log(`Here is the ${category}`)
    let oldTrips = this.state.Trips;
    const newTrips = oldTrips.filter((trip)=>{
      return trip.category === category
    })
    this.setState({Trips: newTrips});
  }
  render(){ 
    return (
    <div className="wrapper">
      <Filter 
        toggleTrip={this.toggleCreateTrip}
        sortByCategories={this.sortByCategories}
      
      />
      <Grid fetchTrips={this.fetchTrips} Trips={this.state.Trips}/>
      {this.state.createTrip? <Trip toggleTrip={this.toggleCreateTrip} fetchTrips={this.fetchTrips}/>:null}
      
    </div>);
  }
}

export default TripPlanner;