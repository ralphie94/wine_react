import React, { Component} from "react";

class Profile extends Component {
    state = {
        username: "",
        password: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <form className="loginforms">
            <h1>Edit Info</h1>
                <input type="text" name="username" placeholder="Username" className="inputbox"></input><br/>
                <input type="password" name="password" placeholder="Password" className="inputbox"></input><br/>
                <button type="submit" className="btn">Edit</button>
            </form>
        )
    }
}

export default Profile;