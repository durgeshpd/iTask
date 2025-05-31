import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../redux/userSlice";

const EditProfile = ({ user, onCancel }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setSuccess("Profile updated.");
      onCancel();
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={saveProfile} className="space-y-4">
      <h2 className="text-xl font-semibold text-base-content mb-4">Edit Profile</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <input
        type="text"
        value={firstName}
        placeholder="First Name"
        className="input input-bordered w-full bg-base-100 text-base-content"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        placeholder="Last Name"
        className="input input-bordered w-full bg-base-100 text-base-content"
        onChange={(e) => setLastName(e.target.value)}
      />
      <div className="flex gap-3 mt-4">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
