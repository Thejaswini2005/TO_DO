const API_URL = "https://taskflow-backend-b2zw.onrender.com/tasks";

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const filterButtons = document.querySelectorAll(".filter-btn");

const editModal = document.getElementById("editModal");

const editInput = document.getElementById("editInput");

const saveEditBtn = document.getElementById("saveEditBtn");

const cancelEditBtn = document.getElementById("cancelEditBtn");

let currentFilter = "ALL";

let currentEditId = null;

// Load Tasks
window.addEventListener("DOMContentLoaded", getTasks);

// Add Task Button
addTaskBtn.addEventListener("click", addTask);

// Enter Key Support
taskInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        addTask();

    }

});

// Filter Buttons
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter = button.textContent.trim();

        getTasks();

    });

});

// GET TASKS
async function getTasks() {

    try {

        const response = await fetch(API_URL);

        const tasks = await response.json();

        taskList.innerHTML = "";

        let completedCount = 0;

        tasks

            .filter(task => {

                if (currentFilter === "ACTIVE") {

                    return !task.completed;

                }

                if (currentFilter === "COMPLETED") {

                    return task.completed;

                }

                return true;

            })

            .forEach((task, index) => {

                if (task.completed) {

                    completedCount++;

                }

                const taskDiv = document.createElement("div");

                taskDiv.classList.add("task");

                if (task.completed) {

                    taskDiv.classList.add("completed");

                }

                taskDiv.innerHTML = `
                    <span class="task-number">
                        ${(index + 1).toString().padStart(2, "0")}
                    </span>

                    <input 
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                        onchange="toggleTask('${task._id}', ${task.completed})"
                    />

                    <p>${task.title}</p>

                    <button 
                        class="edit-btn"
                        onclick="editTask('${task._id}', '${task.title}')"
                    >
                        Edit
                    </button>

                    <button 
                        class="delete-btn"
                        onclick="deleteTask('${task._id}')"
                    >
                        Delete
                    </button>
                `;

                taskList.appendChild(taskDiv);

            });

        totalTasks.textContent = tasks.length;

        completedTasks.textContent = completedCount;

    } catch (error) {

        console.log(error);

    }

}

// ADD TASK
async function addTask() {

    const title = taskInput.value.trim();

    if (title === "") return;

    try {

        await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                title

            })

        });

        taskInput.value = "";

        getTasks();

    } catch (error) {

        console.log(error);

    }

}

// TOGGLE COMPLETED
async function toggleTask(id, completed) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                completed: !completed

            })

        });

        getTasks();

    } catch (error) {

        console.log(error);

    }

}

// OPEN EDIT MODAL
function editTask(id, oldTitle) {

    currentEditId = id;

    editInput.value = oldTitle;

    editModal.style.display = "flex";

}

// SAVE EDIT
saveEditBtn.addEventListener("click", async () => {

    const newTitle = editInput.value.trim();

    if (newTitle === "") return;

    try {

        await fetch(`${API_URL}/${currentEditId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                title: newTitle

            })

        });

        editModal.style.display = "none";

        getTasks();

    } catch (error) {

        console.log(error);

    }

});

// CANCEL EDIT
cancelEditBtn.addEventListener("click", () => {

    editModal.style.display = "none";

});

// CLOSE MODAL WHEN CLICK OUTSIDE
window.addEventListener("click", (e) => {

    if (e.target === editModal) {

        editModal.style.display = "none";

    }

});

// DELETE TASK
async function deleteTask(id) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        getTasks();

    } catch (error) {

        console.log(error);

    }

}