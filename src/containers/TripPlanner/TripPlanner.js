import React, {Component} from 'react';
import Filter from '../../components/Filter/Filter';
import Grid from '../../components/Grid/Grid';
import Trip from '../../components/Trip/Trip';
import Modal from '../../components/Modal/Modal';
import './TripPlanner.css';
import axios from 'axios';
import TokenServices from '../../utils/tokenServices';
class TripPlanner extends Component {
  state = {
    createTrip: false,
    Trips: [],
    TemporaryTrips: [],
    SingleTrip: '',
    TripMode: 'create',
    showModal: false,
    shownNotification: false,
    upComingTrips: []
  }
  // Checks if the user is logged in, if not user gets redirected back to the signup page
  componentDidMount(){
    if(!TokenServices.getToken()){
     console.log('No token availbe pushing back to login') 
     this.props.history.push('/');
    }
    this.fetchTrips();
    if(!this.state.shownNotification)
      window.setTimeout(()=>{this.checkReminders()}, 2000)
  }
  toggleModal = () =>{
    this.setState(prevState=>({
      showModal: !prevState.showModal
    }))
  }
  // Check reminders
  checkReminders = () => {

    console.log('Checking reminders');
    if(this.state.Trips.length > 0){
      const Trips = this.state.Trips;
      const currentNotifications = Trips.filter((trip)=>{
        return trip.setReminder
      })
      const sortedNotifications = currentNotifications.sort((a,b) => new Date(a.startDate.substring(0,10)) - new Date (b.startDate.substring(0,10)))
      this.toggleModal();
      this.setState({shownNotification: true})
      if(sortedNotifications.length < 5){
        this.setState({upComingTrips: sortedNotifications})  
      }
      else{
        this.setState({upComingTrips: sortedNotifications.slice(0,4)})
      }
      
    }else{
      // No reminders
    }
    
  }
  // Fetches the dataset stored on the server
  fetchTrips = () =>{
    const URL = process.env.REACT_APP_URL;
    const token = TokenServices.getWholeToken();

    axios.get(`${URL}/api/trip`,{
      headers: {'Authorization': `bearer ${token}`}
    })
    .then((response)=>{
      this.setState({Trips: response.data})
      this.setState({TemporaryTrips: response.data})
    })
    .catch(error => {
      try {
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
  // Toggles the trip component on the screen
  toggleCreateTrip = (type) =>{
    this.setState(prevState=>({
      createTrip: !prevState.createTrip
    }))
    this.setState({TripMode: type})
  }
  // Display a trip from the dataset in the trip component to edit or remove
  displayTrip = (trip) =>{
    this.setState({SingleTrip: trip})
    this.toggleCreateTrip('update');
  }
  // Filters all trips based on what category has been selected
  sortByCategories = (category) => {
    let oldTrips = this.state.Trips;
    const newTrips = oldTrips.filter((trip)=>{
      return trip.category === category
    })
    this.setState({TemporaryTrips: newTrips});
  }
  // Searches the dataset with the text key to multiple values within a trip
  sortByQuery = (text) => {
    console.log(`Filtering by ${text}`)
    const searchText = text.toLowerCase();
    let oldTrips = this.state.Trips;
    const newTrips = oldTrips.filter((trip)=>{
      return trip.title.toLowerCase() === searchText || trip.destination.toLowerCase() === searchText || trip.todoItem.some((todo)=> todo.title.toLowerCase() === searchText);
    });
    this.setState({TemporaryTrips: newTrips});  
  }
  // Removes all filters applied to the dataset
  resetFilter = () => {
    this.setState({TemporaryTrips: this.state.Trips})
  }
  render(){ 
    return (
    <div className="wrapper">
      <Modal 
        show={this.state.showModal}
        hideModal={this.toggleModal}
        upComingTrips={this.state.upComingTrips}
        displayTrip={this.displayTrip}
      />
      <Filter 
        toggleTrip = {this.toggleCreateTrip}
        sortByCategories = {this.sortByCategories}
        sortByQuery = {this.sortByQuery}
        resetFilter = {this.resetFilter}
      />
      <Grid 
        fetchTrips={this.fetchTrips} 
        Trips={this.state.TemporaryTrips}
        displayTrip={this.displayTrip}/>

      {this.state.createTrip? <Trip toggleTrip={this.toggleCreateTrip} fetchTrips={this.fetchTrips} displayTrip={this.state.SingleTrip} updateTrip={this.updateTrip} mode={this.state.TripMode}/>:null}
      
    </div>);
  }
}

export default TripPlanner;