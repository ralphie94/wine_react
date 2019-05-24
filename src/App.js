import React, { Component } from 'react';
import Register from './register/register'
import './App.css';

class App extends Component {

  handleRegister = async (data) => {
    try {
      const registerCall = await fetch('http://localhost:8000/users/registration', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await registerCall.json()
      console.log(response, 'from the flask server');

    } catch(err){
      console.log(err)
    }
  }

  render(){
    return (
      <div className="App">
        <Register handleRegister={this.handleRegister} />
      </div>
    );
  }
}

export default App;
