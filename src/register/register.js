import React, { Component } from 'react';
import styled from 'styled-components';

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
        return(
            <RegisterForms>
                <form onSubmit={this.handleSubmit}>
                <h1>Register</h1>
                    <input type='text' name='username' placeholder='Username' onChange={this.handleChange}/><br/>
                    <input type='password' name='password' placeholder='Password' onChange={this.handleChange}/><br/>
                    <input type='password' name='verify_password' placeholder='Verify Password' onChange={this.handleChange}/><br/>
                    <button type='submit'>Register</button>
                </form>
            </RegisterForms>
        )
    }
}
export default Register;

