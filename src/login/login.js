import React, { Component } from 'react';
import {Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";

const LoginStyle = styled.div`
    background-color: rgb(90 0 50);
    .loginforms{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
    .inputbox{
        height: 5vh;
        width: 40vh;
        border-radius: 1vh;
        font-size: 20px;
    }
    .btn{
        width: 15vh;
        height: 4vh;
        border-radius: 1vh;
        font-size: 15px;
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
                <h1>Login</h1>
                <input type='text' name='username' placeholder='Username' className='inputbox' value={this.state.username} onChange={this.handleChange}></input><br/>
                <input type='password' name='password' placeholder='Password' className='inputbox' value={this.state.password} onChange={this.handleChange}></input><br/>
                <button type='submit' className='btn'>Login</button>
            </form>
            </LoginStyle>
        )
    }
}

export default withRouter(Login);