import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState(""); // For success message
  const [loading, setLoading] = useState(false); // For loading state

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { email: "", password: "" };

    // Validate email
    if (email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    // Validate password
    if (password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setLoading(true); // Start loading
      try {
        console.log(email, password);
        // Send POST request to the backend
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          const { userId } = data;

          // Dispatch the setUserId action to store userId in Redux
          dispatch(setUserId(userId));

          // Set success message
          setSuccessMessage("Login successful!");
          setEmail(""); // Clear email input
          setPassword(""); // Clear password input
          navigate("/dashboard");
        } else {
          // Handle error from server
          setErrors({ ...errors, form: data.message || "Login failed" });
        }
      } catch (error) {
        console.error("Error during login:", error);
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
    <div className="loginContainer">
      <div className="formWrapper">
        <h1 className="loginTitle">Login</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="inputField">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="errorText">{errors.email}</p>}
          </div>
          <div className="inputField">
            <label htmlFor="password">Password</label>
            <div className="passwordWrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="togglePasswordIcon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="errorText">{errors.password}</p>}
          </div>
          {/* Display error message if any */}
          {errors.form && <p className="errorText">{errors.form}</p>}
          {/* Display success message */}
          {successMessage && <p className="successText">{successMessage}</p>}
          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
