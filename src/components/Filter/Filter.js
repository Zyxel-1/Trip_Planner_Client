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
        
        <button className="createTripButton" onClick={() => this.props.toggleTrip('create')}>Create New Trip</button>
        <br></br>
        <h1>Filter by value:</h1>
        <p className="FilterDescription">Searches Titles, Destinations, and todo items </p>
        <input className="searchBar" type="text" onChange={e=> this.setState({searchQuery: e.target.value})}/>
        <button onClick={()=>this.props.sortByQuery(this.state.searchQuery)}>Search</button>
        <br></br>
        
        <h1>Filter by Categories:</h1>
        <select className="catagoriesDropdown" onChange={e=> this.props.sortByCategories(e.target.value)}>
          <option value="None">None</option>
          <option value="Personal">Personal</option>
          <option value="Business">Business</option>
        </select>
        <button className="resetFilterButton" onClick={this.props.resetFilter}>Reset Filters</button>
      </div>
    )
  }
}
export default FilterBox;
