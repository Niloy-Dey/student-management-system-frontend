import React, { useState } from 'react';
import axios from 'axios';

const AddModuleModal = ({ show, setShow, weekId }) => {
  const [moduleName, setModuleName] = useState('');
  const [moduleContent, setModuleContent] = useState('');
  const [assignments, setAssignments] = useState([{ assignmentTitle: '', dueDate: '', description: '' }]);
  const [exams, setExams] = useState([{ examTitle: '', examDate: '', duration: '', weight: '' }]);

  const handleSubmit = async () => {
    try {
      const moduleData = {
        moduleName,
        moduleContent,
        assignments,
        exams,
      };

      await axios.post(`http://localhost:5000/api/admin/weeks/${weekId}/modules`, moduleData);
      setShow(false); // Close the modal after submitting
    } catch (error) {
      console.error("Error adding module", error);
    }
  };

  const handleAddAssignment = () => {
    setAssignments([...assignments, { assignmentTitle: '', dueDate: '', description: '' }]);
  };

  const handleAddExam = () => {
    setExams([...exams, { examTitle: '', examDate: '', duration: '', weight: '' }]);
  };

  const handleChangeAssignment = (index, field, value) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index][field] = value;
    setAssignments(updatedAssignments);
  };

  const handleChangeExam = (index, field, value) => {
    const updatedExams = [...exams];
    updatedExams[index][field] = value;
    setExams(updatedExams);
  };

  return (
    show && (
      <div className="modal">
        <h2>Add Module</h2>
        <label>Module Name</label>
        <input 
          type="text" 
          value={moduleName} 
          onChange={(e) => setModuleName(e.target.value)} 
        />
        <label>Module Content</label>
        <textarea 
          value={moduleContent} 
          onChange={(e) => setModuleContent(e.target.value)} 
        />

        <div>
          <h4>Assignments</h4>
          {assignments.map((assignment, index) => (
            <div key={index} className="assignment-form">
              <input 
                type="text" 
                placeholder="Assignment Title" 
                value={assignment.assignmentTitle} 
                onChange={(e) => handleChangeAssignment(index, 'assignmentTitle', e.target.value)} 
              />
              <input 
                type="date" 
                value={assignment.dueDate} 
                onChange={(e) => handleChangeAssignment(index, 'dueDate', e.target.value)} 
              />
              <textarea 
                placeholder="Assignment Description" 
                value={assignment.description} 
                onChange={(e) => handleChangeAssignment(index, 'description', e.target.value)} 
              />
            </div>
          ))}
          <button onClick={handleAddAssignment}>Add Assignment</button>
        </div>

        <div>
          <h4>Exams</h4>
          {exams.map((exam, index) => (
            <div key={index} className="exam-form">
              <input 
                type="text" 
                placeholder="Exam Title" 
                value={exam.examTitle} 
                onChange={(e) => handleChangeExam(index, 'examTitle', e.target.value)} 
              />
              <input 
                type="date" 
                value={exam.examDate} 
                onChange={(e) => handleChangeExam(index, 'examDate', e.target.value)} 
              />
              <input 
                type="number" 
                placeholder="Duration (minutes)" 
                value={exam.duration} 
                onChange={(e) => handleChangeExam(index, 'duration', e.target.value)} 
              />
              <input 
                type="number" 
                placeholder="Weight" 
                value={exam.weight} 
                onChange={(e) => handleChangeExam(index, 'weight', e.target.value)} 
              />
            </div>
          ))}
          <button onClick={handleAddExam}>Add Exam</button>
        </div>

        <button onClick={handleSubmit}>Save</button>
        <button onClick={() => setShow(false)}>Cancel</button>
      </div>
    )
  );
};

export default AddModuleModal;
