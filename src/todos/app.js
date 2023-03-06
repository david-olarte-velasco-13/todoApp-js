import html from './app.html?raw';  // ?raw permite que se importe el archivo en crudo sin necesidad de ser un .js
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';


const ElementsIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementsIDs.TodoList, todos );
        updatePendignCount();
    }

    const updatePendignCount = () => {
        renderPending(ElementsIDs.PendingCountLabel);
    }

    // Cuando la funcion App() se llama 

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementsIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementsIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementsIDs.ClearCompleted );
    const filtersLIs = document.querySelectorAll( ElementsIDs.TodoFilters );

    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if ( event.keyCode !== 13) return;
        if ( event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';

    });

    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');  // ubica dentro del elemento seleccionado la parte que tenga asociado el data-id
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });


    todoListUL.addEventListener('click', ( event ) => {
        
        const isDestroyElement = event.target.className === 'destroy'; // ubica dentro del elemento seleccionado la parte que tenga asociado el destroy
        const element = event.target.closest('[data-id]');  
        if (!element || !isDestroyElement ) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });
    
    clearCompletedButton.addEventListener('click', () => {
        
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch ( element.target.text ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;
                default:
                    break;
            }

            displayTodos();
        });
    });


} 
