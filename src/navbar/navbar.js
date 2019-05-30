import React, { Component } from "react";

import { Link } from "react-router-dom";

import * as routes from "../constants/routes";

import styled, {css} from "styled-components";
// import "./navbar.css"

const NavStyle = styled.div`
    background-color: rgb(56, 0, 0);
    height: 70px;
    display: flex;
    position: fixed;
    z-index: 10;
    width: 100%;
    border-bottom: 10px solid white;
    .nav-link, h1 {
        font-size: 20px;
        color: white;
        text-decoration: none;
        padding: 0 20px;
    }
    h1 {
        justify-content: center;
    }
    .links{
        justify-content: flex-end;
    }  
    .links, h1, .none{
        flex: 1;
        display: flex;
        align-self: center;
    }
    span {
        text-decoration: underline;
    }

`

class Navbar extends Component {
    render(){
        return(
            <NavStyle>
                <div className="none">
                {
                   this.props.logged && <Link to={routes.PROFILE} className="nav-link">Profile</Link>
                }
                {
                   this.props.logged && <Link to={routes.EXPLORE} className="nav-link">Explore</Link>
                }
                {
                    this.props.logged && <Link to={routes.FEED} className="nav-link">Feed</Link>
                }
                </div>
                <h1>Wine <span>Post</span></h1>
                <div className="links">
                    <Link to={routes.HOME} className="nav-link">Home</Link>
                    <Link className="nav-link">Logout</Link>
                    <Link to={routes.LOGIN} className="nav-link">Login</Link>
                    <Link to={routes.REGISTER} className="nav-link">Register</Link>
                </div>
            </NavStyle>
        )
    }
}

export default Navbar;