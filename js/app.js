function clock() {
    var fullDate = new Date();
    var hours = fullDate.getHours();
    var minutes = fullDate.getMinutes();
    var seconds = fullDate.getSeconds();

    if (hours < 12) {
        document.getElementById("am-pm").innerHTML = "AM"
    } else {
        document.getElementById("am-pm").innerHTML = "PM"
    }

    if (hours === 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minute").innerHTML = ":" + minutes;
    document.getElementById("second").innerHTML = ":" + seconds;
}

setInterval(clock, 100);

var todoList = {
    todos: [],
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    showTodo: function () {
        if (this.todos.length > 0) {
            var todoListDiv = document.getElementById("ul");
            todoListDiv.classList.remove("hidden");
        }
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function () {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Get number of completed todos.
        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        this.todos.forEach(function (todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    }
};

var handlers = {
    addTodo: function () {
        var addTodoTextInput = document.getElementById("add-todo-text-input");

        var addTodoForm = document.getElementById("add-todo-form");

        addTodoForm.removeAttribute("novalidate");

        if (!addTodoTextInput.checkValidity()) {
            console.log("invalid")
        } else {
            todoList.addTodo(addTodoTextInput.value);

            addTodoForm.reset();

            addTodoForm.setAttribute("novalidate", "");

            view.displayTodos();       
        }
    },
    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function (position) {
        var toggleCompletedPositionInput = position;
        todoList.toggleCompleted(toggleCompletedPositionInput);
        toggleCompletedPositionInput.value = "";
        view.displayTodos();
    },
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    },
    showTodoList: function () {
        todoList.showTodo();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function () {
        var todosUl = document.querySelector("ul");
        todosUl.innerHTML = "";
        var list = document.getElementById("todo-list");
        var label = document.getElementById('todo-label');

        if (todoList.todos.length > 0) {
            list.classList.add("visibility");
            label.style.opacity = '0';                
        } else {          
            list.classList.remove("visibility");
            label.style.opacity = '1';               
        }

        todoList.todos.forEach(function (todo, position) {
            var todoDiv = document.createElement("div");
            var todoLi = document.createElement("li");
            var todoInput = document.createElement("input");
            todoInput.setAttribute("type", "text");
            todoInput.className = "todo-input";
            var todoSpan = document.createElement("span");
            todoSpan.textContent = "";
            var todoTextWithCompletion = "";

            if (todo.completed === true) {
                todoTextWithCompletion = todo.todoText;
                todoLi.classList.add("fade");
            } else {
                todoTextWithCompletion = todo.todoText;
            }

            todoLi.id = position;

            todoInput.value = todoTextWithCompletion;

            todoDiv.appendChild(this.createDeleteButton());
            todoDiv.appendChild(this.createToggleButton());          
            todoLi.appendChild(todoSpan);
            todoLi.appendChild(todoInput);
            todoLi.appendChild(todoDiv);
            todosUl.appendChild(todoLi);
            todosUl.scrollTop = todosUl.scrollHeight;
        }, this)
    },
    createDeleteButton: function () {
        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-button fa fa-trash-o";
        return deleteButton;
    },
    createToggleButton: function () {
        var toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle";
        toggleButton.className = "toggle-button";
        return toggleButton;
    },
    setUpEventListeners: function () {
        var todosUl = document.querySelector("ul");

        todosUl.addEventListener("click", function (event) {

            var elementClicked = event.target;

            if (elementClicked.className === "delete-button fa fa-trash-o") {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.parentNode.id));
            }

            if (elementClicked.className === "toggle-button") {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.parentNode.id));
            }

            if (elementClicked.className === "todo-input") {

                var index = elementClicked.parentNode.id;
                var todoInput = todosUl.getElementsByTagName("input")[index];

                todosUl.addEventListener("keyup", function () {
                    todoList.changeTodo(index, todoInput.value);
                });

            }              
        });
        
        var todoForm = document.getElementById("add-todo-form");
       
        todoForm.onsubmit = function(e) {          
            handlers.addTodo();
            e.preventDefault();
            return false;
        }; 
    }
};

view.setUpEventListeners();

(function () {
    var widgetIframe = document.getElementById("sc-widget"),
        widget = SC.Widget(widgetIframe);

    widget.bind(SC.Widget.Events.READY, function () {
        widget.bind(SC.Widget.Events.PLAY, function () {

        });
        
        widget.bind(SC.Widget.Events.FINISH, function () {
            forwardSwipe();
        });
        // get current level of volume
        widget.getVolume(function (volume) {

        });
        // set new volume level
        widget.setVolume(50);
        // get the value of the current position     
    });

    document.getElementById("toggle-play").addEventListener("click", function () {
        widget.getCurrentSound(function (currentSound) {
            var songName = document.getElementById("song-name");
            widget.isPaused(function (response) {
                if (response === true) {
                    songName.textContent = "Paused: " + currentSound.title;
                } else {
                    songName.textContent = "Streaming: " + currentSound.title;
                    console.log(currentSound);
                }
            });

        });

        var state = this.className;
        if (state == "toggle-play play") {
            widget.play();
            this.className = "toggle-play pause";
        } else {
            widget.pause();
            this.className = "toggle-play play";
        }
    });

    document.getElementById("volume-icon").addEventListener("click", function () {
        var mute = 0;
        var volume = document.getElementById("volume");
        var volumeNum = document.getElementById("volume-number");
        var volumeIcon = document.getElementById("volume-icon");

        if (volume.value > 0) {
            volume.value = mute;
            volumeNum.textContent = volume.value;
            widget.setVolume(volume.value);
            volumeIcon.className = "volume-icon low";
        } else if (volume.value < 1) {
            volume.value = 50;
            volumeNum.textContent = volume.value;
            widget.setVolume(volume.value);
            volumeIcon.className = "volume-icon med";
        }
    });

    document.getElementById("volume").addEventListener("mousemove", function () {
        var volumeNum = document.getElementById("volume-number");
        var volumeIcon = document.getElementById("volume-icon");
        volumeNum.textContent = volume.value;
        widget.setVolume(volume.value);

        if (volume.value < 1) {
            volumeIcon.className = "volume-icon low";
        } else if (volume.value < 51) {
            volumeIcon.className = "volume-icon med";
        } else {
            volumeIcon.className = "volume-icon high";
        }

    });
    
    document.getElementById("volume").addEventListener("touchmove", function() {
        var volumeNum = document.getElementById("volume-number");
        var volumeIcon = document.getElementById("volume-icon");
        volumeNum.textContent = volume.value;
        widget.setVolume(volume.value);

        if (volume.value < 1) {
            volumeIcon.className = "volume-icon low";
        } else if (volume.value < 51) {
            volumeIcon.className = "volume-icon med";
        } else {
            volumeIcon.className = "volume-icon high";
        }

    });

    document.getElementById("previous-button").addEventListener("click", function() {
        widget.prev();
        widget.getCurrentSound(function (currentSound) {
            var songName = document.getElementById("song-name");
            var togglePlay = document.getElementById("toggle-play");
            widget.isPaused(function (response) {
                if (response === true) {
                    songName.textContent = "Paused: " + currentSound.title;
                    togglePlay.className = "toggle-play play"
                } else {
                    songName.textContent = "Streaming: " + currentSound.title;
                    togglePlay.className = "toggle-play pause"
                }
            });          
        });
        backwardSwipe();
    });

    document.getElementById("next-button").addEventListener("click", function () {
        widget.next();
        widget.getCurrentSound(function (currentSound) {
            var songName = document.getElementById("song-name");
            var togglePlay = document.getElementById("toggle-play");

            widget.isPaused(function (response) {
                if (response === true) {
                    songName.textContent = "Paused: " + currentSound.title;
                    togglePlay.className = "toggle-play play"
                } else {
                    songName.textContent = "Streaming: " + currentSound.title;
                    togglePlay.className = "toggle-play pause"
                }
            });
        });
        forwardSwipe();
    });
}());