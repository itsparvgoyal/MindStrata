import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Error from './pages/Error.jsx'
import MainLayout from './pages/MainLayout.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import Profile from './pages/Profile.jsx'
import AddCourse from './pages/AddCourse.jsx'
import Settings from './pages/Settings.jsx'
import MyCourses from './pages/MyCourses.jsx'
import EditCourse from './pages/EditCourse.jsx'
import AllCourses from './pages/AllCourses.jsx'
import EnrolledCourses from './pages/EnrolledCourses.jsx'
import CourseDetails from './components/All courses/CourseDetails.jsx'
import LearnCourse from './components/Learn Course/LearnCourse.jsx'
import VideoSection from './components/Learn Course/VideoSection.jsx'
import ContactUs from './pages/ContactUs.jsx'

import Cart from "./pages/Cart.jsx";

const App = () => {
  return (
    <div className='w-screen min-h-screen flex flex-col font-inter bg-black '>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contactUs" element={<ContactUs />} />

          <Route path='/changePassword'
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            } />

          <Route path='/resetpassword'
            element={
                <ResetPassword />
            } />


          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="addCourse" element={<AddCourse />} />
            <Route path="settings" element={< Settings />} />
            <Route path="editCourse/:courseID" element={<EditCourse />} />
            <Route path="my-courses" element={< MyCourses />} />
            <Route path="enrolledCourses" element={<EnrolledCourses />} />
            <Route path="cart" element={<Cart />} />
          </Route>


          <Route path="courses" element={<AllCourses />} />
          <Route path="courseDetails/:courseID" element={<CourseDetails />} />
          <Route
            path="/learnCourse/:courseID"
            element={
              <ProtectedRoute>
                <LearnCourse />
              </ProtectedRoute>
            }
          >
            <Route
              path="section/:sectionID/subsection/:subSectionID"
              element={<VideoSection />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App