const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const taskList = document.getElementById('taskList');
const filterInput = document.getElementById('filterInput');
const filterPriority = document.getElementById('filterPriority');

document.getElementById('addTaskBtn').addEventListener('click', () => addTask());
filterInput.addEventListener('input', () => filterTasks());
filterPriority.addEventListener('change', () => filterTasks());

const priorityImages = {
  'Alto': 'imagens/alta.png',
  'Médio': 'imagens/media.png',
  'Baixo': 'imagens/baixa.png'
};

let tasks = [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks(tasks);
    }
}

function addTask() {
    const taskName = taskInput.value.trim();
    const priority = priorityInput.value;
    if (taskName === '') return;
    const task = {
        id: Date.now(),
        name: taskName,
        priority: priority,
        completed: false
    };
    tasks.push(task);
    taskInput.value = '';
    displayTasks(tasks);
    saveTasks();
}

function displayTasks(tasksToDisplay) {
    taskList.innerHTML = '';
    tasksToDisplay.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.setAttribute('data-id', task.id);
        let imgSrc = priorityImages[task.priority] || '';
        let cardHTML = `
            <div class="card task-card ${task.completed ? 'bg-success' : ''}">
                <img src="${imgSrc}" class="card-img-top" alt="Imagem de Prioridade">
                <div class="card-body ${task.completed ? 'completed' : ''}">
                    <div>
                        <h5 class="card-title">${task.name}</h5>
                        <p class="card-text">Prioridade: ${task.priority}</p>
                    </div>
                    <div class="task-buttons">
                        <button class="btn btn-success" onclick="toggleComplete(${task.id})">
                            <box-icon name='${task.completed ? 'undo' : 'check'}' color="white"></box-icon>
                        </button>
                        <button class="btn btn-warning" onclick="editTask(${task.id})">
                            <box-icon name='edit' color="white"></box-icon>
                        </button>
                        <button class="btn btn-danger" onclick="removeTask(${task.id})">
                            <box-icon name='trash' color="white"></box-icon>
                        </button>
                    </div>
                </div>
            </div>
        `;
        taskCard.innerHTML = cardHTML;
        taskList.appendChild(taskCard);
    });
}

function removeTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks(tasks);
    saveTasks();
}

function toggleComplete(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    
    const taskCard = document.querySelector(`.task-card[data-id="${taskId}"] .card`);
    if (taskCard) {
        taskCard.classList.toggle('bg-success', task.completed);
    }
    
    displayTasks(tasks);
    saveTasks();
}

function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    const newName = prompt('Editar tarefa:', task.name);
    if (newName !== null && newName.trim() !== '') {
        task.name = newName.trim();
        displayTasks(tasks);
        saveTasks();
    }
}

function filterTasks() {
    const filterText = filterInput.value.toLowerCase();
    const filterPriorityValue = filterPriority.value;
    
    let filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(filterText));
    
    if (filterPriorityValue) {
        filteredTasks = filteredTasks.filter(task => task.priority === filterPriorityValue);
    }
    
    displayTasks(filteredTasks);
}

document.addEventListener('DOMContentLoaded', loadTasks);