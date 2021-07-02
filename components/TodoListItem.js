/* eslint-disable @next/next/no-img-element */

export default function TodoListItem(props) {
  const editTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
  };

  const deleteTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
  };

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
  };

  console.log(props.tasks);
  console.log("list rendered");

  return (
    <>
      {props.tasks.length ? props.tasks.map((task) => {
        <li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
          <input
            id={`input-button-${task.id}`}
            type="text"
            className="hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
            placeholder="Edit The Task"
          />
          <div id={`done-button-${task.id}`} className="hideme">
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
              type="button"
              onClick={updateTask(task.id)}
            >
              Done
            </button>
          </div>
          <div id={`task-${task.id}`} className="todo-task  text-gray-600">
            {task.title}
          </div>
          <span id={`task-actions-${task.id}`} className="">
            <button
              style={{ marginRight: "5px" }}
              type="button"
              onClick={editTask(task.id)}
              className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2"
            >
              <img
                src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
                width="18px"
                height="20px"
                alt="Edit"
              />
            </button>
            <button
              type="button"
              className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
              onClick={deleteTask(task.id)}
            >
              <img
                src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
                width="18px"
                height="22px"
                alt="Delete"
              />
            </button>
          </span>
        </li>;
      }): ""}
    </>
  );
}
