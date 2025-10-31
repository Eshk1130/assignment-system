import React from 'react';
import { Calendar, CheckCircle, Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { formatDate, getDaysUntilDue, getStatusColor } from '../../utils/helpers';

const AssignmentCard = ({ assignment, onSubmit, isSubmitted, submission }) => {
  const daysUntil = getDaysUntilDue(assignment.dueDate);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
              Mark Submitted
            </button>
          )}
          {isSubmitted && submission.marks !== null && (
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