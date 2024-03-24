import React, { useState, useEffect } from "react";
import { Styler } from "./Styler";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState(""); // New state for description
  const [editIndex, setEditIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [todoDescription, setTodoDescription] = useState([]);

  useEffect(() => {
    Styler();
  }, [todos, editIndex]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        text: inputValue,
        description: descriptionValue,
        priority: priority,
        timeAdded: new Date().toLocaleString(),
      };
      // Use unshift() instead of push() to add the new todo item to the beginning of the array
      setTodos([newTodo, ...todos]);
      saveTodosToLocalStorage([newTodo, ...todos]);
      setInputValue("");
      setDescriptionValue("");
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    saveTodosToLocalStorage(newTodos);
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditedValue(todos[index].text);
    setEditedDescription(todos[index].description); // Set description value
    Styler();
  };

  const updateTodo = () => {
    const newTodos = [...todos];
    newTodos[editIndex].text = editedValue;
    newTodos[editIndex].description = editedDescription; // Update description with editedDescription
    setTodos(newTodos);
    saveTodosToLocalStorage(newTodos);
    setEditIndex(null);
    setEditedValue("");
    setEditedDescription(""); // Reset editedDescription
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragEnter = (e, targetIndex) => {
    e.preventDefault();
    setDragOverIndex(targetIndex);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (draggedIndex !== targetIndex) {
      const newTodos = [...todos];
      const draggedTodo = newTodos[draggedIndex];
      newTodos.splice(draggedIndex, 1);
      newTodos.splice(targetIndex, 0, draggedTodo);
      setTodos(newTodos);
      saveTodosToLocalStorage(newTodos);
    }
    setDragOverIndex(null);
  };

  const priorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return {
          tc: "tc-[danger-500]",
          bg: "bg-[danger-600]",
        };
      case "Medium":
        return {
          tc: "tc-[warning-500]",
          bg: "bg-[warning-600]",
        };
      case "Low":
        return {
          tc: "tc-[success-500]",
          bg: "bg-[success-600]",
        };
      default:
        return { tc: "", bg: "" };
    }
  };

  return (
    <>
      <header>
        <h1 className="logo">TodoList </h1>
        <p>Start doing something </p>
      </header>
      <div className="mt-1rem">
        <div className="w-100%">
          <div>
            <input
              className="ol-none bg-none w-100% bw-0px bs-solid bw-bottom-1px bc-[primary-700] fs-1.4rem fw-700 pb-8px tc-inherit"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter todo..."
            />
            <input
              className="ol-none bg-none w-100% bw-0px bs-solid bw-bottom-1px bc-[primary-700] tc-[primary-200] pv-8px"
              type="text"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              placeholder="Enter description..."
            />
          </div>

          <div className="display-flex gap-1rem ai-center jc-end mt-1rem">
            <select onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <div className="bg-[primary-700] w-1px h-20px br-2rem"></div>
            <button className="btn fs-14px gap-4px" onClick={addTodo}>
              Add
              <span className="ms-round fs-inherit">add</span>
            </button>
          </div>
        </div>
      </div>
      {/* Todo wrapper */}
      <div className="display-flex gap-1rem mt-1rem fx-wrap-wrap ai-stretch jc-center">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`todo-item ${
              dragOverIndex === index ? "drag-over" : ""
            }`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDrop={(e) => handleDrop(e, index)}
          >
            {editIndex === index ? (
              <>
                <div className="center fd-column jc-[sb] gap-1rem w-100%">
                  <div className="w-100%">
                    <input
                      className="edit-input w-100%"
                      type="text"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      placeholder="Enter title..."
                    />
                    <input
                      className="bg-none fs-1rem fw-400 bw-1px bs-solid bw-0 bw-bottom-1px bc-[primary-600] tc-[primary-200] ol-none w-100% pb-8px"
                      type="text"
                      value={editedDescription} // Use editedDescription here instead of descriptionValue
                      onChange={(e) => setEditedDescription(e.target.value)} // Add onChange handler for editedDescription
                      placeholder="Enter description..."
                    />
                  </div>
                </div>
                <div className="display-flex gap-1rem ai-center jc-end">
                  <button className="icon" onClick={updateTodo}>
                    <span className="ms-round fs-inherit">save</span>
                  </button>
                  <button
                    className="icon"
                    onClick={() => {
                      setEditIndex(null);
                      setEditedValue("");
                      setDescriptionValue("");
                    }}
                  >
                    <span className="ms-round fs-inherit">close</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="center fd-row ai-start jc-[sb] gap-1rem w-100%">
                  <header>
                    <h2>{todo.text}</h2>
                    <p className="ta-justify mt-8px fs-14px">
                      {todo.description}
                    </p>
                  </header>
                </div>
                <div className="display-flex gap-1rem ai-center jc-end">
                  <div className="center gap-8px mr-auto">
                    <div
                      className={`${priorityStyle(todo.priority).tc} ${
                        priorityStyle(todo.priority).bg
                      } fs-12px p-4px br-4px center gap-4px`}
                    >
                      <span className="ms-round fs-14px">priority</span>{" "}
                      {todo.priority}
                    </div>
                    <p className=" fs-12px">{todo.timeAdded}</p>
                  </div>
                  <button className="icon" onClick={() => editTodo(index)}>
                    <span className="ms-round">edit</span>
                  </button>
                  <button className="icon" onClick={() => removeTodo(index)}>
                    <span className="ms-round">delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* Wrapper todo */}
    </>
  );
}

export default TodoList;
