import { Todo } from '../models/todo.model';
import { createTodoHTML } from './';

let element;
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {
    
    if (!element) element = document.querySelector( elementId );
    
    if (!element) throw new Error(`Element ${ elementId } not found`);
    
    element.innerHTML = '';  // Para que no me acumule los todos y se refresque con el nuevo arreglo cada vez que se agregue o quite uno

    todos.forEach(todo => {
        element.append( createTodoHTML(todo) );
    });
}