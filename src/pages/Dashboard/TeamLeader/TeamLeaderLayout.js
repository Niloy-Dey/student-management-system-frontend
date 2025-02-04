import React from 'react';
import { Outlet } from 'react-router-dom';
import TeamLeaderSidebar from './TeamLeaderSidebar';
import './css/TeamLeaderLayout.css'; // Custom styles for layout

const TeamLeaderLayout = () => {
    return (
        <div className="team-leader-layout">
            <TeamLeaderSidebar />
            <div className="main-content">
                <Outlet /> {/* Render nested routes here */}
            </div>
        </div>
    );
};

export default TeamLeaderLayout;
