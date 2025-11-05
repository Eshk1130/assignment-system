import React from 'react';
import { Calendar, CheckCircle, Clock, TrendingUp, ExternalLink, Users, Shield } from 'lucide-react';
import { formatDate, getDaysUntilDue, getStatusColor } from '../../utils/helpers';

const AssignmentCard = ({ assignment, onSubmit, isSubmitted, submission, groups, currentUser }) => {
  const daysUntil = getDaysUntilDue(assignment.dueDate);
  
  // Check if this is a group assignment
  const isGroupAssignment = assignment.submissionType === 'group';
  
  // Find the student's group for this assignment
  const studentGroup = groups?.find(g => 
    g.assignmentId === assignment.id && g.memberIds.includes(currentUser.id)
  );
  
  // Check if current user is the group leader
  const isGroupLeader = studentGroup && studentGroup.leaderId === currentUser.id;
  
  // Check if user has no group for group assignment
  const hasNoGroup = isGroupAssignment && !studentGroup;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 animate-fadeIn">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">
              {assignment.title}
            </h3>
            {isSubmitted && (
              <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Submitted
              </span>
            )}
            {isGroupAssignment && (
              <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                <Users className="w-3 h-3" />
                Group
              </span>
            )}
            {isGroupLeader && (
              <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                <Shield className="w-3 h-3" />
                Leader
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              {isSubmitted 
                ? `Submitted: ${formatDate(submission.submittedAt)}` 
                : `Due: ${formatDate(assignment.dueDate)}`}
            </div>
            {!isSubmitted && (
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(daysUntil)}`}>
                <Clock className="w-4 h-4" />
                {daysUntil < 0 
                  ? `${Math.abs(daysUntil)} days overdue` 
                  : `${daysUntil} days left`}
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-4 h-4" />
              {assignment.totalMarks} marks
            </div>
            {isSubmitted && submission.marks !== null && (
              <div className="flex items-center gap-2 font-medium text-blue-600">
                Score: {submission.marks}/{assignment.totalMarks}
              </div>
            )}
          </div>

          {/* Group Info */}
          {isGroupAssignment && studentGroup && (
            <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-purple-900">
                <Users className="w-4 h-4" />
                <span className="font-medium">{studentGroup.name}</span>
                <span className="text-purple-600">• {studentGroup.memberIds.length} members</span>
              </div>
            </div>
          )}

          {/* No Group Warning */}
          {hasNoGroup && !isSubmitted && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                ⚠️ You are not part of any group. Form or join a group to submit this assignment.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4" />
            Drive Link
          </a>
          {!isSubmitted && (
            <button
              onClick={() => onSubmit(assignment.id)}
              disabled={hasNoGroup}
              className={`px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                hasNoGroup 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isGroupAssignment ? 'Acknowledge Submission' : 'Mark Submitted'}
            </button>
          )}
          {isSubmitted && submission && submission.marks !== null && (
            <div className="text-center py-2 px-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {((submission.marks / assignment.totalMarks) * 100).toFixed(0)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;