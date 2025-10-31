import React from 'react';
import { CheckCircle, FileText } from 'lucide-react';
import AssignmentCard from './AssignmentCard';

const AssignmentsTab = ({ 
  pendingAssignments, 
  submittedAssignments, 
  userSubmissions, 
  onSubmit 
}) => {
  return (
    <div className="space-y-6">
      {/* Pending Assignments Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Pending Assignments</h2>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            {pendingAssignments.length} Due
          </span>
        </div>
        
        {pendingAssignments.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600">All caught up! No pending assignments.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingAssignments.map(assignment => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onSubmit={onSubmit}
                isSubmitted={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Submitted Assignments Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Submitted Assignments</h2>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {submittedAssignments.length} Completed
          </span>
        </div>
        
        {submittedAssignments.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submittedAssignments.map(assignment => {
              const submission = userSubmissions.find(
                sub => sub.assignmentId === assignment.id
              );
              return (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  isSubmitted={true}
                  submission={submission}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsTab;