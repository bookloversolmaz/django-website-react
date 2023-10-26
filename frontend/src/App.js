import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = {details: [], }
  
  componentDidMount() {
    let data;
    axios.get('localhost.8000')
    .then( res => {
      data = res.data;
      this.setState({
        details: data
      });
    })
    .catch(err => { })
  }

  render() {
    return (
      <div>
        <header>My website</header>
        <hr></hr>
        {this.state.details.map((queryset, id) => (
          <div> key={id}
          <div>
            <h2>{this.state.item}</h2>
            <h3>{this.state.description}</h3>
          </div>
          </div>
        ))}
      </div>
    )
  }
}

export default App;