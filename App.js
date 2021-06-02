// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
// event listenser
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
  // prevent form submission
  event.preventDefault();
  // creating the new div sort of stuffs
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create list
  const newToDo = document.createElement("li");
  newToDo.innerText = todoInput.value;
  newToDo.classList.add("todo-item");
  todoDiv.appendChild(newToDo);
  //add todo to the localStorage
  saveLocalTodos(todoInput.value);
  // Add button .. trash ,checked
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class = "fas fa-check"></i>`;
  completedButton.classList.add("complted-btn");
  todoDiv.appendChild(completedButton);
  // trash
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class = "fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
  // clear form
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  // detete item
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // falling animation for deleted function
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", (event) => {
      todo.remove();
    });
  }
  // Tradironal way of function
  // todo.addEventListener("transitionend", function () {
  // todo.remove();
  // });

  //checked
  if (item.classList[0] === "complted-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else todo.style.display = "none";
    }
  });
}

//local storage things
function saveLocalTodos(todo) {
  //checked already existed item
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSon.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create list
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);

    // Add button .. trash ,checked
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class = "fas fa-check"></i>`;
    completedButton.classList.add("complted-btn");
    todoDiv.appendChild(completedButton);
    // trash
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class = "fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
