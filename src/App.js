import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import * as routes from './constants/routes';
import Register from './register/register';
import Login from './login/login';
import Home from './Home/home';
import Navbar from './navbar/navbar';
import './App.css';

class App extends Component {
  state = {
    logged: false,
  }
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

  handleLogin = async (info)=>{
    try {
      const loginResponse = await fetch('http://localhost:8000/users/login', {
        method: "POST",
        credentials:'include',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': "application/json"
        }
      })
      const parsedData = await loginResponse.json()
      console.log(parsedData);
      if(parsedData.message = 'success'){
        this.setState({
          logged: true
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  render(){
    return (
      <div className="App">
      <Navbar />
      <Switch>
        <Route exact path={routes.REGISTER} render={() => <Register handleRegister={this.handleRegister}/>} />
        <Route exact path={routes.LOGIN} render={() => <Login login={this.handleLogin}/>}/>
        <Route exact path={routes.HOME} render ={() => <Home />}/>
      </Switch>
      </div>
    );
  }
}

export default App;
