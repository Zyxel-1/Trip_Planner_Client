import React, {Component} from 'react';
import './Trip.css';

class Trip extends Component {
  state = {
    Title: '',
    Destination: '',
    Category: '',
    StateDate:'',
    EndDate:'',
    Todo: '',
    SetReminder:'',
  }
  submitTrip = ()=>{
    console.log("HELlo")
    // Submit axios request to the backend
    // append to local storage
  }
  render(){
    return(
      <div className="tripBox">
        <p>Trip</p>
        <span>Title:</span>
        <input type="text"/>
        <br></br>
        <span>Destination</span>
        <input type="text"/>
        <br></br>
        <span>Category</span>

        <span>Start Date</span>
        <input type="date"  name="trip-start"  value={Date} min={`${Date.now().getMonth}-${Date.now().getDate}-${Date.now().getFullYear} `}/>
        <br></br>

        <span>End Date</span>
        <input type="date"  name="trip-start" value={this.state.EndDate} min={Date}/>
        <br></br>
        <span>Todo</span>
        <br></br>
        <button>Set Reminder 🔔</button>
        <br></br>
        <button>Save</button>
        <button onClick={this.props.toggleTrip}>Cancel</button>
        <button>Delete</button>

      </div>
    )
  }
}
export default Trip;
