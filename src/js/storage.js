let tasks = [];

/* ---------- Local Storage Helpers ---------- */
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return [];
}

/* ---------- Templates & Rendering ---------- */
function taskTemplate(task) {
  return `
    <li ${task.completed ? 'class="strike"' : ""}>
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>`;
}

function renderTasks(tasks) {
  const listElement = document.querySelector("#todoList");
  listElement.innerHTML = "";
  listElement.innerHTML = tasks.map(taskTemplate).join("");
}

/* ---------- Task Logic ---------- */
function newTask() {
  const task = document.querySelector("#todo").value;
  if (!task) return;

  tasks.push({ detail: task, completed: false });
  setLocalStorage("todos", tasks);
  renderTasks(tasks);
  document.querySelector("#todo").value = "";
}

function removeTask(taskElement) {
  const taskText = taskElement.querySelector("p").innerText;
  tasks = tasks.filter(task => task.detail !== taskText);
  setLocalStorage("todos", tasks);
  taskElement.remove();
}

function completeTask(taskElement) {
  const taskText = taskElement.querySelector("p").innerText;
  const taskIndex = tasks.findIndex(task => task.detail === taskText);

  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  taskElement.classList.toggle("strike");

  setLocalStorage("todos", tasks);
}

function manageTasks(e) {
  const action = e.target.dataset.action;
  const parent = e.target.closest("li");
  if (!action || !parent) return;

  if (action === "delete") removeTask(parent);
  if (action === "complete") completeTask(parent);
}

/* ---------- User Name Logic ---------- */
function setUserName() {
  const name = localStorage.getItem("todo-user");
  if (name) {
    document.querySelector(".user").innerText = name;
  }
}

function userNameHandler() {
  const name = document.querySelector("#user").value;
  if (!name) return;

  localStorage.setItem("todo-user", name);
  setUserName();
}

/* ---------- Initialization ---------- */
function init() {
  tasks = getLocalStorage("todos");
  renderTasks(tasks);
  setUserName();
}

/* ---------- Event Listeners ---------- */
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);
document
  .querySelector("#userNameButton")
  .addEventListener("click", userNameHandler);

/* ---------- Start App ---------- */
init();