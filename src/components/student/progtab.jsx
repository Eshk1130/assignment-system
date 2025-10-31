import React from 'react';
import { FileText, TrendingUp, CheckCircle } from 'lucide-react';
import { getProgressColor } from '../../utils/helpers';

const ProgressTab = ({ 
  submittedAssignments, 
  assignments, 
  userSubmissions, 
  totalMarks, 
  totalPossible, 
  completionRate 
}) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {submittedAssignments.length}/{assignments.length}
          </div>
          <div className="text-sm text-gray-600">Assignments Completed</div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totalMarks}
          </div>
          <div className="text-sm text-gray-600">Total Marks Earned</div>
          <div className="text-xs text-gray-500 mt-2">Out of {totalPossible} possible</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totalPossible > 0 ? ((totalMarks / totalPossible) * 100).toFixed(1) : 0}%
          </div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
      </div>

      {/* Detailed Progress */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Assignment Breakdown</h2>
        
        {submittedAssignments.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            Complete assignments to see your progress here.
          </p>
        ) : (
          <div className="space-y-4">
            {submittedAssignments.map(assignment => {
              const submission = userSubmissions.find(
                sub => sub.assignmentId === assignment.id
              );
              const percentage = submission.marks !== null 
                ? (submission.marks / assignment.totalMarks) * 100 
                : 0;
              
              return (
                <div key={assignment.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {assignment.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {submission.marks !== null ? (
                          `${submission.marks} / ${assignment.totalMarks} marks`
                        ) : (
                          'Pending evaluation'
                        )}
                      </div>
                    </div>
                    {submission.marks !== null && (
                      <div className="text-lg font-bold text-blue-600">
                        {percentage.toFixed(0)}%
                      </div>
                    )}
                  </div>
                  {submission.marks !== null && (
                    <div className="bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${getProgressColor(percentage)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTab;