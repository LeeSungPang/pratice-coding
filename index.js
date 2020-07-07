const toDoForm = document.querySelector("form"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".toDoList"),
  toDoFinish = document.querySelector(".FinishList");

const PENDING_TODOS = "PENDING";
const FINISH_TODOS = "FINISH";
let toDos = [];
let finishToDos = [];
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function checkToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  toDoList.removeChild(li);
  toDoFinish.appendChild(li);

  const checkToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  const moveToDos = toDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  toDos = checkToDos;
  finishToDos.push(moveToDos[0]);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(PENDING_TODOS, JSON.stringify(toDos));
  localStorage.setItem(FINISH_TODOS, JSON.stringify(finishToDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  checkBtn.innerText = "✅";
  delBtn.addEventListener("click", deleteToDo);
  checkBtn.addEventListener("click", checkToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(checkBtn);
  li.appendChild(delBtn);
  li.id = newId;

  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  finishToDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(PENDING_TODOS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();

  toDoForm.addEventListener("submit", handleSubmit);
}

init();
