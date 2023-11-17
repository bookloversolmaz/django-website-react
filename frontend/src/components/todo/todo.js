import axios from 'axios';
import React from 'react';
import { useState } from 'react';

// class ToDo extends React.Component {
//  // Create state that remembers details i.e. the database info as an array
//   state = {details: [], }
// // React will the below when the component is added (mounted) to the screen, calls data from backend using axios API.
//   componentDidMount() {
  //   let data;
  //   // The axios.get function returns a Promise
  //   axios.get('http://localhost:8000')
  //   // When you call .then() on the Promise, you provide a callback function that will be executed when the Promise is resolved (when the data is successfully fetched). 
    // .then( response => {
    //   data = response.data;
    //   this.setState({
    //     details: data ({
    //       item : item
    //     })
    //   });
    // })
    // // .catch() method handles errors if the Promise is rejected (if there's an error during the fetch operation).
    // .catch(error => {
    //   console.error('Error fetching data:', error);
    // });}
    // return (
      // <div>
      //   <header>My website</header>
      //   <hr></hr>
      //   {this.state.details.map((queryset, id) => (
      //     <div data-testid='todo-1' key={id}> {" "}
      //     <div>
      //       <h2>{queryset.item}</h2>
      //       <h3>{queryset.description}</h3>
      //     </div>
      //     </div>
      //   ))}
      // </div>
    // )
// }

const TodoList = () => {
  const [inputTask, setInputTask] = useState('');
  const [list, setList] = useState([]);

  // Connect to the backend, so that the user's actions updates the database containing the information
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data;
    axios.get('http://localhost:8000') 
    // When you call .then() on the Promise, you provide a callback function that will be executed when the Promise is resolved (when the data is successfully fetched). 
    .then( response => {
      data = response.data;
      this.setState({
        details: data ({
          item: inputTask
        })
      });
    })

    // .catch() method handles errors if the Promise is rejected (if there's an error during the fetch operation).
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  // Add an item to the to do list
  const handleAddTodo = (handleSubmit) => {
      const newTask = {
          id: Math.random(),
          item: inputTask
      };
    //  update the list state by using the spread operator […list] to create a new array with the existing tasks in the list. Append the newTask to the end of the array
     setList([...list, newTask]);
    // reset the inputTask state to an empty string, clearing the input field when the user clicks the button.
      setInputTask('');
  };
  // Delete item from the list
 const handleDeleteTodo = (handleSubmit, id) => {
      const newList = list.filter((todo) => todo.id !== id);
      setList(newList);
  };

  // event handler that adds the item to the list when the user licks the button
 const handleInputChange = (event) => {
      setInputTask(event.target.value);
  };

 return (
      <div className="Todo">
          <h1>My To do list</h1>

          <div className="Top">
              <input className="input" type="text" value={inputTask}
                 onChange={handleInputChange} placeholder="Enter a task" />

              <button className="btn" onClick={handleAddTodo}>Submit</button>
          </div>

         <ul>
              { list.map((queryset) => (
                  <li className="task" key={id}>
                      {queryset.item}
                      <button onClick={() => handleDeleteTodo(todo.id)}>
                         Delete
                     </button>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default TodoList; 