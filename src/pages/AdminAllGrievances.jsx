import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./adminAllGrievances.css";

const AdminAllGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const verifiedId = location.state?.verifiedId; // Get the verified ID from location state

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/getAllcomplaints`
        );
        const data = await response.json();

        if (response.ok) {
          const grievancesData = data.data;

          // Change the color for the verified grievance
          if (verifiedId) {
            grievancesData.forEach((grievance) => {
              if (grievance._id === verifiedId) {
                grievance.verified = true; // Add a verified property
              }
            });
          }

          setGrievances(grievancesData);
        } else {
          setError(data.message || "Failed to fetch grievances");
        }
      } catch (err) {
        setError("Something went wrong, please try again.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, [verifiedId]); // Add verifiedId to the dependency array

  const handleNavigation = (grievance) => {
    navigate("/verify", { state: grievance });
  };
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Street SOS</div>
        <ul className="navLinks">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <div className="myGrievancesContainer">
        <h1 className="title">All Grievances</h1>

        {loading && <p>Loading grievances...</p>}
        {error && <p className="errorText">{error}</p>}

        <div className="grievanceList">
          {grievances.length > 0 ? (
            grievances.map((grievance) => (
              <div
                key={grievance._id} // Changed from grievance.id to grievance._id
                className={`grievanceCard ${
                  grievance.verified ? "verified" : ""
                }`} // Add conditional class for verified grievances
                onClick={() => handleNavigation(grievance)}
              >
                <h3>{grievance.complaint}</h3>
                <h3>{grievance.description}</h3>
                <p>
                  <strong>Latitude:</strong> {grievance.location.coordinates[0]}
                </p>
                <p>
                  <strong>Longitude:</strong>{" "}
                  {grievance.location.coordinates[1]}
                </p>
              </div>
            ))
          ) : (
            <p>No grievances found.</p>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 Street SOS. All rights reserved.</p>
        <ul className="footerLinks">
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms-of-service">Terms of Service</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default AdminAllGrievances;
