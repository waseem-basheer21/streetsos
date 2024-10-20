import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./verifyGrievance.css"; // Make sure to create this CSS file

export default function VerifyGrievance() {
  const location = useLocation();
  const navigate = useNavigate();
  const grievance = location.state;

  const [message, setMessage] = useState(""); // State for verification message
  const [isVerified, setIsVerified] = useState(false); // State for toggle button

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificationData = {
      verify: isVerified,
      message: message,
      id: grievance._id, // Assuming grievance has an id property
    };

    try {
      console.log(verificationData);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/verifyComplaint`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificationData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Grievance verified successfully!");

        // Navigate back to AdminAllGrievances with the ID of the verified grievance
        navigate("/admin-allgrievances", {
          state: { verifiedId: grievance._id },
        });
      } else {
        alert(data.message || "Failed to verify grievance");
      }
    } catch (err) {
      console.error("Error verifying grievance:", err);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="verifyGrievanceContainer">
      <div className="grievanceCard">
        <img src={grievance.url} alt="" />
        <h3>{grievance.complaint}</h3>
        <h3>{grievance.description}</h3>
        <p>
          <strong>Latitude:</strong> {grievance.location.coordinates[0]}
        </p>
        <p>
          <strong>Longitude:</strong> {grievance.location.coordinates[1]}
        </p>
        <p>
          <strong>Address:</strong> {grievance.address}
        </p>
      </div>

      <form className="verificationForm" onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          required
        />

        <div className="toggleContainer">
          <label>
            <input
              type="checkbox"
              checked={isVerified}
              onChange={() => setIsVerified((prev) => !prev)}
            />
            Verify Grievance
          </label>
        </div>

        <button type="submit">Submit Verification</button>
      </form>
    </div>
  );
}
