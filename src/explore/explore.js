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

    .entire-feed{
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: column;
    }
    .feed-posts{
        display: flex;
        overflow-y: scroll
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
        posted_by: this.props.user.username
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
            this.setState({
                showModal: false
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
                    posts will populate below...
                    <Feed posts={this.state.posts}/>
                </div>
                    <NewPost show={this.state.showModal}>
                        <div className="post-preview">
                            <p>preview</p>
                            <img src={this.state.img}/>
                            <p>wine:{this.state.wine}</p>
                            <p>vintage:{this.state.vintage}</p>
                            <p>{this.state.posted_by}: {this.state.comment}</p>
                        </div>
                        <div className='post-info'>
                            <form onSubmit={this.preventDefault}>
                                <input type='text' name='img' placeholder="upload an image" value={this.state.img} onChange={this.handleChange}/>
                                <input type='text' name='wine' placeholder="wine" value={this.state.wine} onChange={this.handleChange}/>
                                <input type='text' name='vintage' placeholder="vintage" value={this.state.vintage} onChange={this.handleChange}/>
                                <input type='text' name='comment' placeholder="comment" value={this.state.comment} onChange={this.handleChange}/>
                                <button onClick={this.createPost}>Post</button>
                                <button onClick={this.hideModal}>Cancel</button>
                            </form>
                        </div>
                    </NewPost>
            </ExplorePage>
        )
    }
}

export default Explore;