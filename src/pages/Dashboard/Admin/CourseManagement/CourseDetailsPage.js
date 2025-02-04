import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddWeekModal from './Modals/AddWeekModal';
import AddModuleModal from './Modals/AddModuleModal';
import AddAssignmentModal from './Modals/AddAssignmentModal';
import EditWeekModal from './Modals/EditWeekModal';
import AddExamModal from './Modals/AddExamModal';
import { useParams } from 'react-router-dom';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  console.log(courseId);

  const [course, setCourse] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [showAddWeekModal, setShowAddWeekModal] = useState(false);
  const [showEditWeekModal, setShowEditWeekModal] = useState(false);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  // Fetch course and week data when the component is mounted
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/admin/courses/${courseId}`);
        console.log(data.course);
        setCourse(data.course);
        setWeeks(data.course?.weeks);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // Handle adding a new week
  const handleAddWeek = () => {
    setShowAddWeekModal(true);
  };

  // Handle editing a week
  const handleEditWeek = (weekId) => {
    setSelectedWeekId(weekId);
    setShowEditWeekModal(true);
  };

  // Handle adding a module
  const handleAddModule = (weekId) => {
    setSelectedWeekId(weekId);
    setShowAddModuleModal(true);
  };

  // Handle adding an assignment to a module
  const handleAddAssignment = (module) => {
    setSelectedModule(module);
    setShowAddAssignmentModal(true);
  };

  // Handle adding an exam to a module
  const handleAddExam = (module) => {
    setSelectedModule(module);
    setShowAddExamModal(true);
  };

  return (
    <div className="course-details-page">
      <h1>Course Details</h1>
      {course ? (
        <>
          <h2>{course.name}</h2>
          <p>{course.description}</p>

          <button onClick={handleAddWeek}>Add Week</button>

          <div className="week-list">
            {weeks?.length > 0 ? (
              weeks.map((week) => (
                <div key={week._id} className="week-item">
                  <h3>Week {week?.weekNumber || 'N/A'}</h3> {/* Fallback if weekNumber is missing */}
                  <p>Start Date: {new Date(week?.startDate).toLocaleDateString()}</p>
                  <p>End Date: {new Date(week?.endDate).toLocaleDateString()}</p>

                  <button onClick={() => handleEditWeek(week._id)}>Edit Week</button>
                  <button onClick={() => handleAddModule(week._id)}>Add Module</button>

                  {/* List modules for the week */}
                  {week.modules?.map((module) => (
                    <div key={module._id} className="module-item">
                      <h4>{module.moduleName}</h4>
                      <p>{module.moduleContent}</p>

                      <button onClick={() => handleAddAssignment(module)}>Add Assignment</button>
                      <button onClick={() => handleAddExam(module)}>Add Exam</button>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No weeks available for this course.</p>
            )}
          </div>

          {/* Modal for adding week */}
          <AddWeekModal show={showAddWeekModal} setShow={setShowAddWeekModal} courseId={course._id} />

          {/* Modal for editing week */}
          <EditWeekModal show={showEditWeekModal} setShow={setShowEditWeekModal} weekId={selectedWeekId} />

          {/* Modal for adding module */}
          <AddModuleModal show={showAddModuleModal} setShow={setShowAddModuleModal} weekId={selectedWeekId} />

          {/* Modal for adding assignment */}
          <AddAssignmentModal show={showAddAssignmentModal} setShow={setShowAddAssignmentModal} module={selectedModule} />

          {/* Modal for adding exam */}
          <AddExamModal show={showAddExamModal} setShow={setShowAddExamModal} module={selectedModule} />
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default CourseDetailsPage;
