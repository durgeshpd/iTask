import { useSelector } from "react-redux";
import { useState } from "react";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <div className="p-6 text-center text-gray-500">User not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-base-200 shadow-lg rounded-xl p-8">
        {!isEditing ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-content">Profile</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-sm btn-outline btn-primary"
              >
                Edit Profile
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-base-content/80 text-sm">First Name</label>
                <p className="text-lg font-medium text-base-content">{user.firstName}</p>
              </div>
              <div>
                <label className="block text-base-content/80 text-sm">Last Name</label>
                <p className="text-lg font-medium text-base-content">{user.lastName}</p>
              </div>
              <div>
                <label className="block text-base-content/80 text-sm">Email</label>
                <p className="text-lg font-medium text-base-content">{user.emailId}</p>
              </div>
            </div>
          </>
        ) : (
          <EditProfile user={user} onCancel={() => setIsEditing(false)} />
        )}
      </div>
    </div>
  );
};

export default Profile;
