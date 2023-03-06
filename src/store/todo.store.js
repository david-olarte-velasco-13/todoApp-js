import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,
}


const initStore = () => {
    loadStore();
    console.log('InitStore');
}


const loadStore = () => {
    if( !localStorage.getItem('state') ) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {  // funcion para guardar el esatdo en el local storage    
    localStorage.setItem('state', JSON.stringify(state));  // JSON.stringify convierte un valor js a un JSON string.
}


const getTodos = ( filter = Filters.All ) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);  // los que estan en true
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done); // los que estan en false 
        default:
            throw new Error(`Option ${ filter } in not valid`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is required');

    state.todos.push( new Todo(description) );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId Todo identifier
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map(todo => {  // map barre todos los elementos del array y opera sobre ellos segun como se le indique
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();

}

/**
 * 
 * @param {String} todoId Todo indentifier
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
}


const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}


const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}