import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import Header from '../common/Header';
import CourseCard from '../common/CourseCard';
import AssignmentsTab from './AssignmentsTab';
import ProgressTab from './progtab';
import TabNavigation from '../common/TabNavigation';
import ConfirmationModal from '../common/ConfirmationModal';
import { ArrowLeft } from 'lucide-react';
import DemoGuide from '../common/DemoGuide';

const StudentDashboard = () => {
  const { currentUser, courses, assignments, submissions, groups, logout, addSubmission } = useApp();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('assignments');
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, assignment: null });

  const studentCourses = courses?.filter(course => 
    course.studentIds.includes(currentUser.id)
  ) || [];


  const courseAssignments = selectedCourse 
    ? (assignments?.filter(a => a.courseId === selectedCourse.id) || [])
    : [];


  const userSubmissions = submissions?.filter(sub => {
    if (sub.studentId === currentUser.id) return true;
    if (sub.groupId) {
      const group = groups?.find(g => g.id === sub.groupId);
      return group && group.memberIds.includes(currentUser.id);
    }
    return false;
  }) || [];

  const pendingAssignments = courseAssignments.filter(
    assignment => !userSubmissions.some(sub => sub.assignmentId === assignment.id)
  );
  
  const submittedAssignments = courseAssignments.filter(
    assignment => userSubmissions.some(sub => sub.assignmentId === assignment.id)
  );

  
  const totalMarks = userSubmissions.reduce((sum, sub) => sum + (sub.marks || 0), 0);
  const totalPossible = submittedAssignments.reduce(
    (sum, assignment) => sum + assignment.totalMarks, 
    0
  );
  const completionRate = courseAssignments.length > 0 
    ? (submittedAssignments.length / courseAssignments.length) * 100 
    : 0;

  const handleSubmit = (assignmentId) => {
    const assignment = courseAssignments.find(a => a.id === assignmentId);
    
    // Check if it's a group assignment
    if (assignment.submissionType === 'group') {
      const studentGroup = groups?.find(g => 
        g.assignmentId === assignmentId && g.memberIds.includes(currentUser.id)
      );
      
      if (!studentGroup) {
        setConfirmModal({ 
          isOpen: true, 
          assignment, 
          noGroup: true 
        });
        return;
      }
      
      // Check if user is the leader
      if (studentGroup.leaderId !== currentUser.id) {
        setConfirmModal({ 
          isOpen: true, 
          assignment, 
          notLeader: true 
        });
        return;
      }
      
      setConfirmModal({ isOpen: true, assignment, groupId: studentGroup.id });
    } else {
      setConfirmModal({ isOpen: true, assignment });
    }
  };

  const confirmSubmission = () => {
    if (confirmModal.groupId) {
      addSubmission(confirmModal.assignment.id, confirmModal.groupId);
    } else {
      addSubmission(confirmModal.assignment.id);
    }
    setConfirmModal({ isOpen: false, assignment: null });
  };

  const tabs = [
    { id: 'assignments', label: 'Assignments' },
    { id: 'progress', label: 'Progress' }
  ];


  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={currentUser} onLogout={logout} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
            <p className="text-gray-600">Select a course to view assignments</p>
          </div>

          {studentCourses.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-gray-600">No courses enrolled yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentCourses.map(course => {
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


  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={logout} />
      
      {/* Course Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h2>
            <p className="text-gray-600">{selectedCourse.code} • {selectedCourse.semester}</p>
          </div>
        </div>
      </div>

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
            groups={groups || []}
            currentUser={currentUser}
            onSubmit={handleSubmit}
          />
        ) : (
          <ProgressTab
            submittedAssignments={submittedAssignments}
            assignments={courseAssignments}
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
        noGroup={confirmModal.noGroup}
        notLeader={confirmModal.notLeader}
      />
       <DemoGuide /> 
    </div>
  );
};

export default StudentDashboard;