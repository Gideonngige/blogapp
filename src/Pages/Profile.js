import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from './Config/Env';
import Swal from "sweetalert2";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profile_image: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProfile({
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      phone: localStorage.getItem("phone") || "",
      profile_image: localStorage.getItem("profile_image") || "",
    });
  }, []);

  // Select Image From Device
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file)); // local preview
  };

  // Save Profile Changes
  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("phone_number", profile.phone);
    formData.append("user_id", user_id);

    if (selectedFile) {
      formData.append("profile_image", selectedFile);
    }

    try {
      const response = await fetch(
        `${API_URL}/update_user_profile/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully");
        // use sweetalert2 to show success
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
        });

        // Update localStorage with new data
        localStorage.setItem("name", data.name);
        localStorage.setItem("phone", data.phone);
        localStorage.setItem("profile_image", data.profile_image);

        setProfile((prev) => ({
          ...prev,
          profile_image: data.profile_image,
        }));
      } else {
        setMessage(data.message || "Update failed");
        // use sweetalert2 to show error
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: data.message || 'There was an error updating your profile. Please try again later.',
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage("An error occurred");
      // use sweetalert2 to show error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    // use sweetalert2 to show confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://myblogbackend-phgi.onrender.com/delete-account/${user_id}/`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.ok) {
            localStorage.clear();
            navigate("/signup");
            // use sweetalert2 to show success
            Swal.fire(
              'Deleted!',
              'Your account has been deleted.',
              'success'
            );
          } else {
            setMessage("Failed to delete account");
            // use sweetalert2 to show error
            Swal.fire({
              icon: 'error',
              title: 'Deletion Failed',
              text: 'Failed to delete your account. Please try again later.',
            });
          }
        } catch (e) {
          console.error(e);
          setMessage("An error occurred");
          // use sweetalert2 to show error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please try again later.',
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
        <hr className="mb-8" />

        {message && (
          <p className="text-center text-sm text-green-600 mb-4">{message}</p>
        )}

        {/* Profile Image Section */}
        <div className="flex justify-center mb-6">
          <label className="cursor-pointer">
            <img
              src={
                previewImage ||
                `${API_URL}${profile.profile_image}` ||
                "https://via.placeholder.com/120"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={profile.email}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              placeholder="Phone number"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-4">
          <button
            onClick={handleSaveChanges}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
          >
            Logout
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
