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
      {this.props.todoItems.length > 0 ?this.props.todoItems.map(item=>{
        return (
        <div key={item.title}>
          <button onClick={()=> this.props.markTodoItem(item.title)}>{item.doneStatus? "🔵 Done":"🔴 Need todo"}</button>
          <span className="todoItem">{item.title}</span>
          <button onClick={() => this.props.removeTodoItem(item)}>Remove</button>
        </div>)
      }
        ): "No items to display"}
      <input type="text" onChange={e => this.setState({title: e.target.value})} placeholder="Todo Item"/>
      <button onClick={this.storeTodo}>Add Todo Item</button>
      
    </div>
  }
}
export default Todo;