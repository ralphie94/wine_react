import React, { Component } from 'react';

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
            <form onSubmit={this.handleSubmit}>
            <h1>Register</h1>
                <input type='text' name='username' onChange={this.handleChange}/><br/>
                <input type='password' name='password' onChange={this.handleChange}/><br/>
                <input type='password' name='verify_password' onChange={this.handleChange}/><br/>
                <button type='submit'>Register</button>
            </form>
        )
    }
}
export default Register;

