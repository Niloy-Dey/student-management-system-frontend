import React from 'react';
import { Link } from 'react-router-dom';
import './css/TeamLeaderSidebar.css'; // Custom styles for the sidebar

const TeamLeaderSidebar = () => {
    return (
        <div className="team-leader-sidebar">
            <ul className="sidebar-nav">
                <li><Link to="/team-leader/dashboard">Dashboard</Link></li>
                <li><Link to="/team-leader/team-progress">Team Progress</Link></li>
                <li><Link to="/team-leader/upcoming-deadlines">Upcoming Deadlines</Link></li>
                <li><Link to="/team-leader/weekly-summaries">Weekly Summaries</Link></li>
            </ul>
        </div>
    );
};

export default TeamLeaderSidebar;
