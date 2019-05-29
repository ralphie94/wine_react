import React, { Component} from "react";
import Modal from "./editmodal"

class Profile extends Component {
    state = {
        username: "",
        password: "",
        showModal: false,
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateUser = async (e) => {
        e.preventDefault();
        const updatedUser = await fetch("http://localhost:8000/users", {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({ username: this.state.username, password: this.state.password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const updateUserJson = await updatedUser.json();
        this.props.logged(updateUserJson.updateUser)
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    hideModal = () => {
        this.setState({
            showModal: false
        })
    }

    render(){
        return(
            <div>
            <h1>User Profile</h1>
            <button onClick={this.showModal}>Edit</button>
            <Modal show={this.state.showModal} hide={this.state.hideModal}>
            <form className="loginforms" onSubmit={(e) => this.updateUser(e)}>
            <h1>Edit Info</h1>
                <input type="text" name="username" placeholder="Username" className="inputbox"></input><br/>
                <input type="password" name="password" placeholder="Password" className="inputbox"></input><br/>
                <button type="submit" className="btn">Edit</button>
            </form>
            </Modal>
            </div>
        )
    }
}

export default Profile;