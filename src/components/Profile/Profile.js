import React, { Component} from "react";
import EditModal from "./editmodal"
import styled from 'styled-components';
import { Redirect, withRouter} from "react-router-dom";
import Feed from './feed';
import EditPostModal from './editPost';
import Ays from './aysmodal';
// import { async } from "q";

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
        font-family: 'Raleway', sans-serif;
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
        font-size: 16px;
        color: white;
        border: 1px solid white;
        /* background-color: rgba(64, 49, 33, 0.7); */
        padding: 5px;
        text-align: center;
        background-color: transparent;
        width: 11vw;
        margin: 6px;
        font-family: 'Raleway', sans-serif;

    }
    button:hover{
        border: 2px solid rgb(56, 0, 0); 
        color: rgb(56, 0, 0);
        background-color: white;
    }
    h1, .edit-profile {
        color: white;
        align-self: center;
        margin: 10px 0;
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
        border-radius: 4px;
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
    .small-button:hover, .edit-profile:hover{
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
    .modal-buttons{
        display: flex;
        justify-content: center;   
        margin: 10px 0;
    }
    .preview-text{
        text-align: center;
        color: white;
        text-decoration: underline;
    }
`


class Profile extends Component {
    state = {
        username: this.props.user.username,
        password: '',
        showModal: false,
        showPostModal: false,
        aysmodal: false,
        userPosts: [],
        img: '',
        wine: '',
        vintage: '',
        comment: '',
        postId: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateUser = async (e) => {
        e.preventDefault();
        const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.user.id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedData = await data.json();
        this.props.updateCurrentUser(parsedData);
        this.setState({
            showModal: false
        })
    }

    deleteUser = async (e) => {
        e.preventDefault()
       try{
        const removeUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${this.props.user.id}`, {
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

    showModal = (e) => {
        this.setState({
            [e.target.name]: true
        })
    }

    hideModal = (e) => {
        this.setState({
            [e.target.name]: false
        })
    }

    getPosts = async ()=>{
        try {
            const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wine/userposts/${this.props.user.id}`, {
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

    getOnePost = async (key)=>{
        console.log(key)
        try {
            const post = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wine/posts/${key}`, {
                credentials:'include'
            })
            const parsedPost = await post.json();
            console.log(parsedPost)
            this.setState({
                postId: key,
                img: parsedPost.img,
                wine: parsedPost.wine,
                vintage: parsedPost.vintage,
                comment: parsedPost.comment,
                showPostModal: true
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    postForDelete = (key)=>{
        console.log(key)
        this.setState({
            postId: key,
            aysModal: true
        })
    }
    updatePost = async()=>{
        try {
            const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wine/posts/${this.state.postId}`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                }               
            })
            const parsedData = await data.json();            
            this.getPosts().then(data=>{
                this.setState({
                    userPosts: data,
                    showPostModal: false
                })
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    deletePost = async()=>{
        try {
            const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wine/posts/${this.state.postId}`, {
                method: "DELETE",
                credentials: "include",
            })
            this.getPosts().then(data=>{
                this.setState({
                    userPosts: data,
                    aysModal: false
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
    render(){
        return(
            this.props.logged
            ? <ProfilePage>
                <div className="profile-main">
                    <h1>YOUR CELLAR</h1>
                    <button onClick={(e)=>this.showModal(e)} name="showModal" className="edit-profile">Edit Profile</button>
                    <div className="top-five">
                        <h3>TOP 5</h3>
                    </div>
                    <Feed posts={this.state.userPosts} username={this.state.username} getOnePost={this.getOnePost} postForDelete={this.postForDelete}/>
                </div>
                <EditModal show={this.state.showModal}>
                    <div className="edit-box">
                        <button onClick={(e)=>this.hideModal(e)} name="showModal" className="x-button">X</button>
                        <h1>Edit Profile</h1>
                        <form>
                            <span>Change Username:</span><input type="text" name="username" className="input" value={this.state.username} onChange={this.handleChange}></input><br/>
                            <span>Change Password:</span><input type="password" name="password" className="input" onChange={this.handleChange}></input><br/>
                            <div className='modal-buttons'>
                                <button onClick={(e)=>this.updateUser(e)}>Save Changes</button>
                                <button onClick={(e)=>this.deleteUser(e)}>Delete Account</button>
                            </div>
                        </form>
                    </div>
                </EditModal>
                <EditPostModal show={this.state.showPostModal}>
                    <div className="post-preview">
                        <p className="preview-text">preview</p>
                        <img src={this.state.img}/>
                        <p>{this.state.wine}</p>
                        <p>vintage:{this.state.vintage}</p>
                        <p>@{this.state.username}: {this.state.comment}</p>
                    </div>
                    <div className='post-info'>
                        <form onSubmit={this.preventDefault}>
                            {/* <span>Upload Image:</span><input type='text' className="input" name='img' onChange={this.handleChange}/> */}
                            <span>Wine:</span><input className="input" type='text' name='wine' value={this.state.wine} onChange={this.handleChange}/>
                            <span>Vintage:</span><input className="input" type='text' name='vintage' value={this.state.vintage} onChange={this.handleChange}/>
                            <span>Comments:</span><input className="input" type='text' name='comment' maxLength='200' value={this.state.comment} onChange={this.handleChange}/>
                        </form>
                        <div className="modal-buttons">
                            <button onClick={this.updatePost}>Save Changes</button>
                            <button onClick={(e)=>this.hideModal(e)} name="showPostModal">Cancel</button>
                        </div>    
                    </div>
                </EditPostModal>
                <Ays show={this.state.aysModal}>
                    <div className="ays-box">
                        <button onClick={(e)=>this.hideModal(e)} name="aysModal" className="x-button">X</button>
                        <h1>Are you sure you would like to delete this post?</h1>
                            <div className='modal-buttons'>
                                <button onClick={this.deletePost}>yes</button>
                                <button onClick={(e)=>this.hideModal(e)} name="aysModal">no</button>
                            </div>
                    </div>
                </Ays>
            </ProfilePage>
            : <Redirect to="/"/>
        )
    }
}


export default withRouter(Profile);
