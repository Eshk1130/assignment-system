import React from 'react';
import { BookOpen, Users, FileText, ChevronRight } from 'lucide-react';

const CourseCard = ({ course, assignmentCount, studentCount, onClick }) => {
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
  ];

  const gradient = gradients[parseInt(course.id.slice(-1)) % gradients.length];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover-lift cursor-pointer animate-fadeIn"
    >
      {/* Course Header with Gradient */}
      <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium opacity-90 mb-1">{course.code}</p>
            <h3 className="text-xl font-bold mb-2">{course.name}</h3>
            <p className="text-sm opacity-90">{course.semester}</p>
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{assignmentCount}</p>
              <p className="text-xs text-gray-600">Assignments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{studentCount}</p>
              <p className="text-xs text-gray-600">Students</p>
            </div>
          </div>
        </div>

        {/* View Course Button */}
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium text-gray-700 transition-colors">
          View Course
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;