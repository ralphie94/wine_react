import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import * as routes from './components/constants/routes';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Profile from './components/Profile/Profile';
import './App.css';
// import Feed from './components/Feed/Feed';

class App extends Component {
  state = {
    logged: false,
    currentUser: ""
  }

  handleRegister = async (data) => {
    try {
      const registerCall = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/registration`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const response = await registerCall.json()
      if(response.register){
        this.setState({
          logged: true,
          currentUser: response.user
        })
      } 
    } catch(error){
      console.log(error)
    }
  }

  handleLogin = async (info)=>{
    try {
      const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: "POST",
        credentials:'include',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': "application/json"
        }
      })
      const parsedData = await loginResponse.json()
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
  
  logout = ()=>{
    this.setState({
      logged: false,
      currentUser: null
    })
  }

  updateCurrentUser = (info)=>{
    this.setState({
      currentUser: info
    })
  }

  render(){
    return (
      <div className="App">
      <Navbar logged={this.state.logged} logout={this.logout} />
      <Switch>
        <Route exact path={routes.REGISTER} render={() => <Register handleRegister={this.handleRegister} logged={this.state.logged}/>} />
        <Route exact path={routes.LOGIN} render={() => <Login login={this.handleLogin} logged={this.state.logged}/>}/>
        <Route exact path={routes.HOME} render ={() => <Home logged={this.state.logged}/>}/>
        <Route exact path={routes.EXPLORE} render ={()=> <Explore user={this.state.currentUser}/>} />
        <Route exact path={routes.PROFILE} render ={() => <Profile logged={this.state.logged} user={this.state.currentUser} deleteLogout={this.deleteLogout} updateCurrentUser={this.updateCurrentUser} />}/>
        {/* <Route exact path={routes.FEED} render ={() => <Feed />}/> */}
      </Switch>
      </div>
    );
  }
}

export default App;
