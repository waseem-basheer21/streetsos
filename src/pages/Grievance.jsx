import "./GrievancePage.css"; // Import the CSS
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGeolocation } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

const GrievancePage = () => {
  const [complaint, setComplaint] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ complaint: "" });
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const { latitude, longitude, error: geoError } = useGeolocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { complaint: "" };

    if (complaint.trim() === "") {
      newErrors.complaint = "Complaint description is required";
      valid = false;
    }

    if (!latitude || !longitude) {
      alert("Unable to get location. Please enable location services.");
      valid = false;
    }

    setErrors(newErrors);

    if (valid && latitude && longitude) {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/complaint`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              complaint,
              description,
              latitude,
              longitude,
              userId,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          const { id } = data;
          alert("Complaint submitted successfully!");
          navigate(`/upload/${id}`);
        } else {
          setErrors({ ...errors, form: data.message || "Submission failed" });
        }
      } catch (error) {
        console.error("Error during complaint submission:", error);
        setErrors({
          ...errors,
          form: "Something went wrong, please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="grievance-container">
        <h1 className="title">Submit a Grievance</h1>
        <form onSubmit={handleSubmit} className="grievance-form">
          <div className="input-field">
            <label htmlFor="complaint" className="label">
              Complaint Title
            </label>
            <textarea
              id="complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              rows="2"
              placeholder="Enter your complaint title here..."
              className="textarea"
            />
            {errors.complaint && (
              <p className="error-text">{errors.complaint}</p>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="description" className="label">
              Complaint Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Describe your complaint in detail..."
              className="textarea"
            />
          </div>

          <div className="location-info">
            {geoError ? (
              <p className="error-text">
                Error getting location: {geoError.message}
              </p>
            ) : (
              <p className="location-text">
                <span>Latitude: {latitude || "Loading..."}</span> |{" "}
                <span>Longitude: {longitude || "Loading..."}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${loading ? "loading" : ""}`}
            disabled={loading || !latitude || !longitude}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

          {errors.form && <p className="error-text">{errors.form}</p>}
        </form>
      </div>
    </div>
  );
};

export default GrievancePage;
