import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleMenu } from "../redux/appSlice";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../redux/userSlice";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login"); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleToggleMenu = () => {
    console.log("Hamburger menu clicked");
    dispatch(toggleMenu());
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      <div className="block">
        <button onClick={handleToggleMenu} className="btn btn-ghost text-xl text-base-content">
          <span className="material-icons">menu</span>
        </button>
      </div>

      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-base-content">
          iTASK
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-gray-300 text-base-content flex items-center justify-center text-xl">
                  {user.firstName?.charAt(0).toUpperCase()}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="text-base-content">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <span className="text-sm text-base-content">Welcome, {user.firstName}</span>
          </>
        ) : (
          <Link to="/login" className="btn btn-outline btn-sm text-base-content">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
