import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

//mock data
const INITIAL_DATA = {
  users: [
    { id: 'S001', name: 'Eshmeet Kaur', role: 'student', identifier: '2021001' },
    { id: 'S002', name: 'Bani Kaur', role: 'student', identifier: '2021002' },
    { id: 'S003', name: 'Hargun Grover', role: 'student', identifier: '2021003' },
    { id: 'S004', name: 'Akshit Gautum', role: 'student', identifier: '2021004' },
    { id: 'T001', name: 'Dr. Amit Seth', role: 'teacher', identifier: '9876543210' },
    { id: 'T002', name: 'Prof. Poonam Garg', role: 'teacher', identifier: '9876543211' },
  ],
  assignments: [
    {
      id: 'A001',
      title: 'React Fundamentals Project',
      description:
        'Build a complete React application demonstrating core concepts including hooks, components, and state management.',
      driveLink: 'https://drive.google.com/drive/folders/example1',
      dueDate: '2025-11-15',
      createdBy: 'T001',
      createdAt: '2025-10-20',
      totalMarks: 100,
    },
    {
      id: 'A002',
      title: 'Database Design Assignment',
      description:
        'Design and implement a normalized database schema for an e-commerce system.',
      driveLink: 'https://drive.google.com/drive/folders/example2',
      dueDate: '2025-11-10',
      createdBy: 'T001',
      createdAt: '2025-10-18',
      totalMarks: 50,
    },
    {
      id: 'A003',
      title: 'Algorithm Analysis Report',
      description:
        'Analyze time and space complexity of sorting algorithms with practical examples.',
      driveLink: 'https://drive.google.com/drive/folders/example3',
      dueDate: '2025-11-20',
      createdBy: 'T002',
      createdAt: '2025-10-22',
      totalMarks: 75,
    },
  ],
  submissions: [
    {
      id: 'SUB001',
      assignmentId: 'A001',
      studentId: 'S001',
      status: 'submitted',
      submittedAt: '2025-11-05T10:30:00Z',
      confirmedAt: '2025-11-05T10:32:00Z',
      marks: 85,
    },
    {
      id: 'SUB002',
      assignmentId: 'A002',
      studentId: 'S001',
      status: 'submitted',
      submittedAt: '2025-11-08T14:20:00Z',
      confirmedAt: '2025-11-08T14:22:00Z',
      marks: 45,
    },
    {
      id: 'SUB003',
      assignmentId: 'A001',
      studentId: 'S002',
      status: 'submitted',
      submittedAt: '2025-11-06T09:15:00Z',
      confirmedAt: '2025-11-06T09:17:00Z',
      marks: 92,
    },
    {
      id: 'SUB004',
      assignmentId: 'A002',
      studentId: 'S003',
      status: 'submitted',
      submittedAt: '2025-11-09T16:45:00Z',
      confirmedAt: '2025-11-09T16:47:00Z',
      marks: 48,
    },
  ],
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('users');
    const storedAssignments = localStorage.getItem('assignments');
    const storedSubmissions = localStorage.getItem('submissions');

    if (storedUser) setCurrentUser(JSON.parse(storedUser));

    setUsers(storedUsers ? JSON.parse(storedUsers) : INITIAL_DATA.users);
    setAssignments(storedAssignments ? JSON.parse(storedAssignments) : INITIAL_DATA.assignments);
    setSubmissions(storedSubmissions ? JSON.parse(storedSubmissions) : INITIAL_DATA.submissions);
  }, []);

useEffect(() => {
  try {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = JSON.parse(localStorage.getItem('users') || "null");
    const storedAssignments = JSON.parse(localStorage.getItem('assignments') || "null");
    const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || "null");

    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    setUsers(Array.isArray(storedUsers) && storedUsers.length ? storedUsers : INITIAL_DATA.users);
    setAssignments(Array.isArray(storedAssignments) && storedAssignments.length ? storedAssignments : INITIAL_DATA.assignments);
    setSubmissions(Array.isArray(storedSubmissions) && storedSubmissions.length ? storedSubmissions : INITIAL_DATA.submissions);
  } catch (error) {
    console.error("Error loading localStorage data:", error);
    setUsers(INITIAL_DATA.users);
    setAssignments(INITIAL_DATA.assignments);
    setSubmissions(INITIAL_DATA.submissions);
  }
}, []);


  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

 const login = (identifier, role) => {
  console.log("DEBUG USERS:", users); 
  const user = users.find(u => u.identifier === identifier && u.role === role);
  if (user) {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
};

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: `A${Date.now()}`,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAssignments([...assignments, newAssignment]);
  };

  const addSubmission = (assignmentId) => {
    const newSubmission = {
      id: `SUB${Date.now()}`,
      assignmentId,
      studentId: currentUser.id,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      confirmedAt: new Date().toISOString(),
      marks: null,
    };
    setSubmissions([...submissions, newSubmission]);
  };

  const updateSubmissionMarks = (submissionId, marks) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, marks: parseInt(marks) } : sub
      )
    );
  };

  const value = {
    currentUser,
    users,
    assignments,
    submissions,
    login,
    logout,
    addAssignment,
    addSubmission,
    updateSubmissionMarks,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
