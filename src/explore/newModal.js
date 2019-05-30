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
        width: 220px;
        height: 280px;
        border: 1px solid white;
        background-color: #c6a4a8;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    section {
        display: flex;
        flex-direction: row;
    }
    .post-info {
        width: 500px;
        height: 280px;
        background-color: white;
        margin-left: 15px;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    input {
        border-radius: 4px;
        font-size: 20px;
        margin: 10px 30px;
    }
    img {
        width: 190px;
        height: 180px;
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