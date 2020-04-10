import React from 'react';
import { Link } from "react-router-dom"
import Logo from "./utils/GClogocropped.png"
import { ButtonContainer } from "./utils/button"
import styled from 'styled-components'
import firebaseclass from "./firebase/firebase.js"

const NavWrapperstyle = styled.div`
background: rgba(0, 0, 0, 0.01);
.nav-link{
    font-family: roboto;
    color:var(--mainDark)!important;
    font-size:1.2rem;
    text-transform: capitalize;
}
`

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavWrapperstyle className="navbar navbar-expand-sm navbar-dark px-sm-5" >
                <Link to="/">
                    <img src={Logo} alt="store"
                        className="navbar-brand" />
                </Link>

                <Link to="/" className="ml-auto">
                        <span className="text-title2" style = {{fontSize: "12px", paddingRight:"12px"}}>
                            <i className="iconwithinbutton" />
                            Sign Up
                        </span>

                    <ButtonContainer>
                        <span className="text-title2" style = {{fontSize: "12px"}}>
                            <i className="iconwithinbutton" />
                            Logout
                        </span>
                    </ButtonContainer>
                </Link>

            </NavWrapperstyle>
        )
    }
}

export default NavBar
