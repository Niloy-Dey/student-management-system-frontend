import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { FaUsers, FaLayerGroup, FaUsersCog, FaTasks, FaCheckCircle } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Registering required ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboardPage = () => {
  const [dashboardStats, setDashboardStats] = useState({
    userCount: 1500,
    batchCount: 5,
    teamCount: 8,
    missionCount: 15,
    todayAttendanceCount: 1400,
    dailyAttendance: [
      { date: '2025-02-01', attendance: 100 },
      { date: '2025-02-02', attendance: 120 },
      { date: '2025-02-03', attendance: 90 },
      { date: '2025-02-04', attendance: 130 },
      { date: '2025-02-05', attendance: 110 },
    ], // Fake attendance data
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const chartData = {
    labels: dashboardStats.dailyAttendance.map(item => item.date),
    datasets: [
      {
        label: 'Attendance Today',
        data: dashboardStats.dailyAttendance.map(item => item.attendance),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const barChartData = {
    labels: dashboardStats.dailyAttendance.map(item => item.date),
    datasets: [
      {
        label: 'Attendance Today',
        data: dashboardStats.dailyAttendance.map(item => item.attendance),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [75, 25], // Fake attendance data (you can modify it based on real data)
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Attendance',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Container style={{ maxWidth: '1400px' }} className="mt-4 mt-5 pt-5">
      <h1 className="mb-4 text-center text-dark fw-bold">📊 Admin Dashboard</h1>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      <Row className="g-4">
        {[{ title: 'Total Users', value: dashboardStats.userCount, icon: <FaUsers size={28} />, color: 'primary' },
          { title: 'Total Batches', value: dashboardStats.batchCount, icon: <FaLayerGroup size={28} />, color: 'info' },
          { title: 'Total Teams', value: dashboardStats.teamCount, icon: <FaUsersCog size={28} />, color: 'success' },
          { title: 'Total Missions', value: dashboardStats.missionCount, icon: <FaTasks size={28} />, color: 'warning' },
        ].map((stat, index) => (
          <Col key={index} md={3}>
            <Card className={`shadow-lg border-0 rounded-4 text-center bg-${stat.color} text-white`} style={{ transition: 'transform 0.3s ease-in-out' }}>
              <Card.Body>
                <div className="mb-2">{stat.icon}</div>
                <Card.Title className="fw-bold fs-5">{stat.title}</Card.Title>
                <Card.Text className="fs-4 fw-bold">{stat.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>


      {/* Display the three charts in one row */}
      <Row className="mt-5">
        <Col xs={12} md={4} className="d-flex align-items-stretch">
          <Card className="shadow-lg border-0 rounded-4 flex-fill">
            <Card.Body>
              <Card.Title className="fw-bold fs-5 text-center">Attendance Trend (Line Chart)</Card.Title>
              <div className="mt-3">
                <Line data={chartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4} className="d-flex align-items-stretch">
          <Card className="shadow-lg border-0 rounded-4 flex-fill">
            <Card.Body>
              <Card.Title className="fw-bold fs-5 text-center">Attendance Trend (Bar Chart)</Card.Title>
              <div className="mt-3">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4} className="d-flex align-items-stretch">
          <Card className="shadow-lg border-0 rounded-4 flex-fill">
            <Card.Body>
              <Card.Title className="fw-bold fs-5 text-center">Attendance Status (Pie Chart)</Card.Title>
              <div className="mt-3">
                <Pie data={pieChartData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      <Row className="mt-4">
        <Col>
          <Card className="shadow-lg border-0 rounded-4 text-center bg-dark text-white" style={{ transition: 'transform 0.3s ease-in-out' }}>
            <Card.Body>
              <div className="mb-2"><FaCheckCircle size={28} /></div>
              <Card.Title className="fw-bold fs-5">Today's Attendance</Card.Title>
              <Card.Text className="fs-4 fw-bold">{dashboardStats.todayAttendanceCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Row>
    </Container>
  );
};

export default AdminDashboardPage;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
// import { FaUsers, FaLayerGroup, FaUsersCog, FaTasks, FaCheckCircle } from 'react-icons/fa';

// const AdminDashboardPage = () => {
//   const [dashboardStats, setDashboardStats] = useState({
//     userCount: 0,
//     batchCount: 0,
//     teamCount: 0,
//     missionCount: 0,
//     todayAttendanceCount: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/dashboard');
//         if (response.data.success) {
//           setDashboardStats(response.data.data);
//         } else {
//           setError('Failed to load dashboard stats.');
//         }
//       } catch (error) {
//         setError('Error fetching dashboard data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, []);

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   return (
//     <Container style={{ maxWidth: "1400px" }} className="mt-4 mt-5 pt-5">
//       <h1 className="mb-4 text-center text-dark fw-bold">📊 Admin Dashboard</h1>

//       {error && <Alert variant="danger" className="text-center">{error}</Alert>}

//       <Row className="g-4">
//         {[
//           { title: 'Total Users', value: dashboardStats.userCount, icon: <FaUsers size={28} />, color: 'primary' },
//           { title: 'Total Batches', value: dashboardStats.batchCount, icon: <FaLayerGroup size={28} />, color: 'info' },
//           { title: 'Total Teams', value: dashboardStats.teamCount, icon: <FaUsersCog size={28} />, color: 'success' },
//           { title: 'Total Missions', value: dashboardStats.missionCount, icon: <FaTasks size={28} />, color: 'warning' },
//         ].map((stat, index) => (
//           <Col key={index} md={3}>
//             <Card className={`shadow-lg border-0 rounded-4 text-center bg-${stat.color} text-white`} style={{ transition: 'transform 0.3s ease-in-out' }}>
//               <Card.Body>
//                 <div className="mb-2">{stat.icon}</div>
//                 <Card.Title className="fw-bold fs-5">{stat.title}</Card.Title>
//                 <Card.Text className="fs-4 fw-bold">{stat.value}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Row className="mt-4">
//         <Col>
//           <Card className="shadow-lg border-0 rounded-4 text-center bg-dark text-white" style={{ transition: 'transform 0.3s ease-in-out' }}>
//             <Card.Body>
//               <div className="mb-2"><FaCheckCircle size={28} /></div>
//               <Card.Title className="fw-bold fs-5">Today's Attendance</Card.Title>
//               <Card.Text className="fs-4 fw-bold">{dashboardStats.todayAttendanceCount}</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdminDashboardPage;
