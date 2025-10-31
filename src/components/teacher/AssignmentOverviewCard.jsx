import React from 'react';
import { Calendar, Users, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const AssignmentOverviewCard = ({ assignment, stats, onClick }) => {
  const { submitted, total, submissionRate } = stats;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {assignment.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {assignment.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Due: {formatDate(assignment.dueDate)}
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          {assignment.totalMarks} marks
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Submission Progress</span>
          <span className="font-medium text-gray-900">
            {submitted}/{total} students
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              submissionRate === 100 ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${submissionRate}%` }}
          />
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {submitted === total ? (
            <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              All Submitted
            </span>
          ) : (
            <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
              <Clock className="w-3 h-3" />
              {total - submitted} Pending
            </span>
          )}
        </div>
        
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          Drive
        </a>
      </div>
    </div>
  );
};

export default AssignmentOverviewCard;