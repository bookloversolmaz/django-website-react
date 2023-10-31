import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = {details: [], }

  componentDidMount() {
    let data;
    axios.get('localhost.8000/admin')
    .then( res => {
      data = res.data;
      this.setState({
        details: data
      });
    })
    .catch(err => {
      console.error('Error fetching data:', err);
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

  