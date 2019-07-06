import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import * as routes from './components/constants/routes';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Profile from './components/Profile/Profile';
// import Feed from './components/Feed/Feed';
import './App.css';

console.log(process.env)

class App extends Component {
  state = {
    logged: false,
    currentUser: ""
  }
  handleRegister = async (data) => {
    try {
      const registerCall = await fetch(`/users/registration`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await registerCall.json()
      console.log(response, 'from the flask server');
      if(response.register){
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
      const loginResponse = await fetch(`/users/login`, {
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
  
  deleteLogout = ()=>{
    this.setState({
      logged: false,
      currentUser: null
    })
  }

  updateCurrentUser = (info)=>{
    this.setState({
      currentUser: info
    })
    console.log(this.state.currentUser)
  }

  // getWines = async ()=>{
  //     try {
  //         const data = await fetch('https://api.globalwinescore.com/globalwinescores/latest/?wine_id=', {
  //             headers: {
  //                 "Accept": "application/json",
  //                 "Authorization": "Token 911c4473076f96f384b74008df0dff9596bc829c"
  //             }
  //         })
  //         const parsedData = await data.json()
  //         console.log(parsedData)
  //     } catch (error) { 
  //       console.log(error)
  //     }
  // }
  
  // componentDidMount(){
  //   this.getWines()
  // }
  

  render(){
    return (
      <div className="App">
      <Navbar logged={this.state.logged}/>
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
