import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./myGrievances.css";

const MyGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get userId from Redux
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/getAllcomplaints?id=${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setGrievances(data.data); // Set the grievances data from response
        } else {
          setError(data.message || "Failed to fetch grievances");
        }
      } catch (err) {
        setError("Something went wrong, please try again.", err);
      } finally {
        setLoading(false); // Set loading to false when request is complete
      }
    };

    // Fetch grievances when the component mounts
    if (userId) {
      fetchGrievances();
    }
  }, [userId]);

  return (
    <div className="myGrievancesContainer">
      <h1 className="title">My Grievances</h1>

      {loading && <p className="loadingText">Loading grievances...</p>}
      {error && <p className="errorText">{error}</p>}

      <div className="grievanceList">
        {grievances.length > 0 ? (
          grievances.map((grievance) => (
            <div key={grievance.id} className="grievanceCard">
              <h3 className="grievanceTitle">{grievance.description}</h3>
              <div className="grievanceCoordinates">
                <p>
                  <strong>Latitude:</strong> {grievance.location.coordinates[0]}
                </p>
                <p>
                  <strong>Longitude:</strong>{" "}
                  {grievance.location.coordinates[1]}
                </p>
              </div>
              {grievance.message && (
                <div className="grievanceRemarks">
                  <strong>Admin Remarks:</strong>
                  <p className="remarksMessage">{grievance.message}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="noGrievancesText">No grievances found.</p>
        )}
      </div>
    </div>
  );
};

export default MyGrievances;
