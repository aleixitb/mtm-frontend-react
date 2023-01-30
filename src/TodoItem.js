import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            done: null,
            deleted: false,
            todoDesc: ""
        }
        this.makeItemTextLineThrough = this.makeItemTextLineThrough.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this)
        this.updateTodoDesc = this.updateTodoDesc.bind(this)
    }

    componentDidMount() {
        this.setState({
            done: this.props.done
        })
    }

    makeItemTextLineThrough(event) {
        let currentValue = this.state.done
        fetch("http://sv.garsemar.com:8080/todoitems/edit_todo_ID=" + this.props.todoId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                todoId: this.props.todoId,
                description: this.props.description,
                positionInList: this.props.positionInList,
                listId: this.props.listId,
                active: this.props.active,
                done: !currentValue,
                dueDate: this.props.dueDate
            })
        })
            .then(() => {
                this.setState({
                    done: !currentValue
                })
            })
    }

    deleteTodo(){
        // fetch put request with TodoItem id
        fetch("http://sv.garsemar.com:8080/todoitems/delete_todo_ID=" + this.props.todoId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                todoId: this.props.todoId,
                description: this.props.description,
                positionInList: this.props.positionInList,
                listId: this.props.listId,
                active: this.props.active,
                done: this.props.done,
                dueDate: this.props.dueDate
            })
        })
        window.location.reload()
    }

    updateTodoDesc(event) {
        fetch("http://sv.garsemar.com:8080/todoitems/edit_todo_ID=" + this.props.todoId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                todoId: this.props.todoId,
                description: event.target.value,
                positionInList: this.props.positionInList,
                listId: this.props.listId,
                active: this.props.active,
                done: this.props.done,
                dueDate: this.props.dueDate
            })
        })
    }

    componentDidUpdate(prevState){
        if(JSON.stringify(prevState) !== JSON.stringify(this.props)){
            fetch("http://sv.garsemar.com:8080/todoitems/todos_BY_LIST_ID=" + this.props.todoId)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    data: json,
                    dataIsLoaded: true
                });
            })
        }
    }

    render() {
        if(!this.state.deleted){
            return (
                <>
                    <div className="list-group-item">
                        <li className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-self-center w-100">
                                <input 
                                    onClick={ this.makeItemTextLineThrough }
                                    className="form-check-input me-1"
                                    type="checkbox" 
                                    defaultChecked={ this.props.done }>
                                </input>
                                <input 
                                    className="border-0 bg-transparent w-100"
                                    style={ this.state.done ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
                                    disabled={ this.state.done }
                                    type="text"
                                    defaultValue={ this.props.description }
                                    onChange={ this.updateTodoDesc }>
                                </input>
                            </div>
                            <button className="btn btn-outline-danger" onClick={ this.deleteTodo }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="bi bi-trash3" viewBox="0 0 16 16">
                                    <path
                                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                </svg>
                            </button>
                        </li>
                    </div>
                </>
            )
        }
    }
    
}

TodoItem.propTypes = {
    todoId: PropTypes.number,
    description: PropTypes.string,
    positionInList: PropTypes.number,
    listId: PropTypes.number,
    active: PropTypes.bool,
    done: PropTypes.bool,
    dueDate: PropTypes.string,
}

export default TodoItem;