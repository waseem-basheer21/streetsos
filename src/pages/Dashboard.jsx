import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const userId = useSelector((state) => state.user.userId); // Access userId from Redux

  return (
    <div className="dashContainer">
      <nav className="navbar">
        <Link to="/" className="logo">Street SOS</Link>
        <ul className="navLinks">
          <li>
            <Link to="/mygrievances">My Grievances</Link>
          </li>
          <li>
            <Link to="/grievance">Add Grievance</Link>
          </li>
        </ul>
      </nav>
      <div className="welcomeSection">
        {userId ? (
          <>
            <h2 className="welcomeTitle">Welcome Back!</h2>
            <p className="welcomeMessage">User ID: <strong>{userId}</strong></p>
            <p className="instruction">
              Here you can manage your grievances effectively. Select an option from the navigation above to get started!
            </p>
          </>
        ) : (
          <h2 className="welcomeTitle">Please Log In</h2>
        )}
      </div>
      <footer className="footer">
        <p>&copy; 2024 Street SOS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
