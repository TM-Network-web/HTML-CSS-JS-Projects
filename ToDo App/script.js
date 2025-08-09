
// DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const undoBtn = document.getElementById("undo");
const dateElement = document.getElementById("date");
const emptyState = document.querySelector(".empty-state");
const filters = document.querySelectorAll(".filter");

let todos = [];

let currentFilter = "all";

addTaskBtn.addEventListener("click",()=>addTasks(taskInput.value));

taskInput.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        addTasks(taskInput.value);
    }
});

clearCompletedBtn.addEventListener("click",clearCompleted);


function addTasks(text){
    if(text.trim()==="") return;

    let obj = {
        id:Date.now(),
        text,
        completed:false,
    };

    todos.push(obj);
    saveTasks();
    updateTasks();
    taskInput.value="";
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(todos));
    updateItemsCount();
    checkEmptyState();
}

function updateItemsCount(){
    const unCompletedTasks = todos.filter(task=>!task.completed);
    itemsLeft.textContent = `${unCompletedTasks.length} item${
        unCompletedTasks?.length !== 1 ? "s":""} left`;
}

function checkEmptyState(){
    const filteredTasks = filterTask(currentFilter);
    if(filteredTasks?.length===0) emptyState.classList.remove("hidden");
    else emptyState.classList.add("hidden");
}

function filterTask(filter){
    switch(filter){
        case "active":
            return todos.filter(task=>!task.completed);
        case "completed":
            return todos.filter(task=>task.completed);
        default:
            return todos;        
    }

}

function updateTasks(){
    todosList.innerHTML="";
    const filteredData = filterTask(currentFilter);

    filteredData.forEach(obj=>{

        const todoItems = document.createElement("li");
        todoItems.classList.add("todo-item");

        if(obj.completed) todoItems.classList.add("completed");

        const checkboxContainer = document.createElement("label");
        checkboxContainer.classList.add("checkbox-container");

        const checkbox = document.createElement("input");
        checkbox.type="checkbox";
        checkbox.checked = obj.completed;
        checkbox.classList.add("todo-checkbox");

        checkbox.addEventListener("change",()=>{
            toggleTodo(obj.id);
        })

        const checkmark = document.createElement("span");
        checkmark.classList.add("checkmark");

       
      
        checkboxContainer.appendChild(checkbox);
         checkboxContainer.appendChild(checkmark);
           todoItems.appendChild(checkboxContainer);

        const itemText = document.createElement("span");
        itemText.textContent = obj.text;
        itemText.classList.add("todo-item-text");


        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML=`<i class="fas fa-times"></i>`;

        deleteBtn.addEventListener("click",()=>{
            removeTask(obj.id);
        });

        todoItems.appendChild(itemText);
        todoItems.appendChild(deleteBtn);

        todosList.append(todoItems);
    });

}

function toggleTodo(id){
   todos = todos.map(task=>{
    if(task.id === id){
        return {...task, completed:!task.completed};
    }
    return  task;
    });
    saveTasks();
    updateTasks();
}


function removeTask(id){
    todos = todos.filter(task=>task.id!==id);
    saveTasks();
    updateTasks();
}

function clearCompleted(){
    todos = todos.filter(task=>!task.completed);
    saveTasks();
    updateTasks();
}

filters.forEach(filter=>{
    filter.addEventListener("click",()=>{
        setActiveFilter(filter.getAttribute("data-filter"));
    });
})

function setActiveFilter(filter){
    currentFilter = filter;
    filters.forEach(elem=>{
        if(elem.getAttribute("data-filter")===filter){
            elem.classList.add("active")
        }else{
            elem.classList.remove("active");
        }
    });

    updateTasks();
}

function loadTasks(){
    const storedTasks = localStorage.getItem("tasks");
    if(storedTasks) todos = JSON.parse(storedTasks);
    updateTasks();
}

function setDate(){
    const options = {weekday:"long", month:"short",day:"numeric"};
    let today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-us',options);
}


window.addEventListener("DOMContentLoaded",()=>{
    loadTasks();
    updateItemsCount();
    setDate();
})