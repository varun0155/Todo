

// Selectors
let todoInput = document.querySelector("#todo-input");
let todoButton = document.querySelector("#todo-button");
let todoContainer = document.querySelector(".todo-container");
let todoFilter = document.querySelector("#filter");

// listners
todoButton.addEventListener("click", addItem);
todoContainer.addEventListener("click", processItem);
document.addEventListener("DOMContentLoaded", getItemsFromStorage);
todoFilter.addEventListener("change", filter);

// functions
function addItem(event) {
  event.preventDefault();
  let val = todoInput.value;
  saveItemInStorage(val);
  addContainer(val);
}

function addContainer(item) {
  let todoItem = document.createElement('div');
  todoItem.classList.add("todo-item");

  // child conatiners

  let todoContent = document.createElement('div');
  todoContent.classList.add("todo-content");
  todoContent.innerText = item;

  let todoEdit = document.createElement("button");
  todoEdit.classList.add("todo-edit");
  todoEdit.innerHTML = `<i class="fa fa-edit" style = "pointer-events : none"></i>`;

  let todoComplete = document.createElement('button');
  todoComplete.classList.add("todo-complete");
  todoComplete.innerHTML = `<i class="fa fa-check" style = "pointer-events : none"></i>`;

  let todoDelete = document.createElement('button');
  todoDelete.classList.add("todo-delete");
  todoDelete.innerHTML = `<i class="fa fa-trash" style = "pointer-events : none"></i>`;

  todoItem.appendChild(todoContent);
  todoItem.appendChild(todoEdit);
  todoItem.appendChild(todoComplete);
  todoItem.appendChild(todoDelete);

  // apend item in container
  todoContainer.appendChild(todoItem);
}

let previousValue = "";

function processItem(event) {
  let buttonClass = event.target.classList[0];

  if (buttonClass == "todo-delete") {
    deleteItem(event.target);
  }
  else if (buttonClass == "todo-complete") {
    completeItem(event.target);
  }
  else if (buttonClass == "todo-edit") {
    let parentItem = event.target.parentElement;
    let contentContainer = parentItem.childNodes[0];
    let content = contentContainer.innerText;
    previousValue = content;
    contentContainer.innerHTML = `<input id = "todo-edit-input" style = "border : none; padding : 10px; font-size : 20px" autofocus value = ${content}>`;

    let editInput = document.querySelector("#todo-edit-input");
    editInput.addEventListener("focusout", updateValue);

    // let document.querySelector
  }

}

function updateValue(event) {
  let parentItem = event.target.parentElement;
  parentItem.innerHTML = event.target.value;
  let todoItems = localStorage.getItem("todo_items");
  todoItems = JSON.parse(todoItems);

  todoItems = todoItems.map(function (item) {
    if (item == previousValue) {
      return event.target.value;
    }
    else
      return item;
  })

  localStorage.setItem("todo_items", JSON.stringify(todoItems));
}

function deleteItem(callButton) {
  let parentItem = callButton.parentElement;
  let itemContent = parentItem.childNodes[0];
  value = itemContent.innerText;

  let todoItems = localStorage.getItem("todo_items");
  todoItems = JSON.parse(todoItems);

  todoItems = todoItems.filter(function (item) {
    return item !== value
  })
  localStorage.setItem("todo_items", JSON.stringify(todoItems));

  parentItem.remove();
}

function completeItem(callButton) {
  let parentItem = callButton.parentElement;
  parentItem.classList.toggle("completed");
}

function saveItemInStorage(item) {
  let todoItems = localStorage.getItem("todo_items");
  todoItems = JSON.parse(todoItems);
  todoItems.push(item);
  localStorage.setItem("todo_items", JSON.stringify(todoItems));
}

function getItemsFromStorage(event) {
  let todoItems = localStorage.getItem("todo_items");
  if (todoItems == null) {
    todoItems = [];
    localStorage.setItem("todo_items", JSON.stringify(todoItems));
  }
  else {
    items = JSON.parse(todoItems);
    items.forEach(item => {
      addContainer(item);
    });
  }
}



function filter(event) {
  let todoNodes = todoContainer.childNodes;

  for (let i = 1; i < todoNodes.length; i++) {
    let todoItem = todoNodes[i];

    switch (event.target.value) {
      case "Completed":
        if (!todoItem.classList.contains("completed")) {
          todoItem.style.display = "none";
        }
        else {
          todoItem.style.display = "flex";
        }
        break;
      case "Not-Completed":
        if (todoItem.classList.contains("completed")) {
          todoItem.style.display = "none";
        }
        else {
          todoItem.style.display = "flex";
        }
        break;

      default:
        todoItem.style.display = "flex";
        break;
    }

  }
}