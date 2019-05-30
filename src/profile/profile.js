import React, { Component} from "react";
import EditModal from "./editmodal"

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
        const updatedUser = await fetch(`http://localhost:8000/users/${this.props.user.id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const updateUserJson = await updatedUser.json();
        console.log(updateUserJson)
        // this.props.logged(updateUserJson.updateUser)
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
                <h1>{this.props.user.username}</h1>
                <button onClick={this.showModal}>Edit</button>
                <EditModal show={this.state.showModal}>
                    <h1>Edit Info</h1>
                    <form onSubmit={(e) => this.updateUser(e)}>
                        <input type="text" name="username" placeholder="Username" className="inputbox" onChange={this.handleChange}></input><br/>
                        <input type="password" name="password" placeholder="Password" className="inputbox" onChange={this.handleChange}></input><br/>
                        <button type="submit" className="btn" onSubmit={(e) => this.updateUser(e)}>Save Changes</button>
                        <button onClick={this.hideModal} className="btn">Close</button>
                    </form>
                </EditModal>
            </div>
        )
    }
}

export default Profile;