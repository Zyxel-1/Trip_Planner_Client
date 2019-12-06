import React, {Component} from 'react';
import './Filter.css';
class FilterBox extends Component {
  
  render(){
    return(
      <div className="filterBox">
        <p>Filter</p>
        <button onClick={this.props.toggleTrip}>Create New Trip</button>
        <input type="text"/>
        <button>Search</button>
        
        <select>
          <option value="">Catagories</option>
        </select>
      </div>
    )
  }
}
export default FilterBox;
