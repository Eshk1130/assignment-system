import React, { useState } from 'react';
import { HelpCircle, X, User, Users, Shield, CheckCircle, Calendar, ExternalLink, Bell } from 'lucide-react';
import { FileText, TrendingUp } from "lucide-react";


const DemoGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-40 flex items-center justify-center"
        title="Help & Instructions"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Help Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">📚 Student Guide</h2>
                  <p className="text-blue-100">How to use the Assignment Management System</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick Start */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-5">
                <h3 className="font-bold text-blue-900 mb-3 text-lg flex items-center gap-2">
                   Quick Start
                </h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 min-w-[20px]">1.</span>
                    <span>View your enrolled courses on the main dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 min-w-[20px]">2.</span>
                    <span>Click on any course to see assignments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 min-w-[20px]">3.</span>
                    <span>Submit work to the provided Google Drive link</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 min-w-[20px]">4.</span>
                    <span>Acknowledge your submission on the platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600 min-w-[20px]">5.</span>
                    <span>Track your progress in the Progress tab</span>
                  </li>
                </ol>
              </div>

              {/* Understanding Assignment Types */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">📋 Assignment Types</h3>

                {/* Individual Assignments */}
                <div className="mb-4 bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-base">
                        Individual Assignments
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        You work alone and must personally acknowledge your submission
                      </p>
                    </div>
                  </div>
                  <div className="ml-13 space-y-2 bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-900">📝 How to Submit:</p>
                    <ol className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>1. Complete your assignment work</li>
                      <li>2. Upload your file to the provided Google Drive link</li>
                      <li>3. Return to this platform and click <strong>"Mark Submitted"</strong></li>
                      <li>4. Confirm in the verification dialog</li>
                      <li>5. Your submission will be recorded with a timestamp</li>
                    </ol>
                  </div>
                </div>

                {/* Group Assignments */}
                <div className="mb-4 bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-base flex items-center gap-2">
                        Group Assignments
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Group</span>
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Work with your team - only the group leader can acknowledge submission
                      </p>
                    </div>
                  </div>
                  
                  {/* For Group Leaders */}
                  <div className="ml-13 space-y-3">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-amber-900 flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4" />
                        If You're the Group Leader:
                      </p>
                      <ol className="text-sm text-gray-700 space-y-1 ml-4">
                        <li>1. Coordinate with your team members</li>
                        <li>2. Ensure all members contribute to the work</li>
                        <li>3. Upload the final group submission to Google Drive</li>
                        <li>4. Click <strong>"Acknowledge Submission"</strong> on the platform</li>
                        <li>5. Confirm - this will mark the assignment as submitted for <strong>all group members</strong></li>
                      </ol>
                      <p className="text-xs text-amber-700 mt-2 font-medium">
                        ⚠️ Only you can acknowledge the submission for your entire team
                      </p>
                    </div>

                    {/* For Group Members */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4" />
                        If You're a Group Member:
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                        <li>Contribute to your group's work</li>
                        <li>Wait for your group leader to acknowledge submission</li>
                        <li>Once the leader acknowledges, it will automatically show as submitted in your dashboard</li>
                        <li>You cannot acknowledge the submission yourself</li>
                      </ul>
                    </div>

                    {/* No Group Warning */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-red-900 flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4" />
                        Not in a Group Yet?
                      </p>
                      <p className="text-sm text-gray-700">
                        If you see a warning that you're not part of any group for a group assignment, you need to:
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc mt-2">
                        <li>Form a new group with classmates, OR</li>
                        <li>Join an existing group</li>
                        <li>Contact your professor if you need help finding a group</li>
                      </ul>
                      <p className="text-xs text-red-700 mt-2 font-medium">
                        ⚠️ You cannot submit group assignments without being part of a group
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Understanding the Dashboard */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">🎯 Dashboard Features</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Assignments Tab */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Assignments Tab
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• View pending assignments</li>
                      <li>• See submission deadlines</li>
                      <li>• Access Google Drive links</li>
                      <li>• Acknowledge submissions</li>
                      <li>• View completed work</li>
                    </ul>
                  </div>

                  {/* Progress Tab */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Progress Tab
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Track completion rate</li>
                      <li>• View total marks earned</li>
                      <li>• See average score</li>
                      <li>• Detailed grade breakdown</li>
                      <li>• Performance analytics</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Badge Legend */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3"> Badge Meanings</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Group
                    </span>
                    <span className="text-gray-600">This is a group assignment - coordinate with your team</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Leader
                    </span>
                    <span className="text-gray-600">You are the group leader - you can acknowledge for the team</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Submitted
                    </span>
                    <span className="text-gray-600">Assignment has been acknowledged as submitted</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      X days left
                    </span>
                    <span className="text-gray-600">Time remaining until deadline</span>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                  ⚠️ Important Notes
                </h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Always upload your work to Google Drive <strong>before</strong> acknowledging on the platform</li>
                  <li>• Double-check your file is accessible before confirming submission</li>
                  <li>• Once you acknowledge, the submission is locked and cannot be undone</li>
                  <li>• Keep track of deadlines - late submissions may not be accepted</li>
                  <li>• For group work, communicate regularly with your team members</li>
                  <li>• Contact your professor if you have any issues or questions</li>
                </ul>
              </div>

              {/* Need Help */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <h3 className="font-bold text-blue-900 mb-2">Need Additional Help?</h3>
                <p className="text-sm text-blue-800 mb-3">
                  If you have questions or encounter any issues, please contact your course instructor or teaching assistant.
                </p>
                <p className="text-xs text-blue-600">
                  Tip: Take a screenshot if you encounter any errors to help with troubleshooting
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 rounded-b-xl">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Got it! Let's get started 
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoGuide;