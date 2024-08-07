import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './pages/Signup'
import OpenRoute from './components/core/Auth/OpenRoute'
import Login from './pages/Login'
import VerifyOtp from './pages/VerifyOtp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile/MyProfile'
import Setting from './components/core/Dashboard/Settings/Setting'
import Bookmarks from './components/core/Dashboard/Bookmarks/Bookmarks'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart/Cart'
import AddCourse from './components/core/Dashboard/AddCourse/index'
import { useSelector } from 'react-redux'
import InstructorDashboard from './components/core/Dashboard/InstructorDashboard.jsx'
import MyCourses from './components/core/Dashboard/MyCourses/index.jsx'
import EditCourse from './components/core/Dashboard/EditCourse/index.jsx'
import Catalog from './pages/Catalog.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import { ACCOUNT_TYPE } from './utils/constants.js'
import VideoDetails from './components/core/CourseReview/VideoDetails.jsx'
import Error from './pages/Error.jsx'
import Terms from './pages/Terms.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import RefundPolicy from './pages/RefundPolicy.jsx'
function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path='/login'
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          } />

        <Route
          path='/signup'
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          } />

        <Route
          path='/verify-email'
          element={
            <OpenRoute>
              <VerifyOtp />
            </OpenRoute>
          } />

        {/* <Route path="/catalog/:catalog" element={<Catalog />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {
            user?.accountType === 'Student' && (
              <>
                <Route path='dashboard/bookmarked-courses' element={<Bookmarks />} />
                <Route path='dashboard/enrolled-courses' element={<EnrolledCourses />} />
                <Route path='dashboard/cart' element={<Cart />} />
              </>
            )
          }
          {
            user?.accountType === 'Instructor' && (
              <>
                <Route path='dashboard/my-courses' element={<MyCourses />} />
                <Route path='/dashboard/add-course' element={<AddCourse />} />
                <Route path='/dashboard/instructor' element={<InstructorDashboard />}/>
                <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />}/>
              </>
            )
          }
          <Route path='dashboard/my-profile' element={<MyProfile />} />
          <Route path='dashboard/settings' element={<Setting />} />          
        </Route>
        <Route path='/catalog/:catalogName' element={<Catalog />} />
        <Route path='/courses/:courseId' element={<CourseDetail />} />

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>

          {
            user && ACCOUNT_TYPE.STUDENT === user.accountType && 
            (
              <>
                <Route element={<VideoDetails />} path='/view-course/:courseId/section/:sectionId/sub-section/:subSectionId'></Route>
              </>
            )
          }
        </Route>
        <Route path="terms-and-condition" element={<Terms/>} />
        <Route path="privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="refund-policy" element={<RefundPolicy/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App

