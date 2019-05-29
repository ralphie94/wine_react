import React from 'react'
import styled, {css} from 'styled-components'


const Feed = (props)=>{
    const feedPosts = props.posts.map(post=>{
        return (
            <div className="single-post">
                <img src={post.img}/>
                <p>{post.wine}</p>
                <p>vintage:{post.vintage}</p>
                <p>{post.posted_by}: {post.comment}</p>
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