import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoItem from './TodoItem';
import PropTypes from "prop-types";
import { DELETE_LIST_ENDPOINT } from "./utils/constants";

class TodoList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            dataIsLoaded: false,
            newTodoItem: ""
        };

        this.updateNewListTitle = this.updateNewListTitle.bind(this);
        this.postTodo = this.postTodo.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    loadData() {
        fetch(this.props.link)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    ...this.state,
                    data: json,
                    dataIsLoaded: true
                });
        })
    }

    componentDidMount() {        
        this.loadData()
    }

    updateNewListTitle(event) {
        this.setState({
            ...this.state,
            newTodoItem: event.target.value
        })
    }

    postTodo(event) {
        event.preventDefault();
        if (this.state.newTodoItem.length > 0) {
            let date = new Date()
            fetch("http://sv.garsemar.com:8080/todoitems/add_todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    todoId: 0,
                    description: this.state.newTodoItem,
                    positionInList: 0,
                    listId: this.props.listWithSize.todoList.listId,
                    active: true,
                    done: false,
                    dueDate: date.getDate()
                })
            })
            this.setState({
                ...this.state,
                newTodoItem: "",
            })
            window.location.reload(false)
        }
    }

    deleteList() {
        if (this.props.listWithSize) {
            fetch(
                DELETE_LIST_ENDPOINT(this.props.listWithSize.todoList.listId), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    listId: this.props.listWithSize.todoList.listId,
                    userId: this.props.listWithSize.todoList.userId,
                    title: this.props.listWithSize.todoList.title,
                    active: false
                })
            })
            this.loadData()
            //window.location.reload()
        }
    }

    componentDidUpdate(prevState, prevProps) {
        //console.log("this.state")
        //console.log(this.state.data.length)
        //console.log(this.state.data)
        //console.log("prevState")
        //console.log(prevState.listWithSize.size)
        
        // este lo dejo por el momento
        if (JSON.stringify(prevState) !== JSON.stringify(this.props)) {
            console.log("update")
            this.setState({
                ...this.state,
                data: [],
                dataIsLoaded: false
            })
            this.props.link && fetch(this.props.link)
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        ...this.state,
                        data: json,
                        dataIsLoaded: true
                    });
                })
        }
        
        // este es el que funciona
        // if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
        //     console.log("update")
        //     this.props.link && fetch(this.props.link)
        //         .then((res) => res.json())
        //         .then((json) => {
        //             this.setState({
        //                 ...this.state,
        //                 data: json,
        //                 dataIsLoaded: true
        //            });
        //        })
        //}
    }

    render() {

        const { data, dataIsLoaded } = this.state;

        if (!dataIsLoaded) {
            return (
                <>
                    <div className="spinner-border text-primary m-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <section className="w-75 pe-2">
                        <div className="d-flex justify-content-between p-2">
                            <h4>{this.props.listWithSize.todoList.title}</h4>
                            <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => { this.deleteList() }}
                            >
                                Delete list
                            </button>
                        </div>
                        <ul className="list-group pb-2">
                            <li className="list-group-item">
                                <form className="d-flex justify-content-between">
                                    <input 
                                        className="border-0 w-100"
                                        type="text" 
                                        placeholder="Add new item..."
                                        value={this.state.newTodoItem}
                                        onChange={this.updateNewListTitle.bind(null)}>
                                    </input>
                                    <button className="btn btn-outline-success" onClick={ this.postTodo }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                    </button>
                                </form>
                            </li>
                        </ul>
                        <ul id="list" className="list-group">
                            {
                                /*this.props.*/ data && /*this.props.*/data.map((todoItem, index) => ( 
                                    <TodoItem 
                                        key = { index } 
                                        todoId = { todoItem.todoId }
                                        description = { todoItem.description }
                                        positionInList = { todoItem.positionInList }
                                        listId = { todoItem.listId }
                                        active = { todoItem.active }
                                        done = { todoItem.done }
                                        dueDate = { todoItem.dueDate }
                                    />
                                ))
                            }
                        </ul>
                    </section>
                </>
            )
        }
    }
}

TodoList.propTypes = {
    listWithSize: PropTypes.object,
    link: PropTypes.string
}

export default TodoList;