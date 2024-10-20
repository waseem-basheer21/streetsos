import "./signUp.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // Define state variables to handle form input values
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState(""); // For success message
  const [loading, setLoading] = useState(false); // For loading state

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission

    let valid = true;
    let newErrors = { name: "", email: "", password: "" };

    // Validate Name
    if (name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Validate Email
    if (email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    // Validate Password
    if (password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setLoading(true); // Start loading
      try {
        // Send POST request to the backend
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          const { id } = data;

          // Dispatch the setUserId action to store userId in Redux
          dispatch(setUserId(id));
          // Handle success
          setSuccessMessage("User registered successfully!");
          setName("");
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        } else {
          // Handle error from server
          setErrors({ ...errors, form: data.message || "Registration failed" });
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setErrors({
          ...errors,
          form: "Something went wrong, please try again.",
        });
      } finally {
        setLoading(false); // End loading
      }
    }
  };

  return (
    <div className="mainContainer">
      <div className="detailContainer">
        <h1 className="">Sign Up</h1>
        <form className="formContainer" onSubmit={handleSubmit}>
          <div className="nameDiv">
            <label htmlFor="username" className="labelText">
              Name
            </label>
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="errorText">{errors.name}</p>}
          </div>
          <div className="emailDiv">
            <label htmlFor="username">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="errorText">{errors.email}</p>}
          </div>
          <div className="passwordDiv">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="errorText">{errors.password}</p>}
          </div>

          {/* Display error message if any */}
          {errors.form && <p className="errorText">{errors.form}</p>}

          {/* Display success message */}
          {successMessage && <p className="successText">{successMessage}</p>}

          <button type="submit" className="submitButton" disabled={loading}>
            {loading ? "Registering..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
