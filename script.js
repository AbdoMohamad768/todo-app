const inp_task = document.querySelector('input[type="text"]');
const tasks_list = document.querySelector("ul");

const btn_add_task = document.querySelector("button");

let tasks = [];

const renderTasks = function () {
  tasks_list.textContent = "";

  tasks.forEach((task) => {
    const html = `
      <li class="task" data-id="${task.id}">
        <label>
          <input ${task.complete ? "checked" : ""} type="checkbox">
          <div class="toggle-checkbox"></div>
        </label>
        <p class="desc ${task.complete ? "complete" : ""}">${
      task.description
    }</p>
        <i class="fa-solid fa-trash"></i> <!--fa-shake on hover-->
      </li>
    `;

    tasks_list.insertAdjacentHTML("afterbegin", html);
  });
};
const storeTask = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getTasks = function () {
  const data = JSON.parse(localStorage.getItem("tasks"));

  if (!data) return;

  tasks = data;
};
const sortTasks = function () {
  tasks.sort((a, b) => b.complete - a.complete);
};

window.addEventListener("load", function (e) {
  getTasks();

  renderTasks();
});

btn_add_task.addEventListener("click", function (e) {
  e.preventDefault();

  if (inp_task.value === "") return;

  const id = (Date.now() + "").slice(-10);

  tasks.push({ id, complete: false, description: inp_task.value });

  sortTasks();
  renderTasks();
  storeTask();

  inp_task.value = "";
});

tasks_list.addEventListener("click", function (e) {
  if (e.target.classList.contains("toggle-checkbox")) {
    const list_task = e.target.closest(".task");
    const targetTask =
      tasks[tasks.findIndex((task) => task.id === list_task.dataset.id)];

    list_task.querySelector("p").classList.toggle("complete");
    targetTask.complete = !targetTask.complete;

    sortTasks();
    renderTasks();
  }

  if (e.target.classList.contains("fa-trash")) {
    const list_task = e.target.closest(".task");
    tasks.splice(
      tasks.findIndex((task) => task.id === list_task.dataset.id),
      1
    );
    list_task.remove();
  }

  storeTask();
});

tasks_list.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("fa-trash")) return;

  e.target.classList.add("fa-shake");
});
tasks_list.addEventListener("mouseout", function (e) {
  if (!e.target.classList.contains("fa-trash")) return;

  e.target.classList.remove("fa-shake");
});
