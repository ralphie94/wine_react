import React, { Component } from 'react';
import { withRouter } from "react-router-dom"

class Login extends Component {
    state = {
        username: "",
        password: ""
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        this.props.login(this.state)
        this.props.history.push("/")
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <input type='text' name='username' placeholder='Username' value={this.state.username}onChange={this.handleChange}></input><br/>
                <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange}></input><br/>
                <button type='submit'>Login</button>
            </form>
        )
    }
}

export default withRouter(Login);