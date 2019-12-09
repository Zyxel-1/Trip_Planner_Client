import React, {Component} from 'react';
import axios from 'axios';
import TokenServices from '../../utils/tokenServices';
import Todo from '../Todo/Todo';
import './Trip.css';

class Trip extends Component {
  state = {
    title: '',
    destination: '',
    category: '',
    startDate:'',
    endDate:'',
    userID: '',
    todoItem: [],
    setReminder:false,
  }
  submitTrip = ()=>{
    const URL = process.env.REACT_APP_URL;
    let data = this.state;
    const token = TokenServices.getWholeToken();
    data.userID = TokenServices.getToken().id;
    
    // Submit axios request to the backend
    axios.post(`${URL}/api/trip`,data,{
      headers: {'Authorization': `bearer ${token}`}
    })
    .then((response)=>{
      console.log(response);
      this.props.fetchTrips();
      this.props.toggleTrip();
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
  // Creates a todo item
  createTodoItem = (title) =>{
    let storedTodos = this.state.todoItem;
    storedTodos.push({doneStatus: false, title });
    this.setState({todoItem: storedTodos});

  }
  // Removes a todo item
  removeTodoItem = () =>{
    
  }
  // Marks a todo item as complete or not
  markTodoItem = (title) =>{
    console.log(`This title is being toggled ${title}`);
  }
  // Toggles the value of setReminder
  handleSetReminderToggle = (event)=>{
    this.setState(prevState=>({ setReminder: !prevState.setReminder}))
  }
  render(){
    const {title, destination, startDate, endDate,setReminder} = this.state;
    return(
      <div className="tripBox">
        <h1>New Trip</h1>
        <div className="tripFormBox">
          <span>Title:</span>
          <input type="text" value={title} onChange={e => this.setState({title: e.target.value})}/>
          <br></br>
          <span>Destination:</span>
          <input type="text" value={destination} onChange={e => this.setState({destination: e.target.value})}/>
          <br></br>
          <span>Category:</span>
          <select name="categories" onChange={e=>this.setState({category: e.target.value})}>
            <option value="None">None</option>
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>

          </select>
          <br></br>
          <span>Start Date:</span>
          <input type="date"  name="trip-start"  value={startDate} min={new Date().toISOString().slice(0,10)} onChange={e => this.setState({startDate: e.target.value})}/>
          <br></br>

          <span>End Date:</span>
          <input type="date"  name="trip-start" value={endDate} min={startDate} onChange={e => this.setState({endDate: e.target.value})}/>
          <br></br>
          <span>Todos:</span>
          <Todo
              createTodoItem={this.createTodoItem}
              removeTodoItem={this.removeTodoItem}
              markTodoItem={this.markTodoItem}
              todoItems={this.state.todoItem}
          />
          <br></br>
          <button onClick={this.handleSetReminderToggle}>Set Reminder </button>
          <span>{setReminder? "🔔 On": "❌ Off"}</span>
          <br></br>
          <button onClick={this.submitTrip}>Save</button>
          <button onClick={this.props.toggleTrip}>Cancel</button>
        </div>
        

      </div>
    )
  }
}
export default Trip;
