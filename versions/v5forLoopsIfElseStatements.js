// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

// Version 5 Requirements
// 1. displayTodos should show ```.todoText```.
// 2. displayTodos should tell you if ```.todos``` is empty.
// 3. displayTodos should show ```completed```.


var todoList = {
  todos: [],
  displayTodos: function(){
    if (this.todos.length === 0){
      console.log("Your To-Do List is empty!");
    }
    else{
      console.log("My Todos:")
      for(var i = 0; i < this.todos.length; i++){
        if(this.todos[i].completed === true){
          console.log('(x)', this.todos[i].todoText);
        }
        else{
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
  }
};