// src/pages/Dashboard/AdvisorDashboard/SystemLogsPage.js

import React, { useState, useEffect } from 'react';

// This could be an API URL or an imported function that fetches data
const fetchSystemLogs = async () => {
  try {
    const response = await fetch('/api/system-logs');  // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch system logs');
    }
    const data = await response.json();  // Parse the JSON response
    return data;
  } catch (error) {
    console.error('Error fetching system logs:', error);
    return [];
  }
};

const SystemLogsPage = () => {
  const [logs, setLogs] = useState([]);  // State to store logs
  const [loading, setLoading] = useState(true);  // State to manage loading state
  const [error, setError] = useState(null);  // State to manage errors

  useEffect(() => {
    const getLogs = async () => {
      const logsData = await fetchSystemLogs();
      setLogs(logsData);  // Update logs state
      setLoading(false);  // Stop loading
    };

    getLogs();  // Fetch logs when the component mounts
  }, []);  // Empty dependency array means this effect runs only once on mount

  if (loading) {
    return <div>Loading...</div>;  // Show loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // Show error message
  }

  return (
    <div>
      <h1>System Logs</h1>
      <ul>
        {logs.length === 0 ? (
          <li>No logs available</li>
        ) : (
          logs.map((log, index) => (
            <li key={index}>
              <strong>{log.timestamp}</strong>: {log.message}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SystemLogsPage;
