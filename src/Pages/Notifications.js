import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell } from 'lucide-react';
import { API_URL } from './Config/Env';
import Swal from "sweetalert2";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('user_id');

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/get_user_notifications/${userId}/`);
      setNotifications(response.data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // use sweetalert2 to show error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load notifications. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notifId) => {
    try {
      await axios.get(`${API_URL}/mark_notification_as_read/${notifId}/`);
      // Refresh notifications after marking as read
      fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
      // use sweetalert2 to show error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to mark notification as read. Please try again later.',
      });
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please sign in to view notifications.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Bell className="h-6 w-6 text-blue-600" /> Notifications
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">You have no notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`p-4 rounded-xl shadow-sm border ${
                  notif.is_read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-100'
                }`}
              >
                <p className="text-gray-800">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notif.created_at).toLocaleString()}
                </p>

                {!notif.is_read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
