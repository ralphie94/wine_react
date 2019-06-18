import React from "react";
import styled from "styled-components";

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
    .ays-box{
        width: 350px;
        height: 200px;
        background-color: rgb(56, 0, 0);
        border-radius: 5px;
        border: 2px solid #cbbeb5;
        display: flex;
        flex-direction: column;
        padding: 6px;
        font-family: 'Raleway', sans-serif;
    } 
    .x-button{
        width: 32px;
        padding: 2px 8px;
        align-self: flex-end;
        margin: 0;
    }
`

const AysModal = ({show, children}) => {
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

export default AysModal;