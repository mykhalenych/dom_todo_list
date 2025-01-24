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

addButton.addEventListener('click', () => {
    // modal.style.display = 'block';
    modal.classList.add('modal-open')
});

cancelButton.addEventListener('click', () => {
    // modal.style.display = 'none';
    modal.classList.remove('modal-open')
    document.querySelector('.modal-input').value =  ""
});

// Добавлення в TODO


const applyButton = document.querySelector('.apply-button');

applyButton.addEventListener('click', () => {
    const todoList = document.querySelector('.todo-list');
    let inputValue = document.querySelector('.modal-input').value;

    if(!inputValue.trim().length){
        return alert('Напишіть назву задачі');
    }

    const newTodo = document.createElement('li');
    newTodo.innerHTML = `
        <li class="todo-item">
            <input type="checkbox" class="checkbox">
            <span>${inputValue}</span>
             <div class="actions">
                <button class="edit-button">
                    <img src="./assers/Frame 6.svg" alt="">
                </button>
                <button class="delete-button">
                    <img src="./assers/trash-svgrepo-com 1.svg" alt="">
                </button>
            </div>
        </li>
    `;
    todoList.appendChild(newTodo);
    modal.classList.remove('modal-open');
    document.querySelector('.modal-input').value =  ""
});
