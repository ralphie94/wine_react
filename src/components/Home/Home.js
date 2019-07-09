import React, {Component} from 'react'
import styled from "styled-components"
import HomeModal from "./homeModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const HomePage = styled.div`
    background-image: url('imgs/homeimg.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 95vh;

    .agecheck{
        width: 350px;
        height: 500px;
        background-color: rgb(255 255 255);
        margin-left: 15px;
        border: 2px solid rgb(90 0 50);
        border-top: 100px solid rgb(90 0 50);
        border-radius: 5px;
    }
    h1 {
        text-align: center;
        font-family: 'Raleway', sans-serif;
        font-size: 30px;
        margin-top: -65px;
        color: white;
    }
    span{
        text-decoration: underline;
    }
    p{
        font-size: 25px;
        text-align: center;
        margin: 4em 1em 0;
        font-family: 'Josefin Slab', serif;
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
        font-family: 'Raleway', sans-serif;
        transition: 0.6s;
    }
`
const Footer = styled.footer`
    background-color:rgb(56, 0, 0);
    height: 9em;
    > div {
        border-bottom: 2px solid #fff;
        background-color: rgb(24, 29, 33);
        height: 6em;
        display: flex;
        flex-direction: row;
        padding: .5em 0 1em;
        > .project-git {
            border-right: 2px solid #fff;
        }
        > section {
            color: #fff;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Raleway', sans-serif;
            > h2 {
                font-size: 1.6em;
            }
            > div {
                margin: 0 0 0 3em;
            }
        }
    }
    .links {
        color: #fff;
        font-size: 1.3em;
    }
    .creator {
        display: flex;
        flex-direction: row;
        justify-content: center;
        > a {
            margin: .5em;
        }
    }
    > p {
        font-family: 'Josefin Slab', serif;
        color: #fff;
        text-align: center;
        margin: 1em auto;
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
            <>
            <HomePage>
                {
                !this.props.logged
                && <HomeModal show={this.state.showModal}>
                    <div className="agecheck">
                        <h1>Wine <span> Post</span></h1>
                        <p>Must be 21+ to enter. Please verify that you are over 21 years old.</p>
                        <button onClick={this.hideModal} className="verify">Yes</button>
                        <button className="verify" onClick={this.handleSubmit}>No</button>
                    </div>
                </HomeModal>
                }
            </HomePage>
            <Footer>
                <div>
                    <section className="project-git">
                        <h2>View Project On <a href='https://github.com/parkaitlin/WinePost'><FontAwesomeIcon icon={faGithubSquare} className="links"/></a></h2>
                    </section>
                    <section>
                        <h2>Creators:</h2>
                        <div>
                            <h3>Kaitlin Park</h3>
                            <div className='creator'>
                                <a href="https://github.com/parkaitlin"><FontAwesomeIcon icon={faGithubSquare} className="links"/></a>          
                                <a href="https://www.linkedin.com/in/parkaitlin/"><FontAwesomeIcon icon={faLinkedin} className="links"/></a>  
                            </div>
                        </div>
                        <div>
                            <h3>Rafael Celedon</h3>
                            <div className='creator'>
                                <a href="https://github.com/ralphie94"><FontAwesomeIcon icon={faGithubSquare} className="links"/></a>          
                                <a href="https://www.linkedin.com/in/rafaelceledon/"><FontAwesomeIcon icon={faLinkedin} className="links"/></a>  
                            </div>
                        </div>
                    </section>
                </div>
                <p>Copyright © WinePost 2019</p>
            </Footer>
            </>
        )
    }
}

export default Home;