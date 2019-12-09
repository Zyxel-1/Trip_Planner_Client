import React from 'react';
import ('./Spinner.css');
class Spinner extends React.Component {
  render(){
    if(!this.props.show){
      return null;
    }
    return (
      <div class="loader">Loading...</div>
    )
  }
}
export default Spinner;