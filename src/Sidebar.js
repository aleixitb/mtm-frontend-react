import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarElement from './SidebarElement';
import TodoList from "./TodoList";
import { ADD_LIST_ENDPOINT } from './utils/constants';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            dataIsLoaded: false,
            newTodoListTitle: "",
            activeItem: 0
        };

        this.updateNewListTitle = this.updateNewListTitle.bind(this);
        this.createTodoList = this.createTodoList.bind(this);
        
        //this.toggleClass = this.toggleClass.bind(this);
    }

    updateNewListTitle(event) {
        
        this.setState({
            ...this.state,
            newTodoListTitle: event.target.value
        })
    }

    createTodoList(event) {
        event.preventDefault();
        if (this.state.newTodoListTitle.length > 0) {
            fetch(
                ADD_LIST_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    listId: -1,
                    userId: 2,
                    title: this.state.newTodoListTitle,
                    active: true
                })
            })
            this.setState({
                ...this.state,
                newTodoListTitle: ""
            })
            this.loadData()
        }
    }

    loadData() {
        fetch("http://sv.garsemar.com:8080/todoitems/lists_all")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    data: json,
                    dataIsLoaded: true
                });
            })
    }

    componentDidMount() {
        
        this.loadData();
        /*
        this.setState({
            data: todoListsWithSize,
            dataIsLoaded: true
        });
        */
    }

    componentDidUpdate(prevState, prevProps) {
        if (JSON.stringify(this.state) !== JSON.stringify(prevProps)) {
            this.loadData();
        }
    }

    onClickFunction = (idx) => {
        this.setState({
            ...this.state,
            activeItem: idx
        })
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
                <div className="d-flex flex-row">
                    <div className='p-2 w-25'>
                        <ul className="list-group pb-2">
                            <li className="list-group-item">
                                <form className='d-flex justify-content-between'>
                                    <input
                                        className="border-0 w-100"
                                        type="text"
                                        placeholder="List title"
                                        value={this.state.newTodoListTitle}
                                        onChange={this.updateNewListTitle}
                                    >
                                    </input>
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={this.createTodoList}
                                    >
                                        New list
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                    </button>
                                </form>
                            </li>
                        </ul>
                        <nav id="sidebar">
                            <ul className="list-group" id="sidebarUl">
                                {
                                    data && data.map((listWithSize, index) => (
                                        <a
                                            href='/#'
                                            key={index}
                                            className={
                                                index === this.state.activeItem ? "list-group-item active" : "list-group-item"
                                            }
                                            onClick={this.onClickFunction.bind(null, index)}
                                        >
                                            <SidebarElement
                                                key={index}
                                                ref={this.inputRef}
                                                listId={listWithSize.todoList.listId}
                                                userId={listWithSize.todoList.userId}
                                                title={listWithSize.todoList.title}
                                                size={listWithSize.size}
                                            />
                                        </a>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                    {
                        this.state.activeItem !== -1 && data[this.state.activeItem] &&
                            <TodoList 
                                listWithSize={data[this.state.activeItem]}
                                link={`http://sv.garsemar.com:8080/todoitems/todos_BY_LIST_ID=${data[this.state.activeItem].todoList.listId}`} 
                            />
                    }
                </div>
            )
        }

    }
}

export default Sidebar;