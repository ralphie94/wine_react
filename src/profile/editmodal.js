import React from "react";

const Modal = ({show, children, hide}) => {
    const showOrHide = show ? 'show-modal' : 'hide-modal'
    return(
        <Modal>
            <div className={showOrHide}>
                <section>
                    {children}
                    <button>Save Changes</button>
                    <button onClick={hide}>Close</button>
                </section>
            </div>
        </Modal>
    ) 
}

export default Modal;

