import {Route,Routes} from "react-router-dom"

import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import GrievancePage from "../pages/Grievance";
import ImageUploadPage from "../pages/ImageUploadPage";
import LandingPage from "../pages/LandingPage";
import MyGrievances from "../pages/MyGrievances";
import AdminLogin from "../pages/AdminLogin";
import AdminAllGrievances from "../pages/AdminAllGrievances";
import AdminDashboard from "../pages/AdminDashboard";
import VerifyGrievance from "../pages/VerifyGrievance";

export default function AllRoutes() {
  return (
    <Routes>
       <Route path="/" element={<LandingPage/>}/> 
     <Route path="/signUp" element={<SignUp />}/> 
     <Route path="/login" element={<Login />}/>
     <Route path="/dashboard" element={<Dashboard />}/>
     <Route path="/grievance" element={<GrievancePage />}/>
     <Route path="/upload/:grievanceId" element={<ImageUploadPage />}/>
     <Route path="/mygrievances" element={<MyGrievances />}/>
     <Route path="/admin-login" element={<AdminLogin />}/>
     <Route path="/admin-allgrievances" element={<AdminAllGrievances />}/>
     <Route path="/admin-dashboard" element={<AdminDashboard />}/>
     <Route path="/verify" element={<VerifyGrievance />}/>
    </Routes>
  );
}
