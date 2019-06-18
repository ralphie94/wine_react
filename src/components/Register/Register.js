import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from "react-router-dom";

const RegisterStyle = styled.div`
    background-color: rgb(56 0 0);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    input{
        height: 5vh;
        width: 40vh;
        border-radius: 1vh;
        font-size: 20px;
        border: transparent;
        background-color: rgba(255, 255, 255, 0.2);
        display: flex;
        padding: 4px;
        color: white;
    }
    span{
        color: white;
        font-family: 'Raleway', sans-serif;
        font-size: 18px;
    }
    button{
        border-radius: 4px;
        font-size: 20px;
        color: white;
        border: 1px solid white;
        background-color: transparent;
        float: right;
        padding: 5px;
        font-family: 'Raleway', sans-serif;
    }
    button:hover{
        color: #5a0032;
        background-color: white;
    }
    h1{
        font-size: 30px;
        color: white;
        font-family: 'Raleway', sans-serif;
        margin: 25px;
    }
`

class Register extends Component {
    state = {
        username: "",
        password: "",
        verify_password: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleRegister(this.state)
    }

    render(){
        const { username, password, verify_password } = this.state
        return(
            <div>
                
            {this.props.logged
            ? <Redirect to={`/`}/>
            : <RegisterForm 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            username={username}
            password={password}
            verify_password={verify_password}/>}
            </div>
        )
    }
}
const RegisterForm = ({handleChange, handleSubmit, username, password, verify_password}) => 
<RegisterStyle>
    <h1>Create an Account</h1>
    <form onSubmit={e => handleSubmit(e)}>
        <span>Username:</span><input type='text' name='username' onChange={handleChange} value={username}/><br/>
        <span>Password:</span><input type='password' name='password' onChange={handleChange} value={password}/><br/>
        <span>Verify Password:</span><input type='password' name='verify_password' onChange={handleChange} value={verify_password}/><br/>
        <button type='submit'>Register</button>
    </form>
</RegisterStyle>


export default Register;

