/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Laundry', 'Groceries'],
      inputVal: '',
      label: ['Edit', 'Edit'],
      editInput: ['closeInput', 'closeInput'],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }

 /* Handles the initial value entered */
  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }
  /* Handles the initial submit */
  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
    this.setState((state) => ({
      label: state.label.concat('Edit'),
    }));
    this.setState((state) => ({
      editInput: state.editInput.concat('closeInput'),
    }));
  }
 /* Handles completed todo */
  handleComplete(index) {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo, i)=> i !== index)
    }))
  }
  /* Handles edit button: (1) Change button label (2) Change class to display todo or input */
  handleLabel = (index) => {
    const numIndex = Number(index);
    
    this.setState((prevState) => {
      const newLabels = [...prevState.label];
      newLabels[numIndex] === 'Edit' ? newLabels[numIndex] = 'Resubmit' : newLabels[numIndex] = 'Edit';
      return { label: newLabels };
      })
    
      this.setState((prevState) => {
        const newClass = [...prevState.editInput]
        newClass[numIndex] === 'closeInput' ? newClass[numIndex] = 'openInput' :  newClass[numIndex] = 'closeInput';
        return { editInput: newClass };

      })
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
            <li key={todo} id={index}> {this.state.editInput[index] === 'closeInput' ? todo :
                <input
                type="text"
                name="edit-entry"
                value={this.state.inputVal}
                onChange={this.handleInputChange}
                className={this.state.editInput[index]}
              >
              </input>}
              {/*Mark as complete and remove todo*/}
              <button id={`compete-${index}`} onClick={()=>this.handleComplete(index)}>Completed</button>
              {/*Toggle between edit and resubmit*/}
              <button id={`edit-${index}`} onClick= {()=> this.handleLabel(index, 'clicked')}>{this.state.label[Number(index)]}</button>
             
            </li>
          ))}
        </ul>
        <span>Tasks to Complete: {this.state.todos.length}</span>
      </section>
    );
  }
}

export default ClassInput;
