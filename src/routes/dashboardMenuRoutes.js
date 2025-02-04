// src/routes/dashboardMenuRoutes.js
const express = require('express');
const router = express.Router();

// Sample data for dashboard menu
const dashboardMenuData = [
  { id: 1, name: 'Overview', link: '/dashboard/overview' },
  { id: 2, name: 'Progress', link: '/dashboard/progress' },
  { id: 3, name: 'Meetings', link: '/dashboard/meetings' },
  { id: 4, name: 'Leaderboard', link: '/dashboard/leaderboard' },
  { id: 5, name: 'Profile', link: '/dashboard/profile' }
];

// Return the menu data
router.get('/api/dashboard-menu', (req, res) => {
  res.json(dashboardMenuData);
});

module.exports = router;
