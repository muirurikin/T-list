// Define variables
const form = document.getElementById('task-form');
const todoInput = document.querySelector('#task');
const todoList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load all event listeners
loadAllEventListeners();

// Load all event listeners
function loadAllEventListeners() {
    // Load Event
    document.addEventListener("DOMContentLoaded", getTodo);
    // Add Todo event
    form.addEventListener('submit', addTodo);
    // Remove todo event
    todoList.addEventListener('click', removeTodo);
    // Clear Todos event
    clearBtn.addEventListener('click', clearTodos);
    // Filter Todo event
    filter.addEventListener('keyup', filterTodos);
}

// Get data from Local Storage
function getTodo(e) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
         // Create <li> element
        const li = document.createElement('li');
        // Add class to <li>
        li.className = 'collection-item';
        // Create and Append textNode
        li.appendChild(document.createTextNode(todo));
        // Create link element
        const link = document.createElement('a');
        // Add class to <a>
        link.className = 'delete-item secondary-content';
        // Create and Append <a>icon to <li>
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        // Append <li> to <ul>
        todoList.appendChild(li);
    });
}
function addTodo(e) {
    if (todoInput.value === '') {
        alert('Add Todo to submit');
    }

    // Create <li> element
    const li = document.createElement('li');
    // Add class to <li>
    li.className = 'collection-item';
    // Create and Append textNode
    li.appendChild(document.createTextNode(todoInput.value));
    // Create link element
    const link = document.createElement('a');
    // Add class to <a>
    link.className = 'delete-item secondary-content';
    // Create and Append <a>icon to <li>
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    // Append <li> to <ul>
    todoList.appendChild(li);

    // Add to LocalStorage
    storeTodo(todoInput.value);

    // Clear Input field
    todoInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// Remove todo
function removeTodo(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure you want to delete item?')) {
            e.target.parentElement.parentElement.remove();

            // Remove Todo from Local Storage
            removeTodoLS(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

// Remove Todo Function
function removeTodoLS(todoItem) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo, index) {
        if (todoItem.textContent === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Clear Todos
function clearTodos(e) {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    // Clear Todo(s) from Local Storage
    clearTodosLS();

    e.preventDefault();
}

// Clear Todo(s) from Local Storage Function
function clearTodosLS() {
    localStorage.clear();
}

// Filter Todos
function filterTodos(e) {
    // Capture the input
    const text = e.target.value.toLowerCase();

    let filt = document.querySelectorAll('.collection-item');
    filt.forEach(function (todo) {
        const item = todo.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            todo.style.display = 'block';
        } else {
            todo.style.display = 'none';
        }
    })
}
