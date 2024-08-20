"use strict";

const KEY = "todo-list";
let todoArr = JSON.parse(getFromStorage(KEY)) || [];

const taskInput = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

if (currentUserLog === null) {
  alert("cần đăng nhập ");
  throw new Error("cần đăng nhập  ");
}

function addTask() {
  const textTask = taskInput.value.trim();
  if (!textTask) return;
  const owner = currentUserLog.username;

  const newTask = new Task(textTask, owner);
  0;

  todoArr.push(newTask);
  saveToStorage(KEY, JSON.stringify(todoArr));
  displayTasks();
  taskInput.value = "";
}

// hien thi task
function displayTasks() {
  todoList.innerHTML = "";

  for (const task of todoArr) {
    if (task.owner === currentUserLog.username) {
      const listItem = document.createElement("li");

      //task: Nội dung công việc.
      listItem.innerText = task.task;

      if (task.isDone) listItem.classList.add("checked"); //hiển thị việc đã hoàn thành
      const closeBtn = document.createElement("span");
      closeBtn.classList.add("close");
      closeBtn.innerText = "x";

      listItem.appendChild(closeBtn);
      todoList.appendChild(listItem);

      //add event listener for toggle task
      listItem.addEventListener("click", function () {
        task.isDone = !task.isDone;
        saveToStorage(KEY, JSON.stringify(todoArr));
        displayTasks();
      });
      // event listener delete task
      closeBtn.addEventListener("click", function () {
        const index = todoArr.indexOf(task);
        if (index !== -1) {
          todoArr.splice(index, 1);

          saveToStorage(KEY, JSON.stringify(todoArr));
          displayTasks();
        }
      });
    }
  }
}

displayTasks();
btnAdd.addEventListener("click", addTask);
