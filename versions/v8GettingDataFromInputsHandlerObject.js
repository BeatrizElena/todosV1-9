// client-side js
// run by the browser each time your view template is loaded
// NOTE: Glitch is unable to access the console to test the code.

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

// Version 8: Getting Data from Inputs for all the buttons below
// 1. It should have working controls for .addTodo.
// 2. It should have working controls for .changeTodo.
// 3. It should have working controls for .deleteTodo.
// 4. It should have working controls for .toggleCompleted.



var todoList = {
  todos: [],
  displayTodos: function(){
    if (this.todos.length === 0){
      console.log("Your To-Do List is empty!");
    } else {
      console.log("My Todos:");
      for(var i = 0; i < this.todos.length; i++){
        if(this.todos[i].completed === true){
          console.log('(x)', this.todos[i].todoText);
        } else {
          console.log('( )', this.todos[i].todoText);
        }
      }
    }
  },
  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function(position, todoText){
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  //toggleCompleted will create a new var ```todo``` to grab each todo item; which itself is an object.
  //It will then set the ```completed```property of that todo object to its opposite.
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0; //initialize at zero
    // get number of completed todos
    for(var i = 0; i < totalTodos; i++){
      //check if each todo item is completed
      if(this.todos[i].completed === true){
        //increase completedTodos by 1
        completedTodos++;
      }
    }
    //if everything is true, make everything false
    if(completedTodos === totalTodos){
      //make everything false
      for(var i = 0; i < totalTodos; i++){
        this.todos[i].completed = false;
      }//otherwise, make everything true
    }else{
       for(var i = 0; i < totalTodos; i++){
        this.todos[i].completed = true;
      }
      }
    }
};
//Each handler can potentially change data
var handlers = {
  displayTodos: function(){
  todoList.displayTodos();
  },
  addTodo: function(){
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = ""; //clears old input from input box
  },
  changeTodo: function(){
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    var changeTodoPosition = document.getElementById("changeTodoPositionInput");
    var position = changeTodoPosition.valueAsNumber;
    var todoText = changeTodoTextInput.value;
    todoList.changeTodo(position, todoText);
    position.value = "";
    todoText.value = "";
  },
  deleteTodo: function(){
    var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
    var position = deleteTodoPositionInput.valueAsNumber;
    todoList.deleteTodo(position);
    position.value = "";
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    var position = toggleCompletedPositionInput.valueAsNumber;
    todoList.toggleCompleted(position);
    position.value = "";
  },
  toggleAll: function(){
  todoList.toggleAll();
  }
}