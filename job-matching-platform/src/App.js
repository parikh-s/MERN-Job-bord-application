// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import ProtectedRoute from './components/ProtectedRoute';
// import PostJob from './components/PostJob';
// import Profile from './components/Profile';
// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/home" element={
//           <ProtectedRoute>
//             <Home />
//           
//           </ProtectedRoute>
//         } />
//         {/* Add other protected routes here */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import PostJob from './components/PostJob';
import Profile from './components/Profile';
import JobSearch from './components/JobSearch';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
<Route path='/postjpb' element={
  <ProtectedRoute>
    <PostJob />
  </ProtectedRoute>
} />
<Route path='/profile' element={

  <ProtectedRoute>
    <Profile ></Profile>
  </ProtectedRoute>
} />

       
<Route path="/search-jobs" element={
  <ProtectedRoute>
    <JobSearch />
  </ProtectedRoute>
} />

      </Routes>
    </Router>
  );
}

export default App;

