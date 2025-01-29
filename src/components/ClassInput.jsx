/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Laundry', 'Groceries'],
      inputVal: '',
      editStatus: 'Edit',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
    
  }

  handleComplete(index) {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo, i)=> i !== index)
    }))
   console.log('delete') ;
  }

  handleEdit(event){
    const editID = event.target.id;
    console.log(editID);

    
  }
    /*
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo, i)=> i !== index)
    }))
    */
  }



  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={todo} id={index}>{todo}
            <button id={`compete-${index}`} onClick={()=>this.handleComplete(index)}>Completed</button>
            <button id={`edit-${index}`} onClick= {this.handleEdit}>{this.state.editStatus}</button>
            </li>
          ))}
        </ul>
        <span>Tasks to Complete: {this.state.todos.length}</span>
      </section>
    );
  }
}

export default ClassInput;
