import React from 'react';
import ('./Todo.css');
class Todo extends React.Component {
  state = {
    title: "",
  }
  storeTodo = ()=> {
    this.props.createTodoItem(this.state.title);
    this.setState(this.state)
  }
  render () {
    return <div className='message-box'>
      {this.props.todoItems !== undefined  ? this.props.todoItems.map(item=>{
        return (
        <div className="todoContainer" key={item.title}>
          <button className="toggleButton" onClick={()=> this.props.markTodoItem(item.title)}>{item.doneStatus? "🔵":"🔴"}</button>
          <span className="todoItem">{item.title}</span>
          <button className="removeButton" onClick={() => this.props.removeTodoItem(item.title)}>Remove</button>
        </div>)
      }
        ): "No items to display"}
      <div className="addTodos">
        <input type="text" onChange={e => this.setState({title: e.target.value})} placeholder="Todo Item"/>
        <button onClick={this.storeTodo}>Add Todo Item</button>  
      </div>
      
      
    </div>
  }
}
export default Todo;