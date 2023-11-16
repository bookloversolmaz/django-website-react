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

class ToDo extends React.Component {
  // Create initialList that remembers details i.e. the database info as an array
  initialList =  { details: [], }
  // TODO: connect to the backend via axios
  componentDidMount() {
  let data;
  // The axios.get function returns a Promise
  axios.get('http://localhost:8000')
  // When you call .then() on the Promise, you provide a callback function that will be executed when the Promise is resolved (when the data is successfully fetched). 
  .then( response => {
  data = response.data;
  this.setInitialList({
    details: data ({
      item : item
      })
    });
  });
  this.componentDidCatch(error, info)
  logErrorToMyService(error, info.componentStack);

  
const [list, setList] = useState(ToDo);
const [item, setItem] = useState("");

  return (
    <>
      <input
        value={text}
        onChange={event => setItem(event.target.value)}
      />
  <button onClick={() => {
        state('');
        setList([{
          id: item.length,
          item: item
        }, ...item]);
      }}>Add</button> */
      <ul>
        {list.map(data => (
          <div data-testid='todo-1' key={id}> {" "}
          <li key={data.id}>
            {setItem.item}
          </li>
          </div>
        ))}
      </ul>
    </>
  );
  };

}

export default ToDo;