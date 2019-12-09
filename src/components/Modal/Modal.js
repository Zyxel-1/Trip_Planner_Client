import React from 'react';
import ('./Modal.css');
class Modal extends React.Component {
  chosenTrip = (trip) => {
    this.props.displayTrip(trip)
    this.props.hideModal();
  }
  render(){
    if(!this.props.show){
      return null;
    }
    return <div className="modal">
      <div className="modalBody">
            <h1>You have Reminders <span>🔔</span></h1>
            <p>These are the trips you set to remind you as the start date approaches.</p>
            <table className="modalTable">
            <thead>
              <tr className="columnTitles">
              <td>Title</td>
              <td>Destination</td>
              <td>Start Date</td>
              <td>Items to Complete</td>
              <td>Planning Status</td>
            </tr>
              </thead>
            <tbody>
            {this.props.upComingTrips.length === 0? "No data to display":this.props.upComingTrips.map(trip=>{
              return(
                <tr className="tableRow" key={trip._id} onClick={()=>this.chosenTrip(trip)}>
                  <td>{trip.title}</td>
                  <td>{trip.destination}</td>
                  <td>{trip.startDate.substring(5,10) }</td>
                  <td>{trip.todoItem.filter(item => item.doneStatus === false).length}</td>
                  <td>{trip.todoItem.every(item=>item.doneStatus) ? "Ready" : "In Progress"}</td>
                </tr>
              )
            })}
            </tbody>
            </table>
            <button className="closeButton" onClick={this.props.hideModal}>Close</button>
          </div>
    </div>
    
  }
}

export default Modal;