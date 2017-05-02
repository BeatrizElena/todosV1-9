// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

// Version 10: Adding Delete Buttons next to each todo
// 1. There should be a way to create delete buttons.
// 2. There should be a delete button for each todo.
// 3. Each li should have an id that has the todo position.
// 4. Delete buttons should have access to the todo id.
// 5. Clicking delete should update todoList.todos and the DOM.




var todoList = {
  todos: [],
  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText){
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
  },
  //toggleCompleted will create a new var ```todo``` to grab each todo item; which itself is an object.
  //It will then set the ```completed```property of that todo object to its opposite.
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0; 
    for(var i = 0; i < totalTodos; i++){
      //check if each todo item is completed
      if(this.todos[i].completed === true){
        completedTodos++;
      }
    }
    //if everything is true, make everything false
    if(completedTodos === totalTodos){
      for(var i = 0; i < totalTodos; i++){
        this.todos[i].completed = false;
      }//otherwise, make everything true
    } else {
        for(var i = 0; i < totalTodos; i++){
        this.todos[i].completed = true;
      }
    }
  }
};


var handlers = {
  addTodo: function(){
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = ""; //clears old input from input box
    view.displayTodos();
  },
  changeTodo: function(){
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    var changeTodoPosition = document.getElementById("changeTodoPositionInput");
    var position = changeTodoPosition.valueAsNumber;
    var todoText = changeTodoTextInput.value;
    todoList.changeTodo(position, todoText);
    position.value = "";
    todoText.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    var position = toggleCompletedPositionInput.valueAsNumber;
    todoList.toggleCompleted(position);
    position.value = "";
    view.displayTodos();
  },
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    for (var i = 0; i < todoList.todos.length; i++){
      var todoLi = document.createElement('li');
      var eachTodo = todoList.todos[i];
      var eachTodoTextWithCompletion = '';
      
      if(eachTodo.completed === true) {
         eachTodoTextWithCompletion = '(x) ' + eachTodo.todoText + ' ';
         } else {
         eachTodoTextWithCompletion = '( ) ' + eachTodo.todoText + ' ';
         }
         
      todoLi.id = i;
      todoLi.textContent = eachTodoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function(){
    var todosUL = document.querySelector('ul');
    todosUL.addEventListener('click', function(event){
    // console.log(event.target.parentNode.id); //Needed for Testing Only
    var elementClicked = event.target;
    if(elementClicked.className === 'deleteButton'){
    //run handlers.deleteTodo()function
    //Fx needs a position argument
    var position = parseInt(elementClicked.parentNode.id);
    handlers.deleteTodo(position);
  }
});
  }
};

//For the setUpEventListeners() method to run, we have to call it below
view.setUpEventListeners();