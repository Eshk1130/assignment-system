export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const getDaysUntilDue = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getStatusColor = (daysUntil) => {
  if (daysUntil < 0) return 'text-red-600 bg-red-50';
  if (daysUntil <= 3) return 'text-orange-600 bg-orange-50';
  return 'text-green-600 bg-green-50';
};

export const getProgressColor = (percentage) => {
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-blue-500';
  return 'bg-orange-500';
};

export const getAssignmentStats = (assignmentId, submissions, students) => {
  const assignmentSubmissions = submissions.filter(
    sub => sub.assignmentId === assignmentId
  );
  
  const submitted = assignmentSubmissions.length;
  const total = students.length;
  const pending = total - submitted;
  const submissionRate = total > 0 ? (submitted / total) * 100 : 0;
  
  return { submitted, total, pending, submissionRate };
};