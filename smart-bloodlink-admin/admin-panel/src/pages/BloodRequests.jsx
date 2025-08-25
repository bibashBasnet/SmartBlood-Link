import { useEffect, useState } from "react";
import { getRequest, postDelivery, putRequest } from "../api/axios";

export default function BloodRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const data = await getRequest("/requests");

    console.log("Fetched data:", data);
    data.forEach((r, i) =>
      console.log(`Request[${i}] fresh:`, r.fresh, "Type:", typeof r.fresh)
    );

    const filteredData = data.filter(
      (r) => r.fresh === false && r.status.toLowerCase() === "pending"
    );
    setRequests(filteredData);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await putRequest(`/requests/${id}/${action}`, {});
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== id)
      );
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <div className="page-content">
      <h2>Blood Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Requester Name</th>
            <th>Blood Type</th>
            <th>Hospital</th>
            <th>Request Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.type}</td>
              <td>{r.hospital}</td>
              <td>{new Date(r.time).toLocaleString()}</td>
              <td>{r.status}</td>
              <td>
                {r.status.toLowerCase() === "pending" ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px", // space between buttons
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="verify-btn"
                      onClick={() => handleAction(r.id, "approve")}
                    >
                      Approve
                    </button>{" "}
                    <button
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "#fff",
                        borderRadius: "5px",
                        padding: "8px 15px",
                        fontWeight: "600",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAction(r.id, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
