import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Mama task me
                    </a>
                </div>
            </nav>
        )
    }
}

export default Header;