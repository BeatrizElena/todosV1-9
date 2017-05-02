// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

// Version 8: REFACTORING
// 1. There should be a "Display Todos" button and a "Toggle All" button in the app.
// 2. Clicking "Display Todos" should run todoList.displayTodos.
// 3. Clicking "Toggle All" should run todoList.toggleAll.

//CODE CHANGES IN VERSION BEFORA GETTING TO REQUIREMENTS

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
    todo.displayTodos();
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

//Get access to the buttons
var displayTodosButton = document.getElementById("displayTodosButton");
var toggleAllButton = document.getElementById("toggleAllButton");

//Run displayTodos method when someone clicks the display todos button (i.e addEventListener)
displayTodosButton.addEventListener('click', function(){
  todoList.displayTodos();
});

//Run toggleAll method when someone clicks the toggle all button (i.e addEventListener)
toggleAllButton.addEventListener('click', function(){
  todoList.toggleAll();
})

var handlers = {
  displayTodos: function(){
  todoList.displayTodos();
  },
  toggleAll: function(){
  todoList.toggleAll();
}
}