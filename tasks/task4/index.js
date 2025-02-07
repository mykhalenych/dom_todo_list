// Зміна теми

const themeButton = document.querySelector('.theme-toggle');
let isDarkMode = false;


themeButton.addEventListener('click', () => {
    if (isDarkMode) {
        isDarkMode = false;
        window.document.body.removeAttribute('data-theme');

    } else {
        isDarkMode = true;
        window.document.body.setAttribute('data-theme', 'dark');
    }
});

// Модальне вікно

const addButton = document.querySelector('.add-button');
const cancelButton = document.querySelector('.cancel-button');
const modal = document.querySelector('.modal');
let modalTitle = document.querySelector('.modal-title');
let inputValue = document.querySelector('.modal-input');
let isEdit = false;

addButton.addEventListener('click', () => {
    // modal.style.display = 'block';
    modal.classList.add('modal-open')
});

cancelButton.addEventListener('click', () => {
    // modal.style.display = 'none';
    modal.classList.remove('modal-open');
    document.querySelector('.modal-input').value = ""
});

// Добавлення в TODO

const applyButton = document.querySelector('.apply-button');

applyButton.addEventListener('click', () => {
    modalTitle.textContent = 'Create new todo';

    if (!inputValue.value.trim().length) {
        return alert('Напишіть назву задачі');
    }
    const todos = getTodosFromLocalStorage();

    if (isEdit) {
        const element = document.querySelector('.edit').dataset.id;
        const updatedTodos = todos.map((item) => {
            if (item.id.toString() === element.toString()) {

                return {
                    ...item,
                    text: inputValue.value,
                }
            }
            return item
        });
        localStorage.setItem("todoList", JSON.stringify(updatedTodos));
        isEdit = false;
    } else {
        const newTodo = {
            id: Date.now(),
            text: inputValue.value,
            completed: false
        };


        localStorage.setItem("todoList", JSON.stringify([...todos, newTodo]));
    }


    modal.classList.remove('modal-open');
    inputValue.value = "";
    renderTodos()
});

// task 3

// Загрузка сторінки з рендерингом todo list
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});

// Функція для отримання todo з localStorage

const getTodosFromLocalStorage = () => {
    const todos = localStorage.getItem('todoList');
    return todos ? JSON.parse(todos) : [];
};

const searchInput = document.querySelector('.search-input');

// Функція для відображення todo на сторінці
const renderTodos = (filter) => {
    const todos = getTodosFromLocalStorage();
    const todoList = document.querySelector('.todo-list');
    const searchText = searchInput.value;

    const filteredTodos = todos.filter((item) => {
        const match = item.text.includes(searchText);

        if (filter === 'completed') {
            return item.completed === true && match
        } else if (filter === 'incompleted') {
            return item.completed === false && match
        } else {
            return match
        }
    });

    if (!todos || !filteredTodos?.length) {
        todoList.innerHTML = '<p>No todos found. Add a new one!</p>';
        return;
    }

    todoList.innerHTML = filteredTodos.map((item) => {
        return `
        <li data-id="${item.id}" class="todo-item">
            <input type="checkbox" class="checkbox" ${item.completed ? 'checked' : ''}>
            <span class="${item.completed ? 'completed' : ''}">${item.text}</span>
             <div class="actions">
                <button class="edit-button">
                    <img src="./assers/edit.svg" alt="">
                </button>
                <button class="delete-button">
                    <img src="./assers/trash.svg" alt="">
                </button>
            </div>
        </li>
    `;
    })
};

// Функція для видалення todo
const deleteTodo = (todoList, todoId) => {
    const updatedList = todoList.filter((item) => item.id.toString() !== todoId.toString());
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    renderTodos()
};


// Обробник для редагування todo (використовуємо event delegation)
document.querySelector('.todo-list').addEventListener('click', (event) => {
    const editButton = event.target.closest('.edit-button');
    const deleteButton = event.target.closest('.delete-button');
    const todoItemDom = event.target.closest('.todo-item');
    const todoId = todoItemDom?.dataset.id;
    const todoList = getTodosFromLocalStorage();
    const todoItem = todoList.find((item) => item.id.toString() === todoId.toString());

    if (editButton) {
        isEdit = true;
        modal.classList.add('modal-open');
        modalTitle.textContent = 'Edit todo';
        inputValue.value = todoItem.text;
        todoItemDom.classList.add('edit');
    } else if (deleteButton) {
        deleteTodo(todoList, todoId)
    }
});


// Доданий скрипт для відслідковування чекбоксів
const handleCheckboxChange = (event) => {
    const checkbox = event.target.closest('.checkbox');
    const todoItemDom = event.target.closest('.todo-item');

    if (checkbox && todoItemDom) {
        const todoId = todoItemDom.dataset.id;
        if (!todoId) {
            console.error('Todo ID not found!');
            return;
        }
        const todos = getTodosFromLocalStorage();

        const updatedTodos = todos.map((item) => {
            if (item.id.toString() === todoId.toString()) {
                checkbox.checked ? todoItemDom.querySelector('span').classList.add('completed') : todoItemDom.querySelector('span').classList.remove('completed');
                return {
                    ...item,
                    completed: checkbox.checked
                }
            }
            return item
        });

        localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    } else {
        console.error('Checkbox or TodoItemDom is missing!');
    }

};

document.querySelector('.todo-list').addEventListener('change', handleCheckboxChange);

const dropdownItems = document.querySelectorAll('.dropdown-item');

dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
        const filter = item.dataset.text;

        renderTodos(filter)
    })
});

searchInput.addEventListener('input', (event) => {
    renderTodos()
});


