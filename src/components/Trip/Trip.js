import React, {Component} from 'react';
import './Trip.css';

class Trip extends Component {
  state = {
    title: '',
    destination: '',
    category: '',
    startDate:'',
    endDate:'',
    todo: '',
    setReminder:false,
  }
  submitTrip = ()=>{
    const data = this.state;
    console.log(data)
    // Submit axios request to the backend
    // append to local storage
  }
  handleSetReminderToggle = (event)=>{
    this.setState(prevState=>({ setReminder: !prevState.setReminder}))
  }
  render(){
    const {title, destination, category, startDate, endDate,setReminder} = this.state;
    return(
      <div className="tripBox">
        <p>Trip</p>
        <span>Title:</span>
        <input type="text" value={title} onChange={e => this.setState({title: e.target.value})}/>
        <br></br>
        <span>Destination</span>
        <input type="text" value={destination} onChange={e => this.setState({destination: e.target.value})}/>
        <br></br>
        <span>Category</span>
        <select name="categories" onChange={e=>this.setState({category: e.target.value})}>
          <option value="None">None</option>
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>

        </select>
        <span>Start Date</span>
        <input type="date"  name="trip-start"  value={startDate} min={Date.now()} onChange={e => this.setState({startDate: e.target.value})}/>
        <br></br>

        <span>End Date</span>
        <input type="date"  name="trip-start" value={endDate} min={startDate} onChange={e => this.setState({endDate: e.target.value})}/>
        <br></br>
        <span>Todo</span>
        <br></br>
        <button onClick={this.handleSetReminderToggle}>Set Reminder </button>
        <span>{this.state.setReminder? "On": "Off"}</span>
        <br></br>
        <button onClick={this.submitTrip}>Save</button>
        <button onClick={this.props.toggleTrip}>Cancel</button>
        <button>Delete</button>

      </div>
    )
  }
}
export default Trip;
