export const BASE_URL = "http://sv.garsemar.com:8080/todoitems/";

//export const BASE_URL = "http://localhost:8080/todoitems/";

export const AXIOS_CONFIG = {
    headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
    } 
};

export const GET_ALL_LISTS_ENDPOINT = BASE_URL + "lists_all";

export const GET_TODO_ITEMS_BY = (todoId) => BASE_URL + `todos_BY_LIST_ID=${todoId}`;

export const ADD_LIST_ENDPOINT = BASE_URL + "add_list";

export const DELETE_LIST_ENDPOINT = (listId) => BASE_URL + `delete_list_ID=${listId}`;

export const CREATE_TODO_LIST_ENDPOINT = BASE_URL + "add_list"