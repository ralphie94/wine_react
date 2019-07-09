import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import styled from "styled-components";

const NavStyle = styled.div`
    background-color: rgb(56, 0, 0);
    height: 70px;
    display: flex;
    position: fixed;
    z-index: 10;
    width: 100%;
    border-bottom: 10px solid white;
    .nav-link, h1 {
        font-size: 21px;
        color: white;
        text-decoration: none;
        padding: 0 20px;
        font-family: 'Josefin Slab', serif;
    }
    h1 {
        justify-content: center;
        font-family: 'Raleway', sans-serif;
        font-size: 25px;
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

const Navbar = (props)=>{
    return(
        <NavStyle>
            <div className="none">
            {
                props.logged && <Link to={routes.PROFILE} className="nav-link">Cellar</Link>
            }
            {
                props.logged && <Link to={routes.EXPLORE} className="nav-link">Explore</Link>
            }
            {/* {
                props.logged && <Link to={routes.FEED} className="nav-link">Feed</Link>
            } */}
            </div>
            <h1>Wine <span> Post</span></h1>
            <div className="links">
                <Link to={routes.HOME} className="nav-link">Home</Link>                            
                {props.logged && <Link to={routes.LOGOUT} onClick={props.logout} className="nav-link">Logout</Link>}
                {!props.logged && <Link to={routes.LOGIN} className="nav-link">Login</Link>}
                {!props.logged && <Link to={routes.REGISTER} className="nav-link">Register</Link>}   
            </div>
        </NavStyle>
    )
}

export default Navbar;