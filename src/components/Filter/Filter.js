import React, {Component} from 'react';
import './Filter.css';
class FilterBox extends Component {
  
  render(){
    return(
      <div className="filterBox">
        <p>Filter</p>
        <input type="text"/>
        <button>Search</button>
      </div>
    )
  }
}
export default FilterBox;
