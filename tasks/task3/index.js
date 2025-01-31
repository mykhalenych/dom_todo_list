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
    console.log(inputValue.value);
    if (!inputValue.value.trim().length) {
        return alert('Напишіть назву задачі');
    }

    const newTodo = {
        id: Date.now(),
        text: inputValue.value,
        completed: false
    };
    const todos = getTodosFromLocalStorage();

    localStorage.setItem("todoList", JSON.stringify([...todos, newTodo]));

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

// Функція для відображення todo на сторінці
const renderTodos = () => {
    const todos = getTodosFromLocalStorage();
    const todoList = document.querySelector('.todo-list');

    if (!todos || !todos?.length) {
        todoList.innerHTML = '<p>No todos found. Add a new one!</p>';
        return;
    }


    todoList.innerHTML = todos.map((item) => {
        return `
        <li data-id="${item.id}" class="todo-item">
            <input type="checkbox" class="checkbox">
            <span>${item.text}</span>
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

// Функція для редагування todo
const editTodo = (todoItem) => {
    console.log('edit');
    modalTitle.textContent = 'Edit todo';
    inputValue.value = todoItem.text;
    console.log(inputValue)
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
        editTodo(todoItem)
    } else if (deleteButton) {
        deleteTodo(todoList, todoId)
    }
});


