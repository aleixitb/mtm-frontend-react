import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/flork_icon.png";

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="Bootstrap" width="70" height="70"></img>
                        Mama task me
                    </a>
                </div>
            </nav>
        )
    }
}

export default Header;