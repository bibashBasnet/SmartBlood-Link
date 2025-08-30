import { useEffect, useState } from "react";
import { getRequest, putRequest } from "../api/axios";

export default function DonationRequests() {
  const [donations, setDonations] = useState([]);

  // Fetch all donation requests from backend
  const fetchDonations = async () => {
    try {
      const data = await getRequest("/donations");

      // keep only pending or approved
      const pendingDonations = data.filter((d) => {
        const status = d.status?.toLowerCase();
        return status === "pending" || status === "approved";
      });

      setDonations(pendingDonations);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Handle approve/reject actions
  const handleAction = async (id, status) => {
    try {
      await putRequest(`/donations/${id}/status?status=${status}`, {});
      fetchDonations(); // Refresh list after update
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

  return (
    <div className="page-content">
      <h2>Donation Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Blood Group</th>
            <th>Age</th>
            <th>Last Donation Date</th>
            <th>Preferred Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.length === 0 ? (
            <tr>
              <td colSpan="7">No donation requests found.</td>
            </tr>
          ) : (
            donations.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.bloodGroup}</td>
                <td>{d.age}</td>
                <td>
                  {d.lastDonationDate
                    ? new Date(d.lastDonationDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {d.preferredDate
                    ? new Date(d.preferredDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{d.status}</td>
                <td>
                  {d.status.toLowerCase() === "pending" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <button
                        className="approve-btn"
                        onClick={() => handleAction(d.id, "Approved")}
                        style={{
                          backgroundColor: "#3ce74aff",
                          marginRight: "3px",
                        }}
                      >
                        Approve
                      </button>{" "}
                      <button
                        className="reject-btn"
                        onClick={() => handleAction(d.id, "Rejected")}
                        style={{
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          borderRadius: "5px",
                          padding: "8px 15px",
                          fontWeight: "600",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <button
                        className="approve-btn"
                        onClick={() => handleAction(d.id, "Done")}
                        style={{
                          backgroundColor: "#3ce74aff",
                          marginRight: "3px",
                        }}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
         
    </div>
  );
}
