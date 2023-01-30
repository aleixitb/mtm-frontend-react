
/*
@Serializable
class TodoListWithSize(val todoList: TodoList,
                       val size: Int){

    override fun toString(): String {
        return "$todoList Size= $size"
    }

}
*/

export var todoListsWithSize = [
    {
        todoList: {
            listId: 1,
            userId: 1,
            title: "Title 1"
        },
        size: 6
    },
    {
        todoList: {
            listId: 2,
            userId: 2,
            title: "Title 2"
        },
        size: 5
    },
];

export var todoItemsFromList1 = [
    {
        todoId: 0, description: "Include 'active' class to header item on focus", positionInList: 1, listId: 1, active: true, done: false, dueDate: "21/11/2022"
    },
    {
        todoId: 1, description: "Make the bed", positionInList: 2, listId: 1, active: true, done: true, dueDate: "21/11/2022"
    },
    {
        todoId: 2, description: "Workout", positionInList: 3, listId: 1, active: true, done: false, dueDate: "21/11/2022"
    },
    {
        todoId: 3, description: "Take a shower", positionInList: 1, listId: 1, active: true, done: false, dueDate: "21/11/2022"
    },
    {
        todoId: 4, description: "Have lunch", positionInList: 5, listId: 1, active: true, done: true, dueDate: "21/11/2022"
    },
    {
        todoId: 5, description: "Do homework", positionInList: 4, listId: 1, active: true, done: true, dueDate: "21/11/2022"
    },
];

export var todoItemsFromList2 = [
    { 
        todoId: 6, description: "Play League of Legends", positionInList: 6, listId: 2, active: true, done: true, dueDate: "12/11/2021" 
    },
    { 
        todoId: 7, description: "Cook the dinner", positionInList: 8, listId: 2, active: true, done: false, dueDate: "12/11/2021" 
    },
    { 
        todoId: 8, description: "Wash your teeth", positionInList: 7, listId: 2, active: true, done: false, dueDate: "12/11/2021" 
    },
    { 
        todoId: 9, description: "Take the train", positionInList: 9, listId: 2, active: true, done: true, dueDate: "12/11/2021" 
    },
    { 
        todoId: 10, description: "Go to coding class", positionInList: 10, listId: 2, active: true, done: true, dueDate: "12/11/2021" 
    },
];

export var lists = [
    {
        listId: 1,
        userId: 1,
        title: "Title 1",
        date: "12/30/2014",
        todos: [
            { id: 0, description: "Include 'active' class to header item on focus", done: false, position: 1 },
            { id: 1, description: "Make the bed", done: true, position: 2 },
            { id: 2, description: "Workout", done: false, position: 3 },
            { id: 3, description: "Take a shower", done: false, position: 1 },
            { id: 4, description: "Have lunch", done: true, position: 5 },
            { id: 5, description: "Do homework", done: true, position: 4 },
        ],
    },
    {
        listId: 2,
        userId: 2,
        title: "Title 2",
        date: "30/3/2021",
        todos: [
            { id: 6, description: "Play League of Legends", done: true, position: 6 },
            { id: 7, description: "Cook the dinner", done: false, position: 8 },
            { id: 8, description: "Wash your teeth", done: false, position: 7 },
            { id: 9, description: "Take the train", done: true, position: 9 },
            { id: 10, description: "Go to coding class", done: true, position: 10 },
        ],
    },
];

export default { todoListsWithSize, todoItemsFromList1, todoItemsFromList2 };