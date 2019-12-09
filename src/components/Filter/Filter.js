import React, {Component} from 'react';
import './Filter.css';
class FilterBox extends Component {
  state = {
    searchQuery: '',
  }
  searchByValue = () =>{
    this.props.sortByCategories(this.state.searchQuery);
  }
  render(){
    return(
      <div className="filterBox">
        <h1>Filter</h1>
        <button className="createTripButton" onClick={this.props.toggleTrip}>Create New Trip</button>
        <br></br>
        <h1>Search</h1>
        <input className="searchBar" type="text" onChange={e=> this.setState({searchQuery: e.target.value})}/>
        <button onClick={this.searchByValue}>Search</button>
        <br></br>
        
        <h1>Organize by Categories:</h1>
        <select className="catagoriesDropdown" onChange={e=> this.props.sortByCategories(e.target.value)}>
          <option value="None">None</option>
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
        </select>
      </div>
    )
  }
}
export default FilterBox;
