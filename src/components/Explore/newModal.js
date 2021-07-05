import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    
    .hide-modal {
        display: none;
    }
    .show-modal {
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 10;
    }
    .post-preview {
        padding: 10px;
        color: rgb(64, 49, 33);
        height: 22em;
        max-width: 20em;
        min-width: 14.5em;
        border: 1px solid white;
        background-color: rgb(203,190,181);
        overflow-y: auto;
        transition: .6s;
    }
    img {
        height: 13em;
        width: 13em;
        object-fit: cover;
        margin: .5em auto;
        display: flex;
    }
    .img-preview {
        margin: .5em 0;
        width: 13em;
        height: 13em;
        background-color: #b09898;
    }
    section {
        display: flex;
        flex-direction: row;
    }
    .post-info {
        width: 24em;
        height: 22em;
        background-color: rgb(56, 0, 0);
        margin-left: 15px;
        border-radius: 5px;
        border: 2px solid #cbbeb5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .input{
        height: 20px;
        min-width: 17em;
        border-radius: 1vh;
        font-size: 20px;
        border: transparent;
        background-color: rgba(255, 255, 255, 0.2);
        display: flex;
        padding: 4px;
        color: white;
        margin: 0px 0;
    }
    span{
        color: white;
        width: 20vw;
        margin: 5px;
        align-self: flex-start;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5px;
    }
    .preview-text{
        text-align: center;
        color: rgb(64, 49, 33);        
        text-decoration: underline;
    }
`

const NewPost = ({show, children})=>{
    const showOrHide = show ? 'show-modal' : 'hide-modal'
    return(
        <Modal>
            <div className={showOrHide}>
                <section>
                    {children}
                </section>    
            </div>
        </Modal>
    )
}

export default NewPost;