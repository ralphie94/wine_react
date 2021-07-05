import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    .hide-modal {
        display: none;
    }
    .show-modal {
        height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 10;
        animation: fadeIn 3s ease;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }
`

const HomeModal = ({show, children}) => {
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

export default HomeModal;
