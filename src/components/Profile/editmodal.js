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
    .edit-box{
        width: 40vw;
        height: 40vh;
        background-color: rgb(56, 0, 0);
        border-radius: 5px;
        border: 2px solid #cbbeb5;
        display: flex;
        flex-direction: column;
        padding: 6px;
        font-family: 'Raleway', sans-serif;
    }
    .input{
        width: 100%;
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
        width: 15vw;
        margin: 5px;
        align-self: flex-start;
    }
    .x-button{
        width: 32px;
        padding: 2px 8px;
        align-self: flex-end;
        margin: 0;
    }
`

const EditModal = ({show, children}) => {
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

export default EditModal;

