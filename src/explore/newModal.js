import React from 'react';
import styled, {css} from 'styled-components';

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
        height: 50vh;
        width: auto;
        /* width: 220px;
        height: 280px; */
        border: 1px solid white;
        background-color: rgb(203,190,181);
        overflow-y: hidden;
        overflow-x: hidden;
    }
    img {
        width: auto;
        height: 60%;
        align-self: center;
        margin: 6px;
    }
    section {
        display: flex;
        flex-direction: row;
    }
    .post-info {
        width: 350px;
        height: 280px;
        background-color: rgb(56, 0, 0);
        margin-left: 15px;
        border-radius: 5px;
        border: 2px solid #cbbeb5;
    }
    .input{
        height: 20px;
        width: 40vh;
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