import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <nav className="navbar">
        <div className="logo">
          <Link to="/" className="navLink">
            Street SOS
          </Link>
        </div>
        <ul className="navLinks">
          <li>
            <Link to="/admin-login" className="navLink">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
      <div className="heroSection">
        <h1>Welcome to Street SOS</h1>
        <p>
          Report your grievances and track their progress easily and
          efficiently.
        </p>
        <div className="ctaButtons">
          <Link to="/signup" className="btn">
            Get Started
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </div>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Street SOS. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
