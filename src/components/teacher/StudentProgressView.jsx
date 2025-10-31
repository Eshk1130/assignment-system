import React, { useState } from 'react';
import { X, CheckCircle, Clock, Calendar, TrendingUp } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const StudentProgressView = ({ 
  isOpen, 
  onClose, 
  assignment, 
  students, 
  submissions,
  onUpdateMarks 
}) => {
  const [editingMarks, setEditingMarks] = useState({});

  if (!isOpen || !assignment) return null;

  const handleMarksChange = (submissionId, value) => {
    setEditingMarks(prev => ({ ...prev, [submissionId]: value }));
  };

  const handleMarksSave = (submissionId) => {
    const marks = parseInt(editingMarks[submissionId]);
    if (!isNaN(marks) && marks >= 0 && marks <= assignment.totalMarks) {
      onUpdateMarks(submissionId, marks);
      setEditingMarks(prev => {
        const newState = { ...prev };
        delete newState[submissionId];
        return newState;
      });
    }
  };

  const studentData = students.map(student => {
    const submission = submissions.find(
      sub => sub.studentId === student.id && sub.assignmentId === assignment.id
    );
    return { student, submission };
  });

  const submittedCount = studentData.filter(d => d.submission).length;
  const submissionRate = students.length > 0 
    ? (submittedCount / students.length) * 100 
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {assignment.title}
              </h2>
              <p className="text-gray-600">{assignment.description}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Assignment Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Due: {formatDate(assignment.dueDate)}
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Total Marks: {assignment.totalMarks}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {submittedCount}/{students.length} Submitted
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Overall Progress</span>
              <span className="text-gray-600">{submissionRate.toFixed(0)}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  submissionRate === 100 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${submissionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Submissions</h3>
          
          <div className="space-y-3">
            {studentData.map(({ student, submission }) => {
              const isEditing = editingMarks[submission?.id] !== undefined;
              
              return (
                <div 
                  key={student.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        submission ? 'bg-green-100' : 'bg-gray-200'
                      }`}>
                        {submission ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Roll: {student.identifier}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {submission ? (
                        <>
                          <div className="text-sm text-gray-600">
                            {formatDate(submission.submittedAt)}
                          </div>
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={editingMarks[submission.id]}
                                onChange={(e) => handleMarksChange(submission.id, e.target.value)}
                                min="0"
                                max={assignment.totalMarks}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                              />
                              <button
                                onClick={() => handleMarksSave(submission.id)}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingMarks(prev => {
                                  const newState = { ...prev };
                                  delete newState[submission.id];
                                  return newState;
                                })}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleMarksChange(
                                submission.id, 
                                submission.marks?.toString() || ''
                              )}
                              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                            >
                              {submission.marks !== null ? (
                                <span className="text-blue-600">
                                  {submission.marks}/{assignment.totalMarks}
                                </span>
                              ) : (
                                <span className="text-gray-600">Assign Marks</span>
                              )}
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          Not Submitted
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Individual Progress Bar */}
                  {submission && submission.marks !== null && (
                    <div className="mt-3">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            (submission.marks / assignment.totalMarks) * 100 >= 80 
                              ? 'bg-green-500' 
                              : (submission.marks / assignment.totalMarks) * 100 >= 60 
                              ? 'bg-blue-500' 
                              : 'bg-orange-500'
                          }`}
                          style={{ 
                            width: `${(submission.marks / assignment.totalMarks) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressView;