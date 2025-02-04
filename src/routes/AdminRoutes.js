// src\routes\AdminRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboardPage from '../pages/Dashboard/Admin/AdminDashboardPage';

import AdminDashboardLayout from '../pages/Dashboard/Admin/AdminDashboardLayout';
// import AdminUserManagementPage from '../pages/Dashboard/Admin/AdminUserManagementPage';
import RoleManagementPage from '../pages/Dashboard/Admin/Usermanagement/RoleManagementPage';
import CreateUserPage from '../pages/Dashboard/Admin/Usermanagement/CreateUserPage';
import EditUserPage from '../pages/Dashboard/Admin/Usermanagement/EditUserPage';
import UserProfilePage from '../pages/Dashboard/Admin/Usermanagement/UserProfilePage';
import UserListPage from '../pages/Dashboard/Admin/Usermanagement/UserListPage';
import DeleteUserPage from '../pages/Dashboard/Admin/Usermanagement/DeleteUserPage';
import CreateStudent from '../pages/Dashboard/Admin/StudentManagement/CreateStudent';
import StudentList from '../pages/Dashboard/Admin/StudentManagement/StudentList';
import NotFoundPage from '../pages/CommonPages/NotFoundPage';
import StudentProfile from '../pages/Dashboard/Admin/StudentManagement/StudentProfile';
import BatchManagementPage from '../pages/Dashboard/Admin/BatchManagement/BatchManagementPage';
import UserManagementDashboard from '../pages/Dashboard/Admin/Usermanagement/UserManagementDashboard';
import AdminUserManagementPage from '../pages/Dashboard/Admin/Usermanagement/AdminUserManagementPage';
import SemesterManagementPage from '../pages/Dashboard/Admin/SemesterManagement/SemesterManagementPage';
import CourseManagementPage from '../pages/Dashboard/Admin/CourseManagement/CourseManagementPage';
import CourseDetailsPage from '../pages/Dashboard/Admin/CourseManagement/CourseDetailsPage';
import Layout from '../components/Layout';
// import AdminUserManagementPage from '../pages/Dashboard/Admin/Usermanagement/AdminUserManagementPage';
// import NotFoundPage from '../../pages/NotFoundPage'; // Error page




const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      {/* <Route path="/" element={<Layout />}> */}
        <Route path="dashboard" element={<AdminDashboardPage />} />

        {/* User Management */}
        {/* <Route path="user-management/create-user" element={<UserManagementPage />} />
        <Route path="user-management/users" element={<UserManagementPage />} />
        <Route path="user-management/edit-user/:userId" element={<UserManagementPage />} />
        
        <Route path="user-management/user-profile/:userId" element={<UserManagementPage />} /> */}
        {/* <Route path="user-management/assign-role" element={<RoleManagementPage />} /> */}
        {/* <Route path="user-management/user-list" element={<AdminUserManagementPage />} /> */}

        {/* User Management Routes */}
        // User Management Routes
        <Route path="user-management" element={<UserManagementDashboard />} />  {/* Main Dashboard */}
        <Route path="user-management/user-list" element={<AdminUserManagementPage />} />  {/* List of all users */}
        <Route path="user-management/create-user" element={<CreateUserPage />} />  {/* Create a new user */}
        <Route path="user-management/edit-use/:userId" element={<EditUserPage />} />  {/* Edit user by ID */}
        <Route path="user-management/user-profile/:userId" element={<UserProfilePage />} />  {/* View user profile */}
        <Route path="user-management/assign-role/:userId" element={<RoleManagementPage />} />  Assign role to user
        <Route path="user-management/delete-user/:userId" element={<DeleteUserPage />} />  {/* Delete user by ID */}
        {/* <Route path="user-management/search-users" element={<SearchUserPage />} />  Search users */}


        {/* Batch Management Routes */}
        <Route path="batch-management" element={<BatchManagementPage />} />
        <Route path="semester-management" element={<SemesterManagementPage />} />
        <Route path="course-management" element={<CourseManagementPage />} />
        <Route path="course-details/:courseId" element={<CourseDetailsPage />} />
        {/* <Route path="batch-management/create" element={<CreateBatchPage />} />
        <Route path="batch-management/edit/:batchId" element={<EditBatchPage />} />
        <Route path="batch-management/view/:batchId" element={<ViewBatchPage />} />
        <Route path="batch-management/delete/:batchId" element={<DeleteBatchPage />} />
        <Route path="batch-management/assign-teams" element={<AssignTeamsPage />} />
        <Route path="batch-management/students/:batchId" element={<BatchStudentsPage />} />
        <Route path="batch-management/team-assignments/:batchId" element={<BatchTeamAssignmentsPage />} /> */}

        {/* Mission Management */}
        {/* <Route path="mission-management" element={<MissionManagementPage />} />
        <Route path="mission-management/create-mission" element={<MissionManagementPage />} />
        <Route path="mission-management/edit-mission/:missionId" element={<MissionManagementPage />} />
        <Route path="mission-management/assign-mission" element={<MissionManagementPage />} />
        <Route path="mission-management/delete-mission/:missionId" element={<MissionManagementPage />} /> */}

        {/* Assignment Management */}
        {/* <Route path="assignment-management" element={<AssignmentManagementPage />} />
        <Route path="assignment-management/create-assignment" element={<AssignmentManagementPage />} />
        <Route path="assignment-management/edit-assignment/:assignmentId" element={<AssignmentManagementPage />} />
        <Route path="assignment-management/assign-assignment" element={<AssignmentManagementPage />} />
        <Route path="assignment-management/delete-assignment/:assignmentId" element={<AssignmentManagementPage />} /> */}

        {/* Notification Management */}
        {/* <Route path="notification-management" element={<NotificationManagementPage />} />
        <Route path="notification-management/create-notification" element={<NotificationManagementPage />} />
        <Route path="notification-management/edit-notification/:notificationId" element={<NotificationManagementPage />} />
        <Route path="notification-management/delete-notification/:notificationId" element={<NotificationManagementPage />} />
        <Route path="notification-management/mark-as-read/:notificationId" element={<NotificationManagementPage />} />
        <Route path="notification-management/mark-as-unread/:notificationId" element={<NotificationManagementPage />} /> */}

        {/* Reporting */}
        {/* <Route path="reporting/users" element={<ReportingPage />} />
        <Route path="reporting/batches" element={<ReportingPage />} />
        <Route path="reporting/assignments" element={<ReportingPage />} />
        <Route path="reporting/missions" element={<ReportingPage />} />
        <Route path="reporting/notifications" element={<ReportingPage />} /> */}

        {/* Role Management */}
        {/* <Route path="role-management/create-role" element={<RoleManagementPage />} />
        <Route path="role-management/edit-role/:roleId" element={<RoleManagementPage />} />
        <Route path="role-management/assign-role-to-user" element={<RoleManagementPage />} /> */}

        {/* Audit Logs */}
        {/* <Route path="audit-logs" element={<AuditLogsPage />} />
        <Route path="audit-logs/clear" element={<AuditLogsPage />} />
        <Route path="audit-logs/delete-log/:logId" element={<AuditLogsPage />} />
        <Route path="audit-logs/logs-count" element={<AuditLogsPage />} /> */}

        {/* System Logs */}
        {/* <Route path="system-logs" element={<SystemLogsPage />} /> */}

        {/* Student Management */}
        <Route path="student-management" element={<StudentList />} />
        <Route path="student-management/student-list" element={<StudentList />} />
        <Route path="student-management/add-student" element={<CreateStudent />} />
        <Route path="student-management/student-profile/:studentId" element={<StudentProfile />} />
        <Route path="/student-management/student-profile/:studentId" component={StudentProfile} />

        <Route path="student-management/student-profile" element={<StudentProfile />} />
        {/* <Route path="student-management/*" element={< NotFoundPage />} /> */}
        {/* <Route path="admin/*" element={< NotFoundPage />} /> */}
        {/* <Route path="student-management/add-edit-student" element={<AddEditStudentPage />} />
        
        <Route path="student-management/batch-team-assignment" element={<BatchTeamAssignmentPage />} />
        <Route path="student-management/student-progress" element={<StudentProgressPage />} />
        <Route path="student-management/leaderboard" element={<LeaderboardPage />} />
        <Route path="student-management/notifications" element={<NotificationsPage />} /> */}
      {/* </Route> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRoutes;
