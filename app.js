// DOM Selection
const d = document
const input = d.querySelector("input")
const clearBtn = d.querySelector(".clearBtn")
const addBtn = d.querySelector(".addBtn")
const todosContainer = d.querySelector("#content")
let tasks


// Todo class Initilization
class Todo {
  constructor(id, text, done){
    this.id = id
    this.text = text
    this.done = done
  }
}

// Todo HTML
const todoHTML = (name, id) => (`
  <div class="todo" data-id=${id} >
    <button class="btn checkBtn" onclick="checkTodo(this)"> <i class="far fa-circle"></i> </button>
    <p class="text">${name}</p>
    <button class="btn removeBtn" onclick="removeTodo(this)"> <i class="fas fa-trash"></i> </button>
  </div>
`)


// LocalStorage empty ?
if(localStorage.length === 0){
  tasks = []
  localStorage.setItem("tasks", JSON.stringify(tasks))
} else {
  // Get LocalStorage and put it in HTML
  tasks = JSON.parse(localStorage.getItem("tasks"))
  for(task of tasks){
    todosContainer.innerHTML += todoHTML(task.text, task.id)
    if(task.done){
      todosContainer.lastElementChild.classList.add("checked")
      todosContainer.lastElementChild.childNodes[1].childNodes[1].className = "far fa-check-circle"
    }
  }
}


// On enter pressed
window.addEventListener("keyup", e => {
  if(e.keyCode == 13){
    addTodo(input.value)
  }
})

function addTodo(){
  const text = input.value
  input.value = ""
  const task = new Todo(Date.now().toString(), text, false)
  todosContainer.innerHTML += todoHTML(task.text, task.id)
  tasks.push(task)
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function removeTodo(target){
  const todo = target.parentNode
  const id = todo.getAttribute("data-id")
  const index = tasks.findIndex(e => e.id === id)
  tasks.splice(index, 1)
  localStorage.setItem("tasks", JSON.stringify(tasks))
  todo.remove()
}

function checkTodo(target){
  const todo = target.parentNode
  const id = todo.getAttribute("data-id")
  const index = tasks.findIndex(e => e.id === id)

  if(!tasks[index].done){
    tasks[index].done = true
    todo.classList.add("checked")
    todo.childNodes[1].childNodes[1].className = "far fa-check-circle"
    localStorage.setItem("tasks", JSON.stringify(tasks))
  } else {
    tasks[index].done = false
    todo.classList.remove("checked")
    todo.childNodes[1].childNodes[1].className = "far fa-circle"
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}

function clearTodos(){
  todosContainer.innerHTML = ""
  tasks = []
  localStorage.setItem("tasks", JSON.stringify(tasks))
}