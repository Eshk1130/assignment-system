import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, assignment }) => {
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setIsChecked(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else if (isChecked) {
      onConfirm();
      onClose();
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsChecked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {step === 1 ? 'Confirm Submission' : 'Final Confirmation'}
          </h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to mark <strong>{assignment?.title}</strong> as submitted?
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Please ensure you have uploaded your work to the provided Drive link before confirming.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="confirm-check"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600"
              />
              <label htmlFor="confirm-check" className="text-sm text-gray-700">
                I confirm that I have successfully uploaded my assignment to the Google Drive link provided and verified that the file is accessible.
              </label>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800 font-medium">
                ⚠️ This action cannot be undone. Your submission will be locked.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={step === 2 && !isChecked}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              step === 2 && !isChecked
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {step === 1 ? 'Continue' : 'Confirm Submission'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;