import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import Header from '../common/Header';
import TabNavigation from '../common/TabNavigation';
import ConfirmationModal from '../common/ConfirmationModal';
import AssignmentsTab from './AssignmentsTab';
import ProgressTab from './progtab';  

const StudentDashboard = () => {
  const { currentUser, assignments, submissions, logout, addSubmission } = useApp();
  const [activeTab, setActiveTab] = useState('assignments');
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, assignment: null });

  // Filter data for current student
  const userSubmissions = submissions.filter(sub => sub.studentId === currentUser.id);
  
  const pendingAssignments = assignments.filter(
    assignment => !userSubmissions.some(sub => sub.assignmentId === assignment.id)
  );
  
  const submittedAssignments = assignments.filter(
    assignment => userSubmissions.some(sub => sub.assignmentId === assignment.id)
  );

  // Calculate statistics
  const totalMarks = userSubmissions.reduce((sum, sub) => sum + (sub.marks || 0), 0);
  const totalPossible = submittedAssignments.reduce(
    (sum, assignment) => sum + assignment.totalMarks, 
    0
  );
  const completionRate = assignments.length > 0 
    ? (submittedAssignments.length / assignments.length) * 100 
    : 0;

  const handleSubmit = (assignmentId) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    setConfirmModal({ isOpen: true, assignment });
  };

  const confirmSubmission = () => {
    addSubmission(confirmModal.assignment.id);
    setConfirmModal({ isOpen: false, assignment: null });
  };

  const tabs = [
    { id: 'assignments', label: 'Assignments' },
    { id: 'progress', label: 'Progress' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={logout} />
      
      <TabNavigation 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'assignments' ? (
          <AssignmentsTab
            pendingAssignments={pendingAssignments}
            submittedAssignments={submittedAssignments}
            userSubmissions={userSubmissions}
            onSubmit={handleSubmit}
          />
        ) : (
          <ProgressTab
            submittedAssignments={submittedAssignments}
            assignments={assignments}
            userSubmissions={userSubmissions}
            totalMarks={totalMarks}
            totalPossible={totalPossible}
            completionRate={completionRate}
          />
        )}
      </div>

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, assignment: null })}
        onConfirm={confirmSubmission}
        assignment={confirmModal.assignment}
      />
    </div>
  );
};

export default StudentDashboard;