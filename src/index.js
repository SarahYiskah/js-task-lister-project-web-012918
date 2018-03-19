document.addEventListener("DOMContentLoaded", () => {
  console.log("The DOM content has loaded");
  // your code here ....
});

let submitList = document.getElementById('submit-list');
let allLists = document.getElementById('lists')
let topHalf = document.getElementById('top-half')
let counter = 0



submitList.addEventListener('click', addNewList)

function addNewList(event) {
  event.preventDefault()
  let newDiv = document.createElement('div')
  newDiv.setAttribute('class', 'list')
  let h2 = document.createElement('h2')
  h2.innerText = " " + document.getElementById('new-title').value
  let button = document.createElement('button')
  button.innerText = 'X'
  button.setAttribute('class', 'delete-list')
  button.setAttribute('data-id', ++counter)
  h2.prepend(button)
  newDiv.append(h2)
  allLists.append(newDiv)
  addTask()
}

function addTask() {
  let taskForm = document.getElementById("create-task-form")
  if (taskForm === null) {
    addTaskBox()
  } else {
    addOptionToBox()
  }
}

function addTaskBox() {
  let taskBox = document.createElement('form')
  taskBox.setAttribute('id', 'create-task-form')
  taskBox.innerHTML = `<label for="parent-list">Select List:</label>
      <select id="parent-list" name="parent-list">
      ${addOptions()}
      </select>
      <label for="new-task-description">Task description:</label>
      <input type="text" id="new-task-description" name="new-task-description" placeholder="description">
      <label for="new-task-priority">Priority level:</label>
      <input type="text" id="new-task-priority" name="new-task-priority" placeholder="priority">
      <input type="submit" value="Create New Task" id="new-task-submit">`
  topHalf.append(taskBox)
  let submitTask = document.getElementById('new-task-submit');
  submitTask.addEventListener('click', addNewTask)
}



function addNewTask(event) {
  event.preventDefault()
  let listName = document.getElementById('parent-list').options[document.getElementById('parent-list').selectedIndex].text;
  let lists = document.querySelectorAll('.list h2')
  let description = document.getElementById('new-task-description').value
  let priority = document.getElementById('new-task-priority').value

  lists.forEach(function(element) {
    debugger
    if(element.innerText.split('\n')[0].substring(2) === listName){
      let li = document.createElement('li')
      li.innerHTML = "Task: " + description + "<br> Priority: " + priority
      element.append(li)
    }
  })


}

function addOptions() {
  let optionSelect = ""
  let lists = document.querySelectorAll('.list h2')
  lists.forEach(element =>  {
    optionSelect += "<option>" + element.innerText.split('\n')[0].substring(2) + "</option>"
  })
  return optionSelect
}

function addOptionToBox() {
  let taskBox = document.getElementById('create-task-form')
  taskBox.innerHTML = `<label for="parent-list">Select List:</label>
      <select id="parent-list" name="parent-list">
      ${addOptions()}
      </select>
      <label for="new-task-description">Task description:</label>
      <input type="text" id="new-task-description" name="new-task-description" placeholder="description">
      <label for="new-task-priority">Priority level:</label>
      <input type="text" id="new-task-priority" name="new-task-priority" placeholder="priority">
      <input type="submit" value="Create New Task" id="new-task-submit">`
  let submitTask = document.getElementById('new-task-submit');
  submitTask.addEventListener('click', addNewTask)
}


allLists.addEventListener('click', function(event){
  if(event.target.tagName === "BUTTON"){
    removeList(event)
  }
})
function removeList(event){
  event.target.parentElement.parentElement.remove()
  let lists = document.getElementsByClassName("list")
  if (lists.length === 0) {
    let taskBox = document.getElementById('create-task-form')
    taskBox.remove()
  } else {
    addOptionToBox()
  }
}
