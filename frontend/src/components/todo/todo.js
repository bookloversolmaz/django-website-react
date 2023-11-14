import axios from 'axios';
import React from 'react';
import { useState } from 'react';

// class ToDo extends React.Component {
//  // Create state that remembers details i.e. the database info as an array
//   state = {details: [], }

// // React will the below when the component is added (mounted) to the screen, calls data from backend using axios API.
//   componentDidMount() {




  // Respond to the event. Create an event handler (functions that are triggered by user interactions)
  // To add an event handler, you will first define a function and then pass it as a prop to the appropriate JSX tag. One event is a 
  // form and another a button to submit the entries
  // Trigger a render (delivering the diner's order to the kitchen)
const todoForm = ({ queryset }) => {
  // UseState hook updates the component with new data between renders
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  // TODO: create another component allows user to edit to do list in frontend e.g, read, add, delete, update.

  // Rendering the component (preparing the order in the kitchen)
  const handleSubmit = async (event) => {
    event.preventDefault();
  // Committing to the DOM (placing the order on the table)
  // TODO: ensure that changes made by the user updates the database in the backend
  // TODO: Fix error, whereby each time the backend is reloaded, each entry is re-rendered in the frontend

  // Renders the below using the information gathered from the backend





    let data;
    // The axios.get function returns a Promise
    axios.get('http://localhost:8000')
    // When you call .then() on the Promise, you provide a callback function that will be executed when the Promise is resolved (when the data is successfully fetched). 
    .then( response => {
      data = response.data;
      this.setState({
        details: data
      });
    })
    // .catch() method handles errors if the Promise is rejected (if there's an error during the fetch operation).
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <>
    <header>My website</header>
      <form action={handleSubmit}>
      <input name="query" />
      <button type="submit">Search</button>
    </form>
    </>
  )

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
}

export default todoForm;