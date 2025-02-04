import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "../components/Layout"; // ✅ Authenticated Layout (Navbar + Sidebar)
import LayoutWithNavbar from "../components/LayoutWithNavbar"; // ✅ Public Layout (Only Navbar)

import AdminRoutes from "./AdminRoutes";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/CommonPages/LoginPage";
import RegisterPage from "../pages/CommonPages/Register";
import NotFoundPage from "../pages/CommonPages/NotFoundPage";

import StudentDashboardPage from "../pages/Dashboard/StudentDashboard/StudentDashboardPage";
import ProblemSubmissionPage from "../pages/Dashboard/StudentDashboard/ProblemSubmissionPage";
import MeetingAttendancePage from "../pages/Dashboard/StudentDashboard/MeetingAttendancePage";
import LeaderboardPage from "../pages/Dashboard/StudentDashboard/LeaderboardPage";

import TeamLeaderDashboardPage from "../pages/Dashboard/TeamLeader/TeamLeaderDashboardPage";
import TeamProgressPage from "../pages/Dashboard/TeamLeader/TeamProgressPage";
import UpcomingDeadlinesPage from "../pages/Dashboard/TeamLeader/UpcomingDeadlinesPage";
import WeeklySummariesPage from "../pages/Dashboard/TeamLeader/WeeklySummariesPage";

import AdvisorDashboardPage from "../pages/Dashboard/AdvisorDashboard/AdvisorDashboardPage";
import TeamManagementPage from "../pages/Dashboard/AdvisorDashboard/TeamManagementPage";
import StudentProgressPage from "../pages/Dashboard/AdvisorDashboard/StudentProgressPage";
import MeetingSchedulerPage from "../pages/Dashboard/AdvisorDashboard/MeetingSchedulerPage";
import NotificationsPage from "../pages/Dashboard/AdvisorDashboard/NotificationsPage";
import ProfilePage from "../pages/CommonPages/Profile";
import AllStudentLeaderBoard from "../pages/CommonPages/AllStudentLeaderBoard";

console.log("HI from 10 RoutesComp");

// ✅ Define the Router using `createBrowserRouter`
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ✅ Public Routes (Navbar Only, No Sidebar) */}
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/allStudentLeader" element={<AllStudentLeaderBoard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* ✅ Authenticated Routes (Navbar + Sidebar) */}
      <Route path="/student-dashboard" element={<Layout userRole="student" />}>
        <Route index element={<StudentDashboardPage />} />
        <Route path="problem-submission" element={<ProblemSubmissionPage />} />
        <Route path="meeting-attendance" element={<MeetingAttendancePage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
      </Route>

      <Route path="/team-leader" element={<Layout userRole="teamLeader" />}>
        <Route index element={<TeamLeaderDashboardPage />} />
        <Route path="team-progress" element={<TeamProgressPage />} />
        <Route path="upcoming-deadlines" element={<UpcomingDeadlinesPage />} />
        <Route path="weekly-summaries" element={<WeeklySummariesPage />} />
      </Route>

      <Route path="/advisor-dashboard" element={<Layout userRole="advisor" />}>
        <Route index element={<AdvisorDashboardPage />} />
        <Route path="team-management" element={<TeamManagementPage />} />
        <Route path="student-progress" element={<StudentProgressPage />} />
        <Route path="meeting-scheduler" element={<MeetingSchedulerPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>

      <Route path="/admin/*" element={<Layout userRole="admin" />}>
        <Route path="*" element={<AdminRoutes />} />
      </Route>
    </>
  )
);

// ✅ RoutesComponent now uses RouterProvider
const RoutesComponent = () => {
  console.log("HI from 24 RoutesComp");
  return <RouterProvider router={router} />;
};

export default RoutesComponent;

console.log("HI from 65 RoutesComp");
