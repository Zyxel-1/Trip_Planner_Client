import React, {Component} from 'react';
import axios from 'axios';
import TokenServices from '../../utils/tokenServices';
import Todo from '../Todo/Todo';
import './Trip.css';

class Trip extends Component {
  state = {
    _id: '',
    title: '',
    destination: '',
    category: 'None',
    startDate:'',
    endDate:'',
    userID: '',
    todoItem: [],
    setReminder:false,
    mode: ''
  }
  componentDidMount(){
    if(this.props.mode === 'update'){
      this.setState({
        _id: this.props.displayTrip._id,
        title: this.props.displayTrip.title,
        destination:this.props.displayTrip.destination,
        category: this.props.displayTrip.category,
        startDate: this.props.displayTrip.startDate,
        endDate: this.props.displayTrip.endDate,
        userID: this.props.displayTrip.userID,
        todoItem: this.props.displayTrip.todoItem,
        setReminder: this.props.displayTrip.setReminder,
      })
    }
  }
  submitTrip = () => {
    const URL = process.env.REACT_APP_URL;
    const data = {
      title: this.state.title,
      destination: this.state.destination,
      category: this.state.category,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      userID: this.state.userID,
      todoItem: this.state.todoItem,
      setReminder: this.state.setReminder
    }
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
  updateTrip = () => {
    const URL = process.env.REACT_APP_URL;
    const data = {
      _id: this.state._id,
      title: this.state.title,
      destination: this.state.destination,
      category: this.state.category,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      userID: this.state.userID,
      todoItem: this.state.todoItem,
      setReminder: this.state.setReminder
    }
    const token = TokenServices.getWholeToken();
    data.userID = TokenServices.getToken().id;
    
    // Submit axios request to the backend
    axios.put(`${URL}/api/trip`,data,{
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
  removeTrip = () =>{
    const URL = process.env.REACT_APP_URL;
    const token = TokenServices.getWholeToken();
    
    axios.delete(`${URL}/api/trip/${this.state._id}`,{
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
  removeTodoItem = (title) =>{
    const todoItems = this.state.todoItem;
    const newTodoItems = todoItems.filter((todo)=>{
      return title !== todo.title
    })
    this.setState({todoItem: newTodoItems});
    
  }
  // Marks a todo item as complete or not
  markTodoItem = (title) =>{
    const todoItems = this.state.todoItem;
    const newTodoItems = todoItems.map((todo) => {
      if(todo.title === title){
        todo.doneStatus = !todo.doneStatus;
      }
      return todo;
    })
    this.setState({todoItem: newTodoItems});
  }
  // Toggles the value of setReminder
  handleSetReminderToggle = (event)=>{
    this.setState(prevState=>({ setReminder: !prevState.setReminder}))
  }
  render(){
    const {title, destination, startDate, category, endDate,setReminder} = this.state;
    return(
      <div className="tripBox">
        {this.props.mode === 'create'? <h1>New Trip</h1>: <h1>Selected Trip</h1>}
          <div className="formRow" >
            <span>Title:</span>
            <div className="inputContainer">
              <input type="text" value={title} onChange={e => this.setState({title: e.target.value})}/>
            </div>
            
          </div>
          <div className="formRow">
            <span>Destination:</span>
            <div className="inputContainer">
              <input type="text" value={destination} onChange={e => this.setState({destination: e.target.value})}/>
            </div>
            
          </div>
          <div className="formRow">
            <span>Category:</span>
            <div className="inputContainer">
              <select name="categories" value={category} onChange={e=>this.setState({category: e.target.value})}>
                <option value="None">None</option>
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
              </select>
            </div>
            
          </div>
          <div className="formRow">
            <span>Start Date:</span>
            <div className="inputContainer">
            <input type="date"  name="trip-start"  value={startDate !== undefined ? startDate.substring(0,10):new Date().toISOString().slice(0,10) } min={new Date().toISOString().slice(0,10)} onChange={e => this.setState({startDate: e.target.value})}/>
            </div>
            
          </div>
          
          <div className="formRow">
            <span>End Date:</span>
            <div className="inputContainer">
              <input type="date"  name="trip-start" value={endDate !== undefined ? endDate.substring(0,10):"" } min={startDate !== undefined ? startDate.substring(0,10):""} onChange={e => this.setState({endDate: e.target.value})}/>  
            </div>
            
          </div>
          
          <div>
            <span className="formRow">Todos:</span>
            <Todo
                createTodoItem={this.createTodoItem}
                removeTodoItem={this.removeTodoItem}
                markTodoItem={this.markTodoItem}
                todoItems={this.state.todoItem}
            />
          </div>
          <div className="setReminder">
            <button onClick={this.handleSetReminderToggle}>Set Reminder </button>
            <span>{setReminder? "🔔 On": "❌ Off"}</span>
          </div>
          
          <div className="buttonControls">
            {this.props.mode === "update" ? <button onClick={this.updateTrip}>Update</button>: <button onClick={this.submitTrip}>Create</button>  }
            <button onClick={this.props.toggleTrip}>Cancel</button>
            {this.props.mode === "update" ? <button onClick={this.removeTrip}>Delete</button>:null  }
          </div>
      </div>
    )
  }
}
export default Trip;
