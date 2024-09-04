import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./redux/actions/userAction";

// Lazy loadings

//Defalt pages
const LoadingScreen = lazy(()=>import("./components/lodingScreen/LoadingScreen"))
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/auth/Login"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));

//User
const UserHome = lazy(() => import("./pages/user/UserHome"));
const UserProfile = lazy(()=>import("./pages/user/UserProfile"));
const UserEditProfile = lazy(()=>import("./pages/user/UserEditProfile"))
const UserPurchasedCourses = lazy(()=>import("./pages/user/UserPurchasedCourses"))

//Admin
const AdminDash = lazy(() => import("./pages/admin/AdminDash"));
const AdminCourse = lazy(() => import("./pages/admin/AdminCourse/AdminCourse"));
const AdminDashBoard  = lazy(() => import("./pages/admin/AdminDashBoard/AdminDashBoard"));
const AdminStudents = lazy(()=>import("./pages/admin/AdminStudents/AdminStudents"))
const AdminInstructor = lazy(()=>import("./pages/admin/AdminInstructor/AdminInstructor"))
const AdminInsractureRequest = lazy(()=>import("./pages/admin/AdminInsractureRequest/AdminInsractureRequest"))
const InstractureRequestDetails = lazy(()=>import("./pages/admin/AdminInsractureRequest/InstractureRequestDetails"))

//Instructore 
const InstructorDash = lazy(() => import("./pages/instracture/InstructorDash"));
const InstractureDashboard = lazy(() => import("./pages/instracture/InsreactureDashBoard/InstractureDashboard"));
const InstractureProfile = lazy(() => import("./pages/instracture/InstructorProfile/InstractureProfile"));
const InstractureCourses = lazy(() => import("./pages/instracture/InstructorCourse/InstractureCourses"));

function App() {
  const { user } = useSelector((state) => state.user);
  // console.log("Current user........",user);
  const dispatch = useDispatch();

  useEffect(()=>{
    // console.log("Current fetching controller",user);
    
    if(!user){
      dispatch(getUserData()).then(()=>{
        console.log("Current user Data....>>...>>",user);
      })
    }
  },[dispatch, user])

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          
          <Route path="/" element={user ? <Navigate to={getRedirectPath(user.role)} /> : <LandingPage />} />

          {/* Public routes  */}
          <Route path="/index" element={user ? <Navigate to={getRedirectPath(user.role)} /> : <LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route path="/home/*" element={user ?  <StudentRoute /> : <Navigate to="/index" />} />
          <Route path="/admin/*" element={user && user.role === "admin" ? <AdminRoutes /> : <Navigate to="/" />} />
          <Route path="/instructor/*" element={user && user.role === "instructor" ? <InstructorRoutes /> : <Navigate to="/" />} />

          {/* Defalt route */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function getRedirectPath(role) {
  switch (role) {
    case "admin":
      return "/admin";
    case "instructor":
      return "/instructor";
    default:
      return "/home";
  }
}

function StudentRoute(){
  return(
    <Routes>
      <Route path="/" element={<UserHome/>}/>
      <Route path="profile" element={<UserProfile/>}/>
      <Route path="profile/edit" element={<UserEditProfile/>}/>
      <Route path="purchasedCourses" element={<UserPurchasedCourses/>}/>
    </Routes>
  )
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDash/>}/>
      <Route path="dashboard" element={<AdminDashBoard />} />
      <Route path="courses" element={<AdminCourse />} />
      <Route path="student" element={<AdminStudents/>}/>
      <Route path="instructor" element={<AdminInstructor/>}/>
      <Route path="instructorRequest" element={<AdminInsractureRequest/>}/>
      <Route path="instructorRequest/:id" element={<InstractureRequestDetails/>}/>
    </Routes>
  );
  
}

function InstructorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InstructorDash />} />
      <Route path="dashboard" element={<InstractureDashboard />} />
      <Route path="profile" element={<InstractureProfile />} />
      <Route path="courses" element={<InstractureCourses />} />
    </Routes>
  );
}

export default App;
