import React, { Component} from "react";
import EditModal from "./editmodal"
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import Feed from './feed';

const ProfilePage = styled.div`
    background-image: url("imgs/winecellar.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    align-content: center;
    justify-content: center;

    .profile-main{
        background-color: rgba(124,83,77, 0.6);
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: column;
        height: 88vh;
        width: 80vw;
        padding-top: 70px;
    }
    .top-five{
        background-color: transparent;
        border: 2px solid white;
        border-radius: 6px;
        height: 20vh;
        width: 60vw;
        align-self: center;
        color: white;
    }
    button{
        border-radius: 4px;
        font-size: 20px;
        color: white;
        border: 1px solid white;
        /* background-color: rgba(64, 49, 33, 0.7); */
        padding: 5px;
        text-align: center;
        background-color: transparent;
        width: 10vw;
        margin: 6px;

    }
    button:hover{
        border: 2px solid white; 
        color: white;
        background-color: #5a0032;
    }
    h1 {
        color: white;
    }
    .feed-posts{
        display: flex;
        overflow-y: scroll;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin-top: 30px;
    }
    .single-post{
        background-color: rgb(203,190,181);
        color: rgb(64, 49, 33);
        height: 50vh;
        width: auto;
        display: flex;
        flex-direction: column;
        padding: 10px;
        margin: 10px;
    }
    .single-post > img {
        width: auto;
        height: 60%;
        align-self: center;
    }
    .single-post-comment {
        margin-top: 15px;
    }
    .small-button{
        border-radius: 4px;
        font-size: 12px;
        color: white;
        border: 1px solid white;
        /* background-color: rgba(64, 49, 33, 0.7); */
        padding: 5px;
        text-align: center;
        background-color: transparent;
        width: 6vw;
        margin: 6px;

    }
    .small-button:hover{
        /* color: rgba(52, 66, 38, 1);
        background-color: rgba(131,165,97, 0.8);*/
        border: 2px solid white; 
        color: white;
        background-color: #5a0032;

    }
    .edit-buttons{
        display: flex;
        align-self: flex-end;
    }
`


class Profile extends Component {
    state = {
        username: "",
        password: null,
        showModal: false,
        userPosts: []
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
        this.props.history.push('/')
    }

    deleteUser = async (e) => {
        e.preventDefault()
       try{
        const removeUser = await fetch(`http://localhost:8000/users/${this.props.user.id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const removeUserJson = await removeUser.json();
        console.log(removeUserJson)
        this.props.history.push('/')
        if(removeUserJson.deleted){
            this.props.deleteLogout()
        }
       } catch(err){
           console.log(err);
       }
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
    getPosts = async ()=>{
        try {
            const data = await fetch(`http://localhost:8000/wine/userposts/${this.props.user.id}`, {
                credentials: 'include'
            })
            const parsedData = await data.json()
            console.log(parsedData)
            return parsedData
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount(){
        console.log('user posts did mount')
        this.getPosts().then(data=>{
            this.setState({
                userPosts: data
            })
        })
    }
    render(){
        return(
            <ProfilePage>
                <div className="profile-main">
                    <h1>YOUR CELLAR</h1>
                    <button onClick={this.showModal}>Edit Profile</button>
                    <div className="top-five">
                        <h3>TOP 5</h3>
                    </div>
                    <Feed posts={this.state.userPosts} />
                </div>
                    <EditModal show={this.state.showModal}>
                        <h1>Edit Info</h1>
                        <form>
                          <input type="text" name="username" placeholder="Username" className="inputbox" onChange={this.handleChange}></input><br/>
                          <input type="password" name="password" placeholder="Password" className="inputbox" onChange={this.handleChange}></input><br/>
                          <button type="submit" className="btn" onClick={(e) => this.updateUser(e)}>Save Changes</button>
                          <button className="btn" onClick={(e)=>this.deleteUser(e)}>Delete User</button>
                          <button onClick={this.hideModal} className="btn">Close</button>
                        </form>
                    </EditModal>
                    {/* <EditPost>

                    </EditPost>
                    <Ays>
                        
                    </Ays> */}
            </ProfilePage>
        )
    }
}


export default withRouter(Profile);
