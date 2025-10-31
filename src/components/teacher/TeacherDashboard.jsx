import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { getAssignmentStats } from '../../utils/helpers';
import Header from '../common/Header';
import AssignmentForm from './AssignmentForm';
import AssignmentOverviewCard from './AssignmentOverviewCard';
import StudentProgressView from './StudentProgressView';

const TeacherDashboard = () => {
  const { 
    currentUser, 
    users, 
    assignments, 
    submissions, 
    logout, 
    addAssignment,
    updateSubmissionMarks 
  } = useApp();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Filter assignments created by this teacher
  const teacherAssignments = assignments.filter(
    assignment => assignment.createdBy === currentUser.id
  );

  // Get all students
  const students = users.filter(user => user.role === 'student');

  const handleCreateAssignment = (assignmentData) => {
    addAssignment(assignmentData);
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={logout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Assignments
            </h1>
            <p className="text-gray-600">
              Manage and track student submissions
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            New Assignment
          </button>
        </div>

        {/* Assignments Grid */}
        {teacherAssignments.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Assignments Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first assignment to get started
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Assignment
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherAssignments.map(assignment => {
              const stats = getAssignmentStats(
                assignment.id, 
                submissions, 
                students
              );
              
              return (
                <AssignmentOverviewCard
                  key={assignment.id}
                  assignment={assignment}
                  stats={stats}
                  onClick={() => handleAssignmentClick(assignment)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Assignment Form Modal */}
      <AssignmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateAssignment}
      />

      {/* Student Progress Modal */}
      <StudentProgressView
        isOpen={selectedAssignment !== null}
        onClose={() => setSelectedAssignment(null)}
        assignment={selectedAssignment}
        students={students}
        submissions={submissions}
        onUpdateMarks={updateSubmissionMarks}
      />
    </div>
  );
};

export default TeacherDashboard;