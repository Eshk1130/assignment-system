import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import Toast from './components/common/Toast';

const AppContent = () => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <LoginPage />;
  }

  if (currentUser.role === 'student') {
    return <StudentDashboard />;
  }

  if (currentUser.role === 'teacher') {
    return <TeacherDashboard />;
  }

  return null;
};

function App() {
  return (
    <AppProvider>
      <AppContent />
      <Toast />
    </AppProvider>
  );
}

export default App;