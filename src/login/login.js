import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    render(){
        return(
            <form>
                <h1>Login</h1>
                <input type='text' name='username' placeholder='Username'></input><br/>
                <input type='password' name='password' placeholder='Password'></input><br/>
                <button type='submit'>Login</button>
            </form>
        )
    }
}

export default Login;