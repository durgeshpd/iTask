import React from "react";
import { useSelector } from "react-redux";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks || []);

  const totalTasks = tasks.length;
  const completed = tasks.filter((task) => task.status === "completed").length;
  const inProgress = tasks.filter((task) => task.status === "in-progress").length;
  const pending = tasks.filter((task) => task.status === "pending").length;

  return (
    <div className="p-6 max-w-6xl mx-auto transition-colors duration-300">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-base-content">Dashboard</h1>
        <p className="text-base-content/70 mt-1">
          Welcome back! Here's an overview of your tasks.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-base-200 border border-base-300 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-500">Total</h2>
          <p className="text-2xl font-bold text-base-content">{totalTasks}</p>
        </div>
        <div className="bg-base-200 border border-base-300 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold text-green-500">Completed</h2>
          <p className="text-2xl font-bold text-base-content">{completed}</p>
        </div>
        <div className="bg-base-200 border border-base-300 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold text-yellow-500">In Progress</h2>
          <p className="text-2xl font-bold text-base-content">{inProgress}</p>
        </div>
        <div className="bg-base-200 border border-base-300 rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold text-red-500">Pending</h2>
          <p className="text-2xl font-bold text-base-content">{pending}</p>
        </div>
      </div>

      <TaskList />
    </div>
  );
};

export default Dashboard;
