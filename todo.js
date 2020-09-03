const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");

const todoList = document.querySelector(".list-group");
const addTodoBox = document.querySelector("#add-todo-box");

const container = document.querySelector("#container");
const deleteAll = document.querySelector("#clear-todos");
const filter = document.querySelector("#filter");
eventListeners();
function eventListeners(){
    form.addEventListener("submit" , addTodo);
    document.addEventListener("DOMContentLoaded" , loadAllTodosToUI);
    document.addEventListener("click" , deleteTodo);
    deleteAll.addEventListener("click" , deleteEverything);
    filter.addEventListener("keyup" , filterTodos);

}













function filterTodos(e){
    let targetValue =e.target.value.toLowerCase();
    console.log(targetValue);
    const todos = document.querySelectorAll(".list-group-item");

    todos.forEach(function(element){
        const text = element.textContent.toLowerCase();

        if(text.indexOf(targetValue)===-1){
            element.setAttribute("style" , "opacity : 0.2;");   

        }
        else{
            element.setAttribute("style" , "opacity: 1;");
            element.setAttribute("style" , "order: -1;");
            
            
            
        }
        
        

    });

}
function deleteEverything(e){
    
    let a =confirm("Are you sure you want to remove all TODOs ?");
    //  if(a){
    //      while(todoList.children[0] !=null){
    //          todoList.children[0].remove();
            
    //      }
    //      showAlert("success" , "Tüm TODO'lar başarıyla silindi");
    //  }
    if(a){
    let count = todoList.childElementCount;
    for(let i = 0 ; i<count ; i++){
        console.log(i);
        todoList.children[0].remove();
    }
    
    showAlert("success" , "All TODOs removed successfully.");
    
    localStorage.removeItem("todos");
}
}

function deleteTodo(e){
    let target = e.target.parentElement.parentElement;
    if(e.target.className === "fa fa-remove"){
       
       target.remove();
        deleteTodoFromStorage(target.textContent);
       showAlert("primary" ,"Todo removed successfully.");
    }
    
}

function deleteTodoFromStorage(todo){
    let gelenTodos = getTodoFromStorage();

    gelenTodos.forEach(function(e,index){
        if(e === todo){
            
            gelenTodos.splice(index,1);
        }
    })

    localStorage.setItem("todos" , JSON.stringify(gelenTodos));
}


function loadAllTodosToUI(){
    let todos =getTodoFromStorage();

    todos.forEach(function(e){
        addToUI(e);
    });
}
function showAlert(type , message){
//     <div class="alert alert-danger" role="alert">
//   This is a danger alert—check it out!
// </div>
const alert = document.createElement("div");
alert.className = `alert alert-${type} text-center`;
alert.textContent = message;
container.appendChild(alert);
setTimeout(() => {
    alert.remove();
}, 1500);



}
function addTodo(e){
const newTodo = todoInput.value.trim();
if(newTodo === ""){
    
    showAlert("danger" , "Todo input cannot be empty.");
}
else if (control(newTodo)){
    showAlert("warning" , "Cannot add a todo more than once.");
}
else if(newTodo.length >= 50){
    showAlert("danger" , "Todo 50 karakterden fazla olamaz");
}
else{
    addToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success" , "TODO successfully added.");
}






todoInput.value = "";
e.preventDefault();
}
function addToUI(newTodo){


const listItem = document.createElement("li");
listItem.className = "list-group-item d-flex justify-content-between";
listItem.appendChild(document.createTextNode(newTodo));

const link = document.createElement("a");
link.href = "#";
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>";

listItem.appendChild(link);

todoList.appendChild(listItem);





}

function getTodoFromStorage(){
    if(localStorage.getItem("todos") === null){
        var todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addTodoToStorage(newTodo){
   let todos = getTodoFromStorage();

   todos.push(newTodo);
   localStorage.setItem("todos" , JSON.stringify(todos));

    



}

 function control(newTodo){
     let val = false;
     
     getTodoFromStorage().forEach(function(e){
        if(e ===newTodo){
            val=true;
        }
    });
            
        
     
    
     return val;
 }












