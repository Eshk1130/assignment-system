import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Enhanced Initial Data with Courses and Groups
const INITIAL_DATA = {
  users: [
    // Students
    { id: 'S001', name: 'Eshmeet Kaur', role: 'student', identifier: '2021001', email: 'eshmeet@university.edu' },
    { id: 'S002', name: 'Bani Kaur', role: 'student', identifier: '2021002', email: 'bani@university.edu' },
    { id: 'S003', name: 'Hargun Grover', role: 'student', identifier: '2021003', email: 'hargun@university.edu' },
    { id: 'S004', name: 'Akshit Gautum', role: 'student', identifier: '2021004', email: 'akshit@university.edu' },
    { id: 'S005', name: 'Daman', role: 'student', identifier: '2021005', email: 'daman@university.edu' },
    { id: 'S006', name: 'Isha Kaur', role: 'student', identifier: '2021006', email: 'isha@university.edu' },
    // Teachers
    { id: 'T001', name: 'Dr. Amit Seth', role: 'teacher', identifier: '9876543210', email: 'amit.seth@university.edu' },
    { id: 'T002', name: 'Prof. Poonam Garg', role: 'teacher', identifier: '9876543211', email: 'poonam.garg@university.edu' },
  ],
  courses: [
    { 
      id: 'C001', 
      name: 'Web Development', 
      code: 'CS301', 
      teacherId: 'T001',
      semester: 'Fall 2025',
      studentIds: ['S001', 'S002', 'S003', 'S004']
    },
    { 
      id: 'C002', 
      name: 'Data Structures', 
      code: 'CS201', 
      teacherId: 'T001',
      semester: 'Fall 2025',
      studentIds: ['S001', 'S002', 'S005', 'S006']
    },
    { 
      id: 'C003', 
      name: 'Database Systems', 
      code: 'CS302', 
      teacherId: 'T002',
      semester: 'Fall 2025',
      studentIds: ['S002', 'S003', 'S004', 'S005', 'S006']
    },
  ],
  assignments: [
    // Individual Assignments
    {
      id: 'A001',
      title: 'React Hooks Assignment',
      description: 'Build a custom hook for form validation. Every student must submit individually.',
      driveLink: 'https://drive.google.com/drive/folders/example1',
      dueDate: '2025-11-15T23:59:00',
      courseId: 'C001',
      createdBy: 'T001',
      createdAt: '2025-10-20',
      totalMarks: 100,
      submissionType: 'individual',
    },
    {
      id: 'A002',
      title: 'Algorithm Complexity Report',
      description: 'Individual analysis of sorting algorithm time complexity.',
      driveLink: 'https://drive.google.com/drive/folders/example2',
      dueDate: '2025-11-20T23:59:00',
      courseId: 'C002',
      createdBy: 'T001',
      createdAt: '2025-10-22',
      totalMarks: 75,
      submissionType: 'individual',
    },
    
    // Group Assignments
    {
      id: 'A003',
      title: 'E-Commerce Database Design (Group)',
      description: 'Design and implement a normalized database schema. GROUP ASSIGNMENT - Only team leader can acknowledge submission.',
      driveLink: 'https://drive.google.com/drive/folders/example3',
      dueDate: '2025-11-18T23:59:00',
      courseId: 'C001',
      createdBy: 'T001',
      createdAt: '2025-10-18',
      totalMarks: 50,
      submissionType: 'group',
    },
    {
      id: 'A004',
      title: 'SQL Optimization Project (Group)',
      description: 'Optimize complex queries and create performance reports. GROUP ASSIGNMENT - Team leader acknowledgment required.',
      driveLink: 'https://drive.google.com/drive/folders/example4',
      dueDate: '2025-11-25T23:59:00',
      courseId: 'C003',
      createdBy: 'T002',
      createdAt: '2025-10-25',
      totalMarks: 60,
      submissionType: 'group',
    },
    {
      id: 'A005',
      title: 'Data Structure Implementation (Group)',
      description: 'Implement custom data structures as a team. GROUP ASSIGNMENT.',
      driveLink: 'https://drive.google.com/drive/folders/example5',
      dueDate: '2025-11-22T23:59:00',
      courseId: 'C002',
      createdBy: 'T001',
      createdAt: '2025-10-23',
      totalMarks: 80,
      submissionType: 'group',
    },
  ],
  groups: [
    // Group 1
    {
      id: 'G001',
      name: 'Team Alpha',
      courseId: 'C001',
      assignmentId: 'A003',
      leaderId: 'S001', // esh is leader
      memberIds: ['S001', 'S002', 'S003'],
      createdAt: '2025-10-21',
    },
    // Group 2
    {
      id: 'G002',
      name: 'Team Beta',
      courseId: 'C003',
      assignmentId: 'A004',
      leaderId: 'S004',
      memberIds: ['S004', 'S005'],
      createdAt: '2025-10-26',
    },
    // Group 3
    {
      id: 'G003',
      name: 'Team Gamma',
      courseId: 'C002',
      assignmentId: 'A005',
      leaderId: 'S001', 
      memberIds: ['S001', 'S002'],
      createdAt: '2025-10-24',
    },
    // isha (S006) is NOT in any group for Assignment A004 - will see "no group" message
  ],
  submissions: [
    // Individual submission example
    {
      id: 'SUB001',
      assignmentId: 'A001',
      studentId: 'S002', 
      groupId: null,
      status: 'submitted',
      submittedAt: '2025-11-06T09:15:00Z',
      acknowledgedAt: '2025-11-06T09:17:00Z',
      marks: 92,
    },
    // Group submission example - Leader esh acknowledged for whole group
    {
      id: 'SUB002',
      assignmentId: 'A003',
      studentId: null, // No individual student - it's a group submission
      groupId: 'G001',
      status: 'submitted',
      submittedAt: '2025-11-08T14:20:00Z',
      acknowledgedAt: '2025-11-08T14:22:00Z',
      acknowledgedBy: 'S001', // esh acknowledged
      marks: 45,
    },
  ],
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [toast, setToast] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize data on first mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedCourses = localStorage.getItem('courses');
    const storedAssignments = localStorage.getItem('assignments');
    const storedSubmissions = localStorage.getItem('submissions');
    const storedGroups = localStorage.getItem('groups');
    const storedUser = localStorage.getItem('currentUser');

    // If no data in localStorage, use initial data
    if (!storedUsers || !storedCourses) {
      console.log('Initializing with default data...');
      setUsers(INITIAL_DATA.users);
      setCourses(INITIAL_DATA.courses);
      setAssignments(INITIAL_DATA.assignments);
      setSubmissions(INITIAL_DATA.submissions);
      setGroups(INITIAL_DATA.groups);
      
      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(INITIAL_DATA.users));
      localStorage.setItem('courses', JSON.stringify(INITIAL_DATA.courses));
      localStorage.setItem('assignments', JSON.stringify(INITIAL_DATA.assignments));
      localStorage.setItem('submissions', JSON.stringify(INITIAL_DATA.submissions));
      localStorage.setItem('groups', JSON.stringify(INITIAL_DATA.groups));
    } else {
      console.log('Loading data from localStorage...');
      setUsers(JSON.parse(storedUsers));
      setCourses(JSON.parse(storedCourses));
      setAssignments(JSON.parse(storedAssignments));
      setSubmissions(JSON.parse(storedSubmissions));
      setGroups(JSON.parse(storedGroups));
    }

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    setIsInitialized(true);
  }, []);

  // Persist data to localStorage when it changes
  useEffect(() => {
    if (isInitialized && users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users, isInitialized]);

  useEffect(() => {
    if (isInitialized && courses.length > 0) {
      localStorage.setItem('courses', JSON.stringify(courses));
    }
  }, [courses, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('assignments', JSON.stringify(assignments));
    }
  }, [assignments, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('submissions', JSON.stringify(submissions));
    }
  }, [submissions, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('groups', JSON.stringify(groups));
    }
  }, [groups, isInitialized]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = (identifier, role) => {
    const user = users.find(u => u.identifier === identifier && u.role === role);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      showToast(`Welcome back, ${user.name}!`, 'success');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully', 'info');
  };

  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: `A${Date.now()}`,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAssignments([...assignments, newAssignment]);
    showToast('Assignment created successfully!', 'success');
  };

  const addSubmission = (assignmentId, groupId = null) => {
    const newSubmission = {
      id: `SUB${Date.now()}`,
      assignmentId,
      studentId: groupId ? null : currentUser.id,
      groupId,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      acknowledgedAt: new Date().toISOString(),
      acknowledgedBy: groupId ? currentUser.id : null,
      marks: null,
    };
    setSubmissions([...submissions, newSubmission]);
    showToast('Submission acknowledged successfully!', 'success');
  };

  const updateSubmissionMarks = (submissionId, marks) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId ? { ...sub, marks: parseInt(marks) } : sub
    ));
    showToast('Marks updated successfully!', 'success');
  };

  const createGroup = (groupData) => {
    const newGroup = {
      ...groupData,
      id: `G${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setGroups([...groups, newGroup]);
    showToast('Group created successfully!', 'success');
  };

  const value = {
    currentUser,
    users,
    courses,
    assignments,
    submissions,
    groups,
    toast,
    login,
    logout,
    addAssignment,
    addSubmission,
    updateSubmissionMarks,
    createGroup,
    showToast,
  };

  // Don't render until initialized
  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>;
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
