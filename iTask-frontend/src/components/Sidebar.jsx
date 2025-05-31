import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div className="w-64 h-screen shadow-lg bg-base-200 p-4 flex flex-col">
      <ul className="text-sm space-y-2">
        <li>
          <Link to="/" className="flex items-center gap-3 p-2 rounded-md hover:bg-base-300">
            <span>🏠</span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="flex items-center gap-3 p-2 rounded-md hover:bg-base-300">
            <span>📝</span>
            <span>Task Management</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded-md hover:bg-base-300">
            <span>👤</span>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center gap-3 p-2 rounded-md hover:bg-base-300">
            <span>⚙️</span>
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
