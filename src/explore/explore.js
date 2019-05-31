import React, {Component} from 'react'
import styled, {css} from 'styled-components';
import NewPost from './newModal';
import Feed from './feed';


const ExplorePage = styled.div`
    background-image: url("imgs/explorepg.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    color: white;
    display:flex;
    justify-content: center;
    
    .entire-feed{
        background-color: rgba(64, 49, 33, 0.6);
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        height: 85vh;
        width: 80vw;
        padding-top: 75px;
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
    button{
        border-radius: 4px;
        font-size: 20px;
        color: white;
        border: 1px solid white;
        /* background-color: rgba(64, 49, 33, 0.7); */
        padding: 5px;
        text-align: center;
        background-color: transparent;
        width: 8vw;
        margin: 6px;

    }
    button:hover{
        /* color: rgba(52, 66, 38, 1);
        background-color: rgba(131,165,97, 0.8);*/
        border: 2px solid #5a0032; 
        color: #5a0032;
        background-color: white;

    }
    h1, button{
        display: flex;
        flex-direction: column;
        align-self: center;

    }
    .modal-buttons{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    h1 {
        color: white;
    }
`
class Explore extends Component{
    state = {
        posts: [],
        showModal: false,
        img: '',
        wine: '',
        vintage: '',
        comment: '',
        user: this.props.user.username,
        posted_by: this.props.user.id
    }
    preventDefault = (e)=>{
        e.preventDefault();
    }
    showModal = ()=>{
        this.setState({
            showModal: true
        })
    }
    hideModal = ()=>{
        this.setState({
            showModal: false
        })
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getPosts = async ()=>{
        try {
            const data = await fetch('http://localhost:8000/wine/posts', {
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
        console.log('component did mount')
        this.getPosts().then(data=>{
            this.setState({
                posts: data
            })
        })
    }
    createPost = async ()=>{
        try {
            const data = await fetch('http://localhost:8000/wine/posts', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const parsedData = await data.json()
            this.getPosts().then(data=>{
                this.setState({
                    posts: data,
                    showModal: false
                })
            })
            console.log(parsedData)
        } catch (error) {
            console.log(error)
        }
    }
    render(){
        return(
            <ExplorePage>
                <div className="entire-feed">
                    <h1>Explore</h1>
                    <button onClick={this.showModal}>New Post</button>
                    <Feed posts={this.state.posts}/>
                </div>
                    <NewPost show={this.state.showModal}>
                        <div className="post-preview">
                            <p>preview</p>
                            <img src={this.state.img}/>
                            <p>{this.state.wine}</p>
                            <p>vintage:{this.state.vintage}</p>
                            <p>@{this.state.user}: {this.state.comment}</p>
                        </div>
                        <div className='post-info'>
                           <form onSubmit={this.preventDefault}>
                                <span>Upload Image:</span><input type='text' className="input" name='img' onChange={this.handleChange}/>
                                <span>Wine:</span><input className="input" type='text' name='wine' value={this.state.wine} onChange={this.handleChange}/>
                                <span>Vintage:</span><input className="input" type='text' name='vintage' value={this.state.vintage} onChange={this.handleChange}/>
                                <span>Comments:</span><input className="input" type='text' name='comment' maxLength='200' value={this.state.comment} onChange={this.handleChange}/>
                            </form>
                            <div className="modal-buttons">
                                <button onClick={this.createPost} >Post</button>
                                <button onClick={this.hideModal} >Cancel</button>
                            </div>    
                        </div>
                    </NewPost>
            </ExplorePage>
        )
    }
}

export default Explore;