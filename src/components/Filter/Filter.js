import React, {Component} from 'react';
import './Filter.css';
class FilterBox extends Component {
  
  render(){
    return(
      <div className="filterBox">
        <h1>Filter</h1>
        <button className="createTripButton" onClick={this.props.toggleTrip}>Create New Trip</button>
        <br></br>
        <input className="searchBar" type="text"/>
        <button>Search</button>
        <br></br>
        <select className="catagoriesDropdown">
          <option value="Catagories">Catagories</option>
          <option value="None">None</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
    )
  }
}
export default FilterBox;
