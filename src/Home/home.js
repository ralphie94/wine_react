import React, {Component} from 'react'
import styled, {css} from "styled-components";
import HomeModal from "./homeModal"



const HomePage = styled.div`
    background-image: url('imgs/homeimg.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    /* overflow-y: scroll; */
    height: 100vh;

    .agecheck{
        width: 350px;
        height: 500px;
        background-color: rgb(255 255 255);
        margin-left: 15px;
        border: 2px solid rgb(90 0 50);
        border-top: 100px solid rgb(90 0 50);
    }

    h1 {
        text-align: center;
        font-family: 'Nanum Myeongjo', serif;
        font-size: 30px;
        margin-top: -65px;
        color: white;
    }

    span{
        text-decoration: underline;
    }
    
    p{
        font-size: 30px;
        text-align: center;
        margin-top: 90px;
    }

    .verify{
        width: 75px;
        height: 50px;
        border-radius: 5px;
        font-size: 15px;
        background-color: rgb(90 0 50);
        color: white;
        margin-left: 65px;
        margin-top: 30px;
    }

`

class Home extends Component {
    state = {
        showModal: true
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    hideModal = () => {
        this.setState({
            showModal: false
        })
    }

    handleSubmit = () => {
        window.location.assign("https://www.responsibility.org/")
    }
    
    render(){
        return (
            <HomePage>
                {
                !this.props.logged
                && <HomeModal show={this.state.showModal}>
                    <div className="agecheck">
                        <h1>Wine <span> Post</span></h1>
                        <p>Must be 21+ to enter. Please verify if you are over 21.</p>
                        <button onClick={this.hideModal} className="verify">Yes</button>
                        <button className="verify" onClick={this.handleSubmit}>No</button>
                    </div>
                </HomeModal>
                }
            </HomePage>
            
        )
    }
}

export default Home;