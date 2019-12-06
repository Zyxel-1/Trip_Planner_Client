import React, {Component} from 'react';
import Filter from '../../components/Filter/Filter'
import Grid from '../../components/Grid/Grid'
import Trip from '../../components/Trip/Trip'
import './TripPlanner.css'
class TripPlanner extends Component {
  state = {
    createTrip: false
  }
  toggleCreateTrip = () =>{
    this.setState(prevState=>({
      createTrip: !prevState.createTrip
    }))
  }

  render(){ 
    return (
    <div className="wrapper">
      <Filter toggleTrip={this.toggleCreateTrip}/>
      <Grid/>
      {this.state.createTrip? <Trip toggleTrip={this.toggleCreateTrip}/>:null}
      
    </div>);
  }
}

export default TripPlanner;