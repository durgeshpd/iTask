import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskManagement from "./components/TaskManagement";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

const AppWithTheme = () => {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/taskList" element={<TaskList />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppWithTheme />
      </Router>
    </Provider>
  );
}

export default App;
