Version 9: The View Object: Inserting li Elements into the DOM
==============================================================
In V9, we wrote the displayTodos() function as part of the View object and to interact with the DOM as oppossed to outputting to the console.

The view.displayTodos() function accesses the todoList object to get to the following properties of the object:
- .todos (the array)
- .todoText (the name of the todo)
- .completed (whether each todo is completed ot not)



Version 9 Requirements: 
-----------------------
1. There should be a li element for every todo.
2. Each li element should contain .todoText.
3. Each li element should show .completed.
4. Clean up the code
  - Once the view.displayTodos() is completed, call it inside every method of all the handlers object, the ones that tell each button in the app what to do when clicked.
  - At the end, delete the displayTodos() methods from the todoList object and the handlers object. Also delete the call other methods were making of displayTodos() inside the todoList and the handlers objects.
  
  Important Notes About How We Have Organized Code So Far: The MVC Model
  --------------------------------------------------------------------------
  The code is now organized into three objects: the todoList, the handlers and the view.
  
  **1. The todoList Object: the Model**
  - The purpose of the todoList object is to represent our data as an array and to have methods that can change that data. So the name **todoList** is appropriate because it is the array and it has methods for that array.
  
  **2. The handlers Object: the Controller**
  - The purpose of the handlers object is to provide handler methods for our user interface (UI).
  - The handlers object is solely focused on handling user interactions. That is, whenever someone hits one of our buttons, there's a corresponding handler inside the handlers object that takes care of that click.
  
   **3. The view Object: the View**
what the todoVersion 9: The View Object: Inserting li Elements into the DOM
   - The sole purpose of the view object is to show the user what the todo list looks like. It doesn't do anything else; it doesn't delete data, it doesn't handle button clicks, it doesn't modify data.
  

Final Code for Version 9:
```
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
```

Version 8: Refactoring the addEventListener Code
================================================

Version 8 Requirements: Getting Data from Inputs for all the buttons below
--------------------------------------------------------------------------
1. It should have working controls for .addTodo.
2. It should have working controls for .changeTodo.
3. It should have working controls for .deleteTodo.
4. It should have working controls for .toggleCompleted.


Version 8 Steps:
---------------------------
1. Inside the Handlers object, we added another method for adding todos:
```
var handlers = {
  displayTodos: function(){
  todoList.displayTodos();
  },
  toggleAll: function(){
  todoList.toggleAll();
  },
  addTodo: function(){
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = ""; //clears old input from input box
  }
}
```
- The handlers.addTodo() method grabs the input first.
- Then, it calls the todoList.addTodo() method from the todoList object.
- Finally, it gives the todoList.addTodo() method the todoText argument it needs, by grabbing the value of the user input, using this line of code: ```todoList.addTodo(addTodoTextInput.value);```

Pre-Version 8: Refactoring the addEventListener Code
================================================
Instead of grabbing the documentById and then adding an event listener to it, we gave the buttons an onclick attribute that was set equal to handler methods defined in JavaScript. Each handler can potentially change data; e.g. the **add** button can add todos, the **change** button can change a todo, etc.

Here's the old and new HTML code for the buttons:
```
<button id="displayTodosButton">Display Todos</button>
<button id="toggleAllButton">Toggle All</button>

<button onclick="handlers.displayTodos()">Display Todos</button>
<button onclick="handlers.toggleAll()">Toggle All</button>
```
In the JS file, we created a handlers object and moved the functions inside the object.
New Code:
```
var handlers = {
  displayTodos: function(){
  todoList.displayTodos();
  },
  toggleAll: function(){
  todoList.toggleAll();
}
}
```
Old Code:
```
var displayTodosButton = document.getElementById("displayTodosButton");
var toggleAllButton = document.getElementById("toggleAllButton");

displayTodosButton.addEventListener('click', function(){
  todoList.displayTodos();
});

toggleAllButton.addEventListener('click', function(){
  todoList.toggleAll();
})
```

Version 7: HTML and the DOM
===========================

Version 7 Requirements:
-----------------------
1. There should be a "Display Todos" button and a "Toggle All" button in the app.
2. Clicking "Display Todos" should run todoList.displayTodos.
3. Clicking "Toggle All" should run todoList.toggleAll.


Version 7 Steps:
---------------------------
1. HTML code to meet requirement 1:
```
<button>Display Todos</button>
<button>Toggle All</button>
```
2. To get a DOM element, first we type ```document.``` and then the element we want inside the document. 
  - Since we already have two button elements, and we only want to get the first button, we have to modify that first button element by giving it an id of "displayTodosButton".
    ```
    <button id="displayTodosButton">Display Todos</button>
    ```
  - Then, we use the addEventListener method to run the displayTodos method when someone clicks the display todos button.
    ```
    displayTodosButton.addEventListener('click', function(){
      todoList.displayTodos();
    });
    ```
3. Basically the same as in Step 2.
    ```
    var displayTodosButton = document.getElementById("displayTodosButton");
    var toggleAllButton = document.getElementById("toggleAllButton");

    displayTodosButton.addEventListener('click', function(){
      todoList.displayTodos();
    });

    toggleAllButton.addEventListener('click', function(){
      todoList.toggleAll();
    })
    ```

Version 6: Writing the toggleAll Method for the todoList Object
===============================================================

Version 6 Requirements: The Toggle On & Off Feature
---------------------------------------------------
1. .toggleAll: if everything's true, make everything false.
  - i.e. if everything's checked, make everything unchecked.
2. toggleAll: Otherwise, make everything true.
  - i.e. for every other situation, make everything checked.

Version 6 toggleAll Method:
---------------------------
```
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0; //initialize at zero
    // get number of completed todos
    for(var i = 0; i < this.totalTodos; i++){
      //check if each todo item is completed
      if(this.todos[i].completed = true){
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
        this.todos[i].completed = true;
      }
    }
```

Version 5: The For Loop and If/Else Statements
==============================================

Version 5 Requirements
----------------------
1. displayTodos should show ```.todoText```.
2. displayTodos should tell you if ```.todos``` is empty.
3. displayTodos should show ```completed```.

Version 5 Steps
---------------
1. In version 4, the console.log() prints ```this.todos``` which prints each todo as a full object:
```
 todos: [],
  displayTodos: function(){
    console.log("My Todos:", this.todos)
  },
```
In version 5, we want to print only the ```.todoText``` property of **each todo object**. The **for loop** is used to get to each property of each todo object:
```
 displayTodos: function(){
    console.log('My todos:');
    for(var i = 0; i < this.todos.length; i++){
      console.log(this.todos[i].todoText);
    }
```
2. Requirement 2 requires an ```if/else statatement```. **If** the list is empty, let the user know. **Else**, use the for loop, as written for requirement 1, to print the todos.
```
displayTodos: function(){
    if (this.todos.length === 0){
      console.log("Your To-Do List is empty!");
    }
    else{
      console.log("My Todos:")
      for(var i = 0; i < this.todos.length; i++){
        console.log(this.todos[i].todoText);
      }
    }
  },
```
3. For requirement 3, we will change the ```console.log(this.todos[i].todoText);``` statement and print
- either ```'(x)', this.todos[i].todoText``` **if** the todo is completed 
- or **else**```'()', this.todos[i].todoText``` if the todo is not completed.


Version 4: Booleans ( and modify the way we add new todos)
==========================================================
 - Booleans are basically a representation of "True" or "False."
 - We'll use the```completed``` property to set if a todo is completed or not.
 - To use the completed property, we must transform each todo item into an object that can have the ```completed``` property.
 - In this version, each todo object will have two properties: the ```text``` property will name the object and the ```completed``` property will toggle on and off, using Booleans.


Version 4 Requirements
----------------------
1. todoList.addTodo should add objects.
2. todoList.changeTodo should change the todoText property.
3. todoList.toggleCompleted should change the completed property.

Version 4 Steps
---------------
1. The ```todos``` property of the ```todoList``` object is set to an empty array before the ```todoList.addObject``` can add each todo item as an object.
- the ```push()``` function used to add objects to the empty array set in Step 1, is given an object with two properties as its parameter:
```
this.todos.push({
      todoText: todoText,
      completed: false
    });
```
3. toggleCompleted will create a new var ```todo``` to grab each todo item/object. It will then set the ```completed```property of that todo object to its opposite.
```
var todo = this.todos[position];
todo.completed = !todo.completed;
```

The final code will look like this: 
```
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
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    todo.displayTodos();
  }
};
```


Version 3: Objects (From the Console to the Text Editor)
========================================================
(Still outputting to the console)
---------------------------------
 Objects are used to group related data and functions together. For example:
 ```
 var myComputer = {
   operatingSystem: 'mac',
   screenSize: '15 inches',
   purchaseYear: 2011
 };
 ```
To call the object, we just type myComputer and it will return:
```
Object {operatingSystem: 'mac', screenSize: '15 inches', purchaseYear: 2011}
```
If we want to find out ony one property of the object; type:
```
myComputer.operatingSystem
```
And it will return:
```
"mac"
```
An object with a function (i.e. a Method) as one of its properties
--------------------------------------------------
```
var beatriz = {
  name: 'Beatriz',
  sayName: function(){
    console.log(this.name);
  }
};
```
- The "this" word tells JS we are referring to the object inside which we wrote the code. In this example, "this" refers to the object named 'beatriz.'
- The dot notation is used to access the property of the object. In this example; ```this.name``` accesses the name property of the beatriz object.
- the property ```sayName``` is referred to a ```Method``` of the object.
- the function is not given a name - it is an ```Anonymous function```. It is called by calling the property name, or sayName, in our example.



Version 3 Requirements
----------------------
1. It should store the todos array on an object.
2. It should have a displayTodos method.
2. It should have an addTodo method.
3. It should have a changeTodo method.
4. It should have a deleteTodo method.


Version 3 Steps
---------------
1. Our To Do list started with an array made up of to do items. Now, we move this data to an object by doing the following:
```
var todoList = {
  todos: ['item1', 'item2', 'item3']
};
```

2. We keep adding to our todoList object:
```
var todoList = {
  todos: ['item1', 'item2', 'item3'],
  displayTodos: function(){
    console.log("My Todos:", this.todos);
  }
};
```
  - Note that the "recipe" or the code inside the {} brackets, calls the displayTodos() function already defined in Step 1.
  - To add the todo, call the function and give it a new todo inside the (). For instance, the code just below adds a new todo and then it displays the todos array.
  ```
  addTodos("My new todo")
  ```
  
3. We keep adding to our todoList object until all requirements are met:
```
var todoList = {
  todos: ['item1', 'item2', 'item3'],
  displayTodos: function(){
    console.log("My Todos:", this.todos)
  },
  addTodo: function(todo){
    this.todos.push(todo);
    this.displayTodos();
  },
  changeTodo: function(position, newValue){
    this.todos[position] = newValue;
    this.displayTodos();
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
    this.displayTodos();
  }
};
```




Version 2: Functions (Still in the Console)
================================
"Functions are like recipes." 

Version 2 Requirements
----------------------
1. It should have a function to display todos.
2. It should have a function to add todos.
3. It should have a function to change todos.
4. It should have a function to delete todos.


Version 2 Steps
---------------
1. Function to display the todos:
```
function displayTodos() {
    console.log("My todos:", todos);
}
```
2. Function to add new todos:
```
function addTodos(todo) {
    todos.push(todo);
    displayTodos();
}
```
  - Note that the "recipe" or the code inside the {} brackets, calls the displayTodos() function already defined in Step 1.
  - To add the todo, call the function and give it a new todo inside the (). For instance, the code just below adds a new todo and then it displays the todos array.
  ```
  addTodos("My new todo")
  ```
  
3. Function to change a todo:
```
function changeTodo(position, newValue){
  todos[position] = newValue;
  displayTodos();
}
```
4. Function to delete a todo:
```
function deleteTodo(position){
  todos.splice(position, 1);
  displayTodos();
}
```


Version 1: Arrays (Coding in the Console)
========================================

Version 1 Requirements
----------------------
1. It should have a place to store todos.
2. It should have a way to display todos.
3. It should have a way to add new todos.
4. It should have a way to change a todo.


Version 1 Steps
---------------
1. An array was created in the console that stored the todos.
   - var todos = ['item1', 'item2', 'item3']
2. console.log() was used to display the todos in the console.
   - console log("My todos: ", todos);
3. todos.push() was used to add a new todo to the end of the array.
   - todos.push('item4');
4. To change a todo item inside the todos array, we need to understand indices. 
   - Computers start counting at index 0 to refer to the first item, index 1 to refer to the 2nd item, and so on.
   - todos[0] = "item1 changed"
   - The above syntax changes the 1st item from item1 to item1 changed.
5. To delete a todo from the array, we use the method called splice()
   - Splice takes 2 arguments: .splice(index position, number of items). 
   - todos.splice(0, 1)
   - The above syntax deletes the item at position 0, i.e. the 1st item and deletes only that one item.

Your Project
------------

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env`

On the front-end,
- edit `public/client.js`, `public/style.css` and `views/index.html`
- drag in `assets`, like images or music, to add them to your project


Made by Fog Creek
-----------------

\ ゜o゜)ノ
