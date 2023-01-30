import React from 'react';
import PropTypes from "prop-types";

class SidebarElement extends React.Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef()

        this.state = {
            active: false
        };

        this.toggleClass = this.toggleClass.bind(this);
        this.focusInput = this.focusInput.bind(this)
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({
            ...this.state,
            active: !currentState
        });
    }

    /*
    componentDidMount() {
        this.setState({
            ...this.state
        })
    }
    */

    focusInput() {
        let sidebarElement = this.inputRef.current.parentNode
        sidebarElement.setAttribute("class", "list-group-item active")
    }

    render() {
        return (
            
                <div
                    //className={this.state.active ? "list-group-item active" : "list-group-item"}
                    //onClick={this.toggleClass}
                    //onBlur={this.toggleClass}
                    ref={this.inputRef}
                    //onClick={this.focusInput}
                >
                    <li className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{this.props.title}</div>
                            <small>12/12/2022</small>
                        </div>
                        <span className="badge bg-primary rounded-pill">{this.props.size}</span>
                    </li>
                </div>
            
        )
    }
}

SidebarElement.propTypes = {
    listId: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    size: PropTypes.number
}

export default SidebarElement;