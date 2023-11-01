import axios from 'axios';
import React from 'react';

class ToDo extends React.Component {
 // Create state that remembers details i.e. the database info as an array
  state = {details: [], }

// React will the below when the component is added (mounted) to the screen, calls data from backend using axios API.
  componentDidMount() {
    let data;
    axios.get('http://localhost:8000')
    .then( response => {
      data = response.data;
      this.setState({
        details: data
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  // TODO: create another component allows user to edit to do list in frontend e.g, read, add, delete, update.

  // TODO: Fix error, whereby each time the backend is reloaded, each entry is re-rendered in the frontend

  // Renders the below using the information gathered from the backend
  render() {
    return (
      <div>
        <header>My website</header>
        <hr></hr>
        {this.state.details.map((queryset, id) => (
          <div data-testid='todo-1' key={id}> {" "}
          <div>
            <h2>{queryset.item}</h2>
            <h3>{queryset.description}</h3>
          </div>
          </div>
        ))}
      </div>
    )
  }
}

export default ToDo;