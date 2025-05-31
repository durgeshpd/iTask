import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/themeSlice";

const themes = ["light", "dark", "cupcake", "synthwave"];

const Settings = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);

  const handleThemeChange = (e) => {
    dispatch(setTheme(e.target.value));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-base-100 text-base-content rounded-box shadow">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Choose Theme</span>
        </label>
        <select
          value={currentTheme}
          onChange={handleThemeChange}
          className="select select-bordered"
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Settings;
