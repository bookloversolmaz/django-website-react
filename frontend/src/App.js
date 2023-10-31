import axios from 'axios';
import React from 'react';

class App extends React.Component {
  // Create state that rememebers details i.e. the database info as an array
  state = {details: [], }

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

  render() {
    return (
      <div>
        <header>My website</header>
        <hr></hr>
        {this.state.details.map((queryset, id) => (
          <div key={id}> {" "}
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

export default App;

  