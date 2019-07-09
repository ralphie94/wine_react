import React, {Component} from 'react'
import styled from 'styled-components';
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
    button{
        border-radius: 4px;
        font-size: 20px;
        color: white;
        border: 1px solid white;
        padding: 5px;
        text-align: center;
        background-color: transparent;
        width: 8.5vw;
        margin: 6px;
        transition: 0.6s;
    }
    button:hover{
        border: 2px solid #5a0032; 
        color: #5a0032;
        background-color: white;

    }
    h1, button{
        display: flex;
        flex-direction: column;
        align-self: center;
        font-family: 'Raleway', sans-serif;
    }
    .modal-buttons{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        transition: 0.6s;
    }
    h1 {
        color: white;
    }
`

class Explore extends Component{
    state = {
        posts: [],
        showModal: false,
        imgPreviewUrl:'',
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
            showModal: false,
            img: '',
            imgPreviewUrl: '',
            wine: '',
            vintage: '',
            comment: '',
        })
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleImagePreview = async(e)=>{
        let reader = new FileReader()
        let imgFile = e.target.files[0]
        reader.onloadend = ()=>{
            this.setState({
                img: imgFile,
                imgPreviewUrl: reader.result
            })
        }
        reader.readAsDataURL(imgFile)
    }

    getPosts = async ()=>{
        try {
            const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wine/posts`, {
                credentials: 'include'
            })
            const parsedData = await data.json()
            return parsedData
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getPosts().then(data=>{
            this.setState({
                posts: data
            })
        })
    }

    uploadImage = ()=>{
        const image = new FormData();
        image.append('file', this.state.img)
        image.append('filename', this.state.img.name)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
            method: 'POST',
            body: image,
        }).then(response=>{
            console.log(response)
            response.json().then(body=>{
                console.log(body)
                // this.setState({
                //     img: `${process.env.REACT_APP_BACKEND_URL}${body.destination}`
                // })
                // this.createPost()
            })
        })
    }

    createPost = async ()=>{
        try {
            const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wine/posts`, {
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
            return parsedData
        } catch (error) {
            console.log(error)
        }
    }
    
    render(){
        let {imgPreviewUrl} = this.state;
        const imgPreview = imgPreviewUrl === '' ? <div className="img-preview"></div> : <img src={imgPreviewUrl} alt ='' /> 
        return(
            <ExplorePage>
                <div className="entire-feed">
                    <h1>Explore</h1>
                    <button onClick={this.showModal}>New Post</button>
                    <Feed posts={this.state.posts}/>
                </div>
                    <NewPost show={this.state.showModal}>
                        <div className="post-preview">
                            <p className="preview-text">preview</p>
                            {imgPreview}
                            <div>
                                <p>{this.state.wine}</p>
                                <p>Vintage:{this.state.vintage}</p>
                                <p>@{this.state.user}: {this.state.comment}</p>
                            </div>
                        </div>
                        <div className='post-info'>
                            <div>
                                <form onSubmit={this.preventDefault}>
                                    <input 
                                        style={{display: 'none'}} 
                                        type='file' 
                                        className="input" 
                                        name='img' 
                                        onChange={this.handleImagePreview}
                                        ref={fileInput => this.fileInput = fileInput}/>
                                    <button onClick={()=> this.fileInput.click()}>Upload an Image</button> 
                                    <span>Wine:</span><input className="input" type='text' name='wine' value={this.state.wine} onChange={this.handleChange}/>
                                    <span>Vintage:</span><input className="input" type='text' name='vintage' value={this.state.vintage} onChange={this.handleChange}/>
                                    <span>Comments:</span><input className="input" type='text' name='comment' maxLength='200' value={this.state.comment} onChange={this.handleChange}/>
                                </form>
                                <div className="modal-buttons">
                                    <button onClick={this.uploadImage} >Post</button>
                                    <button onClick={this.hideModal} >Cancel</button>
                                </div>    
                            </div>
                        </div>
                    </NewPost>
            </ExplorePage>
        )
    }
}

export default Explore;