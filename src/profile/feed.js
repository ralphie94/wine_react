import React from 'react'


const Feed = (props)=>{
    const feedPosts = props.posts.map(post=>{
        return (
            <div key={post.id} className="single-post">
                <img src={post.img}/>
                <p>{post.wine}</p>
                <p>Vintage:{post.vintage}</p>
                <p className="single-post-comment">@{props.username}: {post.comment}</p>
                <div className="edit-buttons"> 
                    <button className="small-button" onClick={()=>props.getOnePost(post.id)} >Edit</button>
                    <button className="small-button" onClick={()=>props.postForDelete(post.id)} >Delete</button>
                </div>
            </div>
        )
    })
    return(
        <div className="feed-posts">
            {feedPosts}
        </div>
    )
}

export default Feed;