import { useState } from "react";

export default function Task({ onAddTask, project, onDeleteTask }) {
  const [taskInput, setTaskInput] = useState("");

  function handleInput(event) {
    setTaskInput(event.target.value);
  }

  function addTask() {
    if (taskInput.trim() !== "") {
      onAddTask(taskInput);
      setTaskInput("");
    }
  }
  

  return (
    <div>
      <div className="flex items-center gap-4">
        <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" value={taskInput} onChange={handleInput} required/>
        <button onClick={addTask} className="text-stone-700 hover:text-stone-950" >+ Add task</button>
      </div>
      {project.tasks && project.tasks.length === 0 && (
        <p className="my-4 text-stone-800">This project does not have any task yet...</p>
      )}
      {project.tasks && project.tasks.length > 0 && (
      <ul className="p-4 mt-8 rounded-md bg-stone-100">
        {project.tasks.map((task) => {
          return <li key={task.id} className="flex justify-between my-4"> <span>{task.task}</span><button onClick={() => onDeleteTask(task.id)} className="text-stone-700 hover:text-red-600">Clear</button></li>; // Added key for list items
        })}
      </ul>
      )}
    </div>
  );
}
