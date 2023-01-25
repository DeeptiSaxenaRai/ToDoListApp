//array that store todoitem
let todolistArray = [];
const appElement = document.getElementById("toDoListApp");
//Add h1 element
const titleText = document.createElement("h1");
titleText.textContent = "Welcome To The JavaScript To Do List";

// create form elements:
const formElement = document.createElement("form");
const addTodoText = document.createElement("input");
addTodoText.minLength = "2 "; //set min length of input text
const addTodoButton = document.createElement("button");
addTodoButton.textContent = "Add Todo Items";
// Add the class for button for stayling
addTodoButton.classList.add("mainButton");

// append todo button to the form element:
formElement.append(addTodoText, addTodoButton);

// create todolist container:
const todolistItemContainer = document.createElement("div");

// completed todo items title, and container
const completedTodosTitle = document.createElement("h2");
completedTodosTitle.textContent = "---Completed ToDos Item---";
const completedTodosContainer = document.createElement("div");

// append the elements to the appElement
appElement.append(
  titleText,
  formElement,
  todolistItemContainer,
  completedTodosTitle,
  completedTodosContainer
);

// add event listener to the form:
formElement.addEventListener("submit", handleForm);

function handleForm(event) {
  event.preventDefault();
  const todoItemText = addTodoText.value;

  // if todoItemText is blank don't add it
  if (!todoItemText) return;

  // For making unique id get the current time
  const currentTime = new Date();
  const currentTimeStamp = currentTime.getTime();
  // append the todotext, with currentTime to todolist array
  todolistArray.push({
    name: todoItemText,
    id: currentTimeStamp,
    isCompleted: false,
  });
  // store the value in local storage
  updateLocalStorage();

  // clear the input text after adding the value
  addTodoText.value = "";
  createCompletedTodoItem(todoItemText, currentTimeStamp);
}

function createCompletedTodoItem(todoItemText, currentTimeStamp) {
  // create an element for the new todolist item
  const todoItemElement = document.createElement("p");
  todoItemElement.textContent = todoItemText;
  // add a delete button to the todoItemElement
  const deleteTodoButton = document.createElement("button");
  deleteTodoButton.textContent = "Delete";
  // append deleteTodoButton to the todoItemElement
  todoItemElement.appendChild(deleteTodoButton);

  // add an eventlistener to the deleteTodoButton
  deleteTodoButton.addEventListener("click", () =>
    deleteTodo(todoItemElement, currentTimeStamp)
  );

  // add a completeTodo button to the todoItemElement
  const completeTodoButton = document.createElement("button");
  completeTodoButton.textContent = "Done";
  // append completeTodoButton to the todoItemElement
  todoItemElement.appendChild(completeTodoButton);

  // add an eventlistener to the completeTodoButton
  completeTodoButton.addEventListener("click", () =>
    completeTodo(todoItemElement, currentTimeStamp)
  );
  todolistItemContainer.appendChild(todoItemElement, currentTimeStamp);
  // completedTodosContainer.appendChild()
}
// function to mark as todo item as completed
function completeTodo(todoItemElement, currentTimeStamp) {
  todolistArray = todolistArray.map((value) =>
    value.id === currentTimeStamp ? { ...value, isCompleted: true } : value
  );
  updateLocalStorage();
  // remove the element from the todolist container on the page
  todoItemElement.remove();
  // remove all child elements except the first one
  while (todoItemElement.childNodes.length > 1) {
    todoItemElement.removeChild(todoItemElement.lastChild);
  }
  // add the completed task in the completed todolist container
  completedTodosContainer.appendChild(todoItemElement);
  // createCompletedTodoItem(todoItemElement.textContent);
}

function deleteTodo(todoItemElement, currentTimeStamp) {
  const indexOfTodoItemInArray = todolistArray.findIndex(
    (value) => value.id === currentTimeStamp
  );

  todolistArray.splice(indexOfTodoItemInArray, 1);
  // update localStorage:
  updateLocalStorage();
  todoItemElement.remove();
  localStorage.removeItem(currentTimeStamp);
}

// localStorage Key:
const localStorageKey = "todolistArray";
// localStorage functions:
function updateLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(todolistArray));
}
