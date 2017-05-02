// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

// Version 6 Requirements: The Toggle On & Off Feature
// 1. .toggleAll: if everything's true, make everything false.
//   - i.e. if everything's checked, make everything unchecked.
// 2. toggleAll: Otherwise, make everything true.
//   - i.e. for every other situation, make everything checked.

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