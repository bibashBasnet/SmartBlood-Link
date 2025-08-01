// Users.jsx
import { useEffect, useState } from "react";
import { getRequest, putRequest } from "../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getRequest("/users/userType/0");
      const mapped = data.map((user) => ({
        ...user,
        id: user._id || user.id,
      }));
      setUsers(mapped);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (id) => {
    try {
      await putRequest(`/users/${id}/verify`, {});
      fetchUsers();
    } catch (err) {
      console.error("Error verifying user:", err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`http://localhost:8080/api/users/${id}`, {
          method: "DELETE",
        });
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="page-content">
      <h2>Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood Type</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.bloodType}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.verified ? "Yes" : "No"}</td>
                <td>
                  {!user.verified && (
                    <button
                      onClick={() => verifyUser(user.id)}
                      style={{
                        backgroundColor: "#2ecc71",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Verify
                    </button>
                  )}

                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
