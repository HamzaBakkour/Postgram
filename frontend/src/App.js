//src/App.js
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profiel";
import EditProfile from "./pages/EditProfile";
import VerificationLinkSent from "./pages/VerificationLinkSent";
import PasswordReset from "./pages/PasswordReset";
import ChangePassword from "./components/profile/ChangePassword";


function App(){

  return(
    <Routes>

      <Route path = "/" element = {
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }/>


      <Route path = "/register/" element = {<Registration />}/>

      <Route path = "/verify/" element = {<VerificationLinkSent />} />

      <Route path = "/login/" element = {<Login />}/>

      <Route path = "/post/:postId" element = {
        <ProtectedRoute>
          <SinglePost />
        </ProtectedRoute>
      }/>

      <Route
      path = "/profile/:profileId/"
      element = {
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }/>

      <Route
      path = "/profile/:profileId/edit/"
      element = {
        <ProtectedRoute>
          <EditProfile/>
        </ProtectedRoute>
      }/>


    <Route
          path = "/passwordreset/:token/"
          element = {
              <PasswordReset/>
          }/>

    <Route
          path = "/changepassrod/:user_email/"
          element = {
              <ProtectedRoute>
                <ChangePassword/>
              </ProtectedRoute>
          }/>

    </Routes>
  );
} 

export default App;

