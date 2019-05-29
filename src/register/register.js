import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from "react-router-dom";

const RegisterForms = styled.div`
    display: flex;
    align-content: center;
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

<form onSubmit={e => handleSubmit(e)}>
<h1>Register</h1>
    <input type='text' name='username' placeholder='Username' onChange={handleChange} value={username}/><br/>
    <input type='password' name='password' placeholder='Password' onChange={handleChange} value={password}/><br/>
    <input type='password' name='verify_password' placeholder='Verify Password' onChange={handleChange} value={verify_password}/><br/>
    <button type='submit'>Register</button>
</form>


export default Register;

