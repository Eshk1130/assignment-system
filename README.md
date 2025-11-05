# Student Assignment Management System

A comprehensive dashboard for managing student assignments with role-based access for students and teachers.

##  Project Structure

src/
├── contexts/
│   └── AppContext.jsx          
├── utils/
│   └── helpers.js              
├── components/
│   ├── common/
│   │   ├── Header.jsx          
│   │   ├── TabNavigation.jsx   
│   │   └── ConfirmationModal.jsx 
        |__DemoGuide.jsx
        |__Toast.jsx 
│   ├── student/
│   │   ├── AssignmentCard.jsx  
│   │   ├── AssignmentsTab.jsx  
│   │   ├── ProgressTab.jsx     
│   │   └── StudentDashboard.jsx
│   ├── teacher/
│   │   ├── AssignmentForm.jsx  
│   │   ├── AssignmentOverviewCard.jsx 
│   │   ├── StudentProgressView.jsx
│   │   └── TeacherDashboard.jsx
│   └── LoginPage.jsx           
├── App.jsx                     
├── index.css                   
└── index.js                    


## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Create React App
```bash
npx create-react-app student-assignment-system
cd student-assignment-system
```

2. Install Dependencies
```bash
npm install lucide-react
# or
yarn add lucide-react
```

3. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Configure Tailwind - Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Copy All Component Files - Copy each component file into the appropriate directory as shown in the project structure above.

6. Run the Application
```bash
npm start
# or
yarn start
```

##  Demo Credentials

### Student Login
- **Roll Number:** `2021001`, `2021002`, `2021003`, `2021004`
- **Role:** Student

### Teacher Login
- **Phone Number:** `9876543210`, `9876543211`
- **Role:** Teacher

##  Features

### For Students
-  View pending and submitted assignments
-  Double-verification submission flow
-  Progress tracking with detailed analytics
-  Assignment marks and grade visualization
-  Direct access to Google Drive submission links

### For Teachers
-  Create and manage assignments
-  View submission statistics per assignment
-  Track individual student progress with progress bars
-  Assign marks to student submissions
-  Visual analytics for class performance

##  Data Persistence

The application uses **localStorage** for data persistence:
- User authentication state
- Assignment data
- Submission records
- Marks and grades

Data persists across browser sessions and page refreshes.

##  Tech Stack

- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **Context API** - State management
- **localStorage** - Data persistence

##  Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

##  Customization

### Adding More Students/Teachers
Edit `INITIAL_DATA` in `src/contexts/AppContext.jsx`:

```javascript
users: [
  { 
    id: 'S005', 
    name: 'New Student', 
    role: 'student', 
    identifier: '2021005' 
  },
  // ... more users
]
```

### Modifying Styles
Update Tailwind classes in component files or add custom CSS in `src/index.css`.

## Troubleshooting

### Lucide Icons Not Showing
Make sure you've installed lucide-react:
```bash
npm install lucide-react
```

### Tailwind Styles Not Applied
1. Check `tailwind.config.js` content paths
2. Ensure `@tailwind` directives are in `index.css`
3. Restart development server

### localStorage Data Issues
Clear application data:
```javascript
// In browser console
localStorage.clear();
// Then refresh the page

