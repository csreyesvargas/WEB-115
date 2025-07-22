let tasks = [];
let taskIdCounter = 1;

const taskNameInput = document.getElementById("taskName");
const taskPrioritySelect = document.getElementById("taskPriority");
const isImportantCheckbox = document.getElementById("isImportant");
const isCompletedCheckbox = document.getElementById("isCompleted");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskManagerDiv = document.getElementById("taskmanager");

addTaskBtn.addEventListener("click", addTask);

const taskElements = document.querySelectorAll('.input-checkbox');
if (taskElements.length > 0) {
    taskElements.forEach(el => {
        document.addEventListener('mouseover', () => {
        })
    })
}

function addTask() {
    const taskName = taskNameInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task name!");
        return;
    }

    const newTask = {
        id: taskIdCounter++,
        name: taskName,
        priority: taskPrioritySelect.value,
        isImportant: isImportantCheckbox.checked,
        isCompleted: isCompletedCheckbox.checked,
        date: new Date().toLocaleString()
    };

    tasks.push(newTask);

    console.log(JSON.stringify(tasks));

    taskNameInput.value = "";
    taskPrioritySelect.value = "Low";
    isImportantCheckbox.checked = false;
    isCompletedCheckbox.checked = false;

    displayTasks();
}

function displayTasks() {
    taskManagerDiv.innerHTML = "";

    if (tasks.length === 0) {
        taskManagerDiv.innerHTML = "<p class=\"empty-message\">Your tasks will appear here.</p>";
        return;
    }

    tasks.forEach(function (task, i) {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task priority-" + task.priority.toLowerCase();

        let taskHTML = `
            <div class="task-header">
                <div class='checkbox-container' style='position:relative;'>
                    <input type="checkbox" 
                           class="complete-checkbox checkbox-input" 
                           ${task.isCompleted ? "checked" : ""}
                           onchange="toggleComplete(${task.id})">
                    <div class='tooltip-container'>
                        <p>Check to mark as complete</p>
                    </div>
                    <span class="task-name" id="name-${task.id}">${task.name}</span>
                </div>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
            <div class="task-info">
                Priority: ${task.priority}
                ${task.isImportant ? " | Important" : ""}
            </div>
            <div class="task-date">Added: ${task.date}</div>
        `;

        taskDiv.innerHTML = taskHTML;
        taskManagerDiv.appendChild(taskDiv);

        const taskNameElement = document.getElementById("name-" + task.id);

        if (task.isImportant) {
            taskNameElement.style.color = "red";
        }

        if (task.isCompleted) {
            taskNameElement.style.textDecoration = "line-through";
        }
    });
}

function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    console.log(JSON.stringify(tasks));

    displayTasks();
}

function toggleComplete(taskId) {
    tasks.forEach(function (task) {
        if (task.id === taskId) {
            task.isCompleted = !task.isCompleted;
        }
    });

    console.log(JSON.stringify(tasks));

    displayTasks();
}

displayTasks();