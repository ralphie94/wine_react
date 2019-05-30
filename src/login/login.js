import React, { Component } from 'react';
import {Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";

const LoginStyle = styled.div`
    background-color: rgb(90 0 50);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    input{
        height: 5vh;
        width: 40vh;
        border-radius: 1vh;
        font-size: 20px;
        border: transparent;
        background-color: rgba(255, 255, 255, 0.2);
        display: flex;
    }
    span{
        color: white;
    }
    button{
        border-radius: 4px;
        font-size: 20px;
        color: white;
        border: 1px solid white;
        background-color: #5a0032;
        float: right;
    }
    h1{
        font-size: 50px;
        color: white;
    }
`

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
    }
    render(){
        return(
            this.props.logged
            ? <Redirect to='/'/>
            : <LoginStyle>
            <form onSubmit={this.handleSubmit} className="loginforms">
                <span>Username:</span> <input type='text' name='username' value={this.state.username} onChange={this.handleChange}></input><br/>
                <span>Password:</span> <input type='password' name='password' value={this.state.password} onChange={this.handleChange}></input><br/>
                <button type='submit'>Login</button>
            </form>
            </LoginStyle>
        )
    }
}

export default withRouter(Login);