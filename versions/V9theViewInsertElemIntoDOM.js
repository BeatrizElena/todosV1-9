// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

// Version 9: Inserting Elements Into the DOM
// 1. There should be a li element for every todo.
// 2. Each li element should contain .todoText.
// 3. Each li element should show .completed.




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
  deleteTodo: function(){
    var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
    var position = deleteTodoPositionInput.valueAsNumber;
    todoList.deleteTodo(position);
    position.value = "";
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
}

var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    for (var i = 0; i < todoList.todos.length; i++){
      var todoLi = document.createElement('li');
      var eachTodo = todoList.todos[i];
      var eachTodoTextWithCompletion = '';
      
      if(eachTodo.completed === true) {
         eachTodoTextWithCompletion = '(x) ' + eachTodo.todoText;
         } else {
         eachTodoTextWithCompletion = '( ) ' + eachTodo.todoText;
         }
         
      todoLi.textContent = eachTodoTextWithCompletion;
      todosUl.appendChild(todoLi);
    }
  }
}