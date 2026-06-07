let todos = [];
let currentFilter = 'all';

// DOM elements
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterCompleted = document.getElementById('filterCompleted');
const clearCompletedBtn = document.getElementById('clearCompleted');

// Load localstorage
function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        todos = JSON.parse(saved);
    }
    render();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render du lieu
function render() {
    todoList.innerHTML = '';
    
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }
    
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo.id;
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        if (todo.completed) {
            span.classList.add('completed');
        }
        span.textContent = todo.text;
        
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '❌';
        
        li.appendChild(span);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });
    
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} việc chưa xong`;
    
    filterAll.classList.toggle('active-filter', currentFilter === 'all');
    filterActive.classList.toggle('active-filter', currentFilter === 'active');
    filterCompleted.classList.toggle('active-filter', currentFilter === 'completed');
}

// Form submit de add todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        todoInput.value = '';
        saveTodos();
        render();
    }
});

// Event delegation de click toggle/xoa
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);
    
    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        render();
    } else if (e.target.classList.contains('todo-text')) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            saveTodos();
            render();
        }
    }
});

// Double click de edit
todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('todo-text')) {
        const li = e.target.closest('li');
        const id = Number(li.dataset.id);
        const todo = todos.find(t => t.id === id);
        if (!todo) return;
        
        const span = e.target;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = todo.text;
        
        li.insertBefore(input, span);
        li.removeChild(span);
        input.focus();
        
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText) {
                todo.text = newText;
                saveTodos();
            } else {
                todos = todos.filter(t => t.id !== id);
                saveTodos();
            }
            render();
        };
        
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                saveEdit();
            } else if (event.key === 'Escape') {
                render();
            }
        });
        
        input.addEventListener('blur', saveEdit);
    }
});

// Filter click
filterAll.addEventListener('click', () => { currentFilter = 'all'; render(); });
filterActive.addEventListener('click', () => { currentFilter = 'active'; render(); });
filterCompleted.addEventListener('click', () => { currentFilter = 'completed'; render(); });

// Clear completed
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
});

loadTodos();
