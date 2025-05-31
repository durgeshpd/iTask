import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, addTask, deleteTask } from "../redux/taskSlice";
import axios from "axios";

const TaskManagement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/tasks", {
          withCredentials: true,
        });
        dispatch(setTasks(response.data));
      } catch (error) {
        console.error("Error fetching tasks", error);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleAddTask = async () => {
    if (!title || !description) return;

    const newTask = {
      title,
      description,
      status,
      priority,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        newTask,
        { withCredentials: true }
      );
      dispatch(addTask(response.data));
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("normal");
    } catch (error) {
      console.error("Error adding task", error);
      setError("Failed to add task. Please try again later.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
          withCredentials: true,
        });
        dispatch(deleteTask(taskId));
      } catch (error) {
        console.error("Error deleting task", error);
        setError("Failed to delete task. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 transition-colors duration-300">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-base-content">
        Task Management
      </h2>

      {loading && <p className="text-center text-blue-500">Loading tasks...</p>}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="bg-base-200 p-6 rounded-lg shadow mb-8 space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-3 border border-base-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-3 border border-base-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
             className="w-full p-3 border border-base-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base-content bg-base-100"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
             className="w-full p-3 border border-base-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base-content bg-base-100"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          onClick={handleAddTask}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          disabled={!title || !description}
        >
          Add Task
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-base-content mb-4">My Tasks</h3>
        {tasks && tasks.length === 0 ? (
          <p className="text-base-content/60">No tasks available.</p>
        ) : (
          tasks?.map((task) => (
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
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg self-start md:self-center"
              >
                Delete Task
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
