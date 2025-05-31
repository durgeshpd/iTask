import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTasks, addTask, deleteTask, updateTask } from "../redux/taskSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks) || [];
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "normal",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValues, setEditValues] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "normal",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tasks`, {
          withCredentials: true,
        });
        dispatch(setTasks(res.data));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleAddTask = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/tasks`, newTask, {
        withCredentials: true,
      });
      dispatch(addTask(res.data));
      setNewTask({
        title: "",
        description: "",
        status: "pending",
        priority: "normal",
      });
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`, { withCredentials: true });
      dispatch(deleteTask(id));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/tasks/${id}`, editValues, {
        withCredentials: true,
      });
      dispatch(updateTask(res.data));
      setEditingTaskId(null);
      setEditValues({
        title: "",
        description: "",
        status: "pending",
        priority: "normal",
      });
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-base-content">
        Task Manager
      </h2>

      <div className="bg-base-200 p-6 rounded-lg shadow-md mb-8 space-y-4">
        <h3 className="text-2xl text-base-content">Add New Task</h3>
        <div>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            placeholder="Task Title"
            className="w-full p-3 border border-base-300 rounded-lg shadow-sm"
          />
          <textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder="Task Description"
            className="w-full p-3 border border-base-300 rounded-lg shadow-sm mt-4 text-base-content"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="w-full p-3 border border-base-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-base-100 text-base-content"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full p-3 border border-base-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-base-100 text-base-content"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            onClick={handleAddTask}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-4 transition-colors"
            disabled={!newTask.title || !newTask.description}
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-base-content mb-4">Task List</h3>
        {tasks.length === 0 ? (
          <p className="text-base-content/60">No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="p-5 bg-base-100 shadow-md rounded-lg border border-base-300 flex flex-col md:flex-row justify-between gap-4"
            >
              <div>
                <h4 className="text-xl font-semibold text-base-content">
                  {task.title}
                </h4>
                <p className="text-base-content/70">{task.description}</p>
                <p className="text-sm text-base-content/50 mt-2">
                  <span className="font-medium">Status:</span> {task.status}
                </p>
                <p className="text-sm text-base-content/50">
                  <span className="font-medium">Priority:</span> {task.priority}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingTaskId(task._id)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
