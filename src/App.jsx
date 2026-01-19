import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./components/student/pages/StudentDashboard";
import StudentRegister from "./components/StudentRegister";
import StudentLogin from "./components/StudentLogin";
import JourneySteps from "./components/student/pages/JourneySteps";
import Program from "./components/student/pages/Program";
import FreeContent from "./components/student/pages/FreeContent";
import ExamManagement from "./components/student/pages/ExamManagement";
import ReportManagement from "./components/student/pages/ReportManagement";
import SlotBookingList from "./components/student/pages/SlotBookingList";
import ContentLibrary from "./components/student/pages/ContentLibrary";
import StudentProfile from "./components/student/pages/StudentProfile";
import AdminLogin from "./components/AdminLogin";
import ForgotPassword from "./components/student/pages/ForgotPassword";
import ResetPassword from "./components/student/pages/ResetPassword";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ PUBLIC ROUTE */}
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />   
        <Route path="/reset-password" element={<ResetPassword />} /> 

        {/* ✅ PROTECTED STUDENT ROUTES */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="journeysteps" element={<JourneySteps />} />
          <Route path="program" element={<Program />} />
          <Route path="freecontent" element={<FreeContent />} />
          <Route path="exam-management" element={<ExamManagement />} />
          <Route path="report-management" element={<ReportManagement />} />
          <Route path="slot-booking" element={<SlotBookingList />} />
          <Route path="content-library" element={<ContentLibrary />} />
          <Route path="student-profile" element={<StudentProfile />} />

          </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
