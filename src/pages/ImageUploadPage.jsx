import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import useParams to get the grievanceId from the URL
import "./ImageUploadPage.css"; // Import CSS for styles

const ImageUploadPage = () => {
  const { grievanceId } = useParams(); // Extract grievanceId from URL parameters
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF).");
        setSelectedFile(null);
        setImagePreview(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5 MB limit
        alert("File size exceeds 5 MB. Please upload a smaller file.");
        setSelectedFile(null);
        setImagePreview(null);
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", selectedFile); // Append the selected file (image)
      formData.append("id", grievanceId); // Append the grievance ID

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setUploadStatus("Image uploaded successfully!");

        setImagePreview(null); // Reset image preview
        alert("Image uploaded successfully!");
        navigate("/dashboard");
      } else {
        setUploadStatus("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="imageUploadContainer">
      <h1>Upload an Image for Your Grievance</h1>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="imagePreview" />
        )}
        <button
          type="submit"
          disabled={loading}
          className={loading ? "loading" : ""}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
      {uploadStatus && (
        <p
          className={`uploadStatus ${
            uploadStatus.includes("success") ? "success" : "error"
          }`}
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default ImageUploadPage;
