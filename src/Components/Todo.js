import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoAction } from "../toolkit/todoSlice";
import "./Todo.css";
function Todo() {
  const [todoText, setTodoText] = useState("");
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleTodoInput = (e) => {
    setTodoText(e.target.value);
  };

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(todoAction.addTodo(todoText));
      setTodoText("");
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(todoAction.deleteTodo(id));
  };
  const handleDelAllTodo = (id) => {
    dispatch(todoAction.clearAllTodo(id));
  };
  return (
    <>
      <header className="header">
        <h1>Welcome to The Todix.com</h1>
      </header>
      <div className="todo-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a new todo"
            className="todo-input"
            value={todoText}
            onChange={handleTodoInput}
          />
          <button className="add-todo-button" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {todo.text}
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="delete-todo-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button className="delete-All-todo" onClick={handleDelAllTodo}>
          Clear All Todos
        </button>
      </div>
    </>
  );
}

export default Todo;
