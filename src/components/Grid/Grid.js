import React from 'react';
import ('./Grid.css')
function GridBox(props) {
  
  return(
    <div className="gridBox">
      <h1>Planned Trips</h1>
      {console.log(props.Trips)}
      <table>
        <thead>
        <tr className="columnTitles">
        <td>Title</td>
        <td>Destination</td>
        <td>Duration</td>
        <td>Category</td>
        <td>Reminder</td>
        <td>Items to Complete</td>
        <td>Planning Status</td>
      </tr>
        </thead>
      <tbody>
      {props.Trips.length === 0? "No data to display":props.Trips.map(trip=>{
        return(
          <tr key={trip._id} onClick={()=>props.displayTrip(trip)}>
            <td>{trip.title}</td>
            <td>{trip.destination}</td>
            <td>{(Math.abs(new Date(trip.endDate) - new Date(trip.startDate))/1000)/86400 } days</td>
            <td>{trip.category}</td>
            <td>{trip.setReminder? "🔔":"❌"}</td>
            <td>{trip.todoItem.filter(item => item.doneStatus === false).length}</td>
            <td>{trip.todoItem.every(item=>item.doneStatus)?"Ready":"In Progress"}</td>
          </tr>
        )
      })}
      </tbody>
      
      </table>    
    </div>
  )
}
export default GridBox;
