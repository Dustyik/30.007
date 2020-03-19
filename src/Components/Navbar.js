import React from 'react';
import { Link } from "react-router-dom"
import Logo from "./utils/brighttreelogo.png"
import { ButtonContainer } from "./utils/button"
import styled from 'styled-components'
import firebaseclass from "./firebase/firebase.js"

const NavWrapperstyle = styled.div`
background:var(--lightgrey);
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
            <NavWrapperstyle className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <Link to="/">
                    <img src={Logo} alt="store"
                        className="navbar-brand" />
                </Link>

                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml5">
                        <Link to="/Livefeed" className="nav-link">
                            Livefeed
                        </Link>
                    </li>
                </ul>

                <Link to="/" className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-2">
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
