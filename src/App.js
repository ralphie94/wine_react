import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import * as routes from './constants/routes';
import Navbar from './navbar/navbar';
import Register from './register/register';
import Login from './login/login';
import Home from './Home/home';
import Explore from './explore/explore';
import Profile from './profile/profile';
import Feed from './feed/feed';
import './App.css';

class App extends Component {
  state = {
    logged: false,
    currentUser: ""
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
      if(response.message = 'success'){
        this.setState({
          logged: true,
          currentUser: response.user
        })
      } 

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
      if(parsedData.message === 'success'){
        this.setState({
          logged: true,
          currentUser: parsedData.user

        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  render(){
    return (
      <div className="App">
      <Navbar logged={this.state.logged}/>
      <Switch>
        <Route exact path={routes.REGISTER} render={() => <Register handleRegister={this.handleRegister} logged={this.state.logged}/>} />
        <Route exact path={routes.LOGIN} render={() => <Login login={this.handleLogin} logged={this.state.logged}/>}/>
        <Route exact path={routes.HOME} render ={() => <Home />}/>
        <Route exact path={routes.EXPLORE} render ={()=> <Explore user={this.state.currentUser}/>} />
        <Route exact path={routes.PROFILE} render ={() => <Profile logged={this.state.logged} user={this.state.currentUser}/>}/>
        {/* <Route exact path={routes.FEED} render ={() => <Feed />}/> */}
      </Switch>
      </div>
    );
  }
}

export default App;
