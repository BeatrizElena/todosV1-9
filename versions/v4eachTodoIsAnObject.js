// client-side js
// run by the browser each time your view template is loaded

// Version 4 Requirements
// 1. todoList.addTodo should add objects.
// 2. todoList.changeTodo should change the todoText property.
// 3. todoList.toggleCompleted should change the completed property.


var todoList = {
  todos: [],
  displayTodos: function(){
    console.log("My Todos:", this.todos)
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
  }
};