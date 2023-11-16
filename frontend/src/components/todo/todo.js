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
  //   .then( response => {
  //     data = response.data;
  //     this.setState({
  //       details: data ({
  //         item : item
  //       })
  //     });
  //   })
  //   // .catch() method handles errors if the Promise is rejected (if there's an error during the fetch operation).
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });
  // }
    // return (
    //   <div>
    //     <header>My website</header>
    //     <hr></hr>
    //     {this.state.details.map((queryset, id) => (
    //       <div data-testid='todo-1' key={id}> {" "}
    //       <div>
    //         <h2>{queryset.item}</h2>
    //         <h3>{queryset.description}</h3>
    //       </div>
    //       </div>
    //     ))}
    //   </div>
    // )
// }


// TODO: enable user to edit to do list in frontend e.g, read, add, delete, update while also updating the backend
function CreateToDoList () {
  // Create state that remembers details i.e. the database info as an array
  state = {details: [], }
  // TODO: connect that to the backend and save it to the database

  function ConnectToBackend() {
    let data;
    // The axios.get function returns a Promise
    axios.get('http://localhost:8000')
    // When you call .then() on the Promise, you provide a callback function that will be executed when the Promise is resolved (when the data is successfully fetched). 
    .then( response => {
      data = response.data;
      this.setState({
        details: data ({
          item : item
        })
      });
    })
    // .catch() method handles errors if the Promise is rejected (if there's an error during the fetch operation).
    .catch(error => {
      console.error('Error fetching data:', error);
    });


  }
}
// TODO: create a form where user can enter items
// TODO: connect that to the backend and save it to the database
// TODO: render all of the items from the backend
// TODO: enable user to delete items from the list, which also deletes it from the backend
