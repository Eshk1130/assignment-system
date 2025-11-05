import React, { useState } from 'react';
import { Plus, FileText, ArrowLeft } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { getAssignmentStats } from '../../utils/helpers';
import Header from '../common/Header';
import CourseCard from '../common/CourseCard';
import AssignmentForm from './AssignmentForm';
import AssignmentOverviewCard from './AssignmentOverviewCard';
import StudentProgressView from './StudentProgressView';
import DemoGuide from '../common/DemoGuide';

const TeacherDashboard = () => {
  const { 
    currentUser, 
    users, 
    courses,
    assignments, 
    submissions, 
    logout, 
    addAssignment,
    updateSubmissionMarks 
  } = useApp();
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Get teacher's courses with safe fallback
  const teacherCourses = courses?.filter(course => course.teacherId === currentUser.id) || [];

  // Filter assignments for selected course
  const courseAssignments = selectedCourse 
    ? (assignments?.filter(a => a.courseId === selectedCourse.id) || [])
    : [];

  // Get all students
  const students = users?.filter(user => user.role === 'student') || [];

  // Get students in selected course
  const courseStudents = selectedCourse
    ? students.filter(s => selectedCourse.studentIds.includes(s.id))
    : [];

  const handleCreateAssignment = (assignmentData) => {
    const newAssignment = {
      ...assignmentData,
      courseId: selectedCourse.id,
    };
    addAssignment(newAssignment);
  };

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  // Course Dashboard View
  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={currentUser} onLogout={logout} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
            <p className="text-gray-600">Select a course to manage assignments</p>
          </div>

          {teacherCourses.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Courses Assigned
              </h3>
              <p className="text-gray-600">
                You don't have any courses assigned yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherCourses.map(course => {
                const assignmentCount = assignments?.filter(a => a.courseId === course.id).length || 0;
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    assignmentCount={assignmentCount}
                    studentCount={course.studentIds.length}
                    onClick={() => setSelectedCourse(course)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Course Assignment Management View
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={logout} />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h2>
              <p className="text-gray-600">{selectedCourse.code} • {selectedCourse.semester}</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              New Assignment
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {courseAssignments.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Assignments Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first assignment for this course
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
            {courseAssignments.map(assignment => {
              const stats = getAssignmentStats(
                assignment.id, 
                submissions || [], 
                courseStudents
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

      <AssignmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateAssignment}
      />

      <StudentProgressView
        isOpen={selectedAssignment !== null}
        onClose={() => setSelectedAssignment(null)}
        assignment={selectedAssignment}
        students={courseStudents}
        submissions={submissions || []}
        onUpdateMarks={updateSubmissionMarks}
      />
      <DemoGuide />
    </div>
  );
};

export default TeacherDashboard;