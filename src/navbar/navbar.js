import React, { Component } from "react";

import { Link } from "react-router-dom";

import * as routes from "../constants/routes";

import "./navbar.css"

class Navbar extends Component {
    render(){
        return(
            <div class="nav">
                <Link to={routes.HOME} className="active">Home</Link>
                <Link to={routes.LOGIN} className="active">Login</Link>
                <Link to={routes.REGISTER} className="active">Register</Link>
            </div>
        )
    }
}

export default Navbar;