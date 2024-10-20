import { Link } from "react-router-dom";
import "./adminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboardContainer">
      <nav className="navbar">
      <Link to="/"><div className="logo">Street SOS</div></Link>  
        <ul className="navLinks">
          <li><Link to="/admin-allgrievances">All Grievances</Link></li>
        </ul>
      </nav>
      <div className="dashboardContent">
        <h1>Welcome to the Admin Dashboard</h1>
        <p>
          As the administrator, you have the power to manage all aspects of user grievances effectively. 
          This dashboard serves as your control center for overseeing user accounts, resolving issues, 
          and ensuring a seamless experience for our users.
        </p>
        <p>
          In the All Grievances section, you can view, filter, and respond to user complaints. 
          Utilize the reporting tools to generate insights and track trends in grievances over time, 
          helping you identify areas for improvement and enhance user satisfaction.
        </p>
        <p>
          Stay updated with the latest notifications and alerts related to user activities. 
        </p>
        <div className="buttonContainer">
          <Link to="/admin-allgrievances">
            <button className="dashboardButton">All Grievances</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
