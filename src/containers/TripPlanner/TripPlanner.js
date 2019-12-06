import React, {Component} from 'react';
import Filter from '../../components/Filter/Filter'
import Grid from '../../components/Grid/Grid'
import Trip from '../../components/Trip/Trip'
class TripPlanner extends Component {
  render(){
    return (
    <div>
      <Filter/>
      <Grid/>
      <Trip/>
    </div>);
  }
}

export default TripPlanner;