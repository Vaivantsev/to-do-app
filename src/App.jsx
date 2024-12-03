import { Component, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// Component
function App() {
  // состояние
  // setCount - метод для изменения состояния count
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("Valera");
  const [thing, setThing] = useState("");
  const [redactID, setRedactID] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [tasks, setTasks] = useState([
    // каждое дело это объект. Text это ключ, а справо от него значение
    // {
    //   text: "go to gym",
    // },
    // {
    //   text: "dinner",
    // },
    // {
    //   text: "take a shower",
    // },
    // {
    //   text: "go to sleep",
    // },
  ]);

  function completeTask(index) {
    let nextCompleted = [...completed];
    if (nextCompleted.includes(index)) {
      nextCompleted.splice(nextCompleted.indexOf(index), 1);
    } else {
      nextCompleted.push(index);
    }
    // с помощью метода setCompleted меняется состояние completed
    setCompleted(nextCompleted);
  }

  function removeTask(index) {
    let nextTasks = [...tasks];
    nextTasks.splice(index, 1);
    setTasks(nextTasks);
  }

  function redactTask(index) {
    setRedactID(index);
  }

  function finishRedact() {
    setRedactID(null);
  }

  function addTask(event) {
    event.preventDefault()
    if (thing != "") {
      // c помощью оператора ... все элементы масива tasks копируются в nextTasks
      let nextTasks = [...tasks];
      nextTasks.push({
        text: thing,
      });
      setTasks(nextTasks);
      setThing("");
    }
  }

  function renameTask(event) {
    let nextTasks = [...tasks];
    console.log(nextTasks[redactID].text);
    nextTasks[redactID].text = event.target.value;
    setTasks(nextTasks);
  }
  function deleteTask(event) {
    let nextTasks = [];

    setTasks(nextTasks);
  }

  return (
    <div className="App">
      <div className="toDoApp">
        <h1>ToDo App </h1>
        <ul>
          {tasks.map((element, index) => {
            return (
              <li>
                {redactID == index ? (
                  <input
                    value={element.text}
                    onChange={(event) => renameTask(event)}
                    type="text"
                  />
                ) : (
                  <p onClick={() => completeTask(index)}>
                    {index + 1}. {element.text}
                    {completed.includes(index) ? "🟢" : "🔘"}
                  </p>
                )}
                <div className="listButtons">
                  {redactID == index ? (
                    <button onClick={() => finishRedact(index)}>✅</button>
                  ) : (
                    <button onClick={() => redactTask(index)}>🖋️</button>
                  )}
                  <button onClick={(event) => removeTask(index)}>🗑️</button>
                </div>
              </li>
            );
          })}
        </ul>
        <form className="row" action="">
          <input
            type="text"
            value={thing}
            onChange={(event) => setThing(event.target.value)}
          />
          <button type="submit" onClick={(event) => addTask(event)}>
            📌
          </button>
          <button onClick={(event) => deleteTask(event)}>💣</button>
        </form>
      </div>
    </div>
  );
}

export default App;
// дела:
// не добовлять дело если пустой input
