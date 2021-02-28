import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Users from "../pages/user/Users";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import User from "../pages/user/UserPage";

export default function RouteApp() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <PublicRoute path="/signup" component={Signup} />
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/forgetPassword" component={ForgetPassword} />
      <PublicRoute
        path="/resetPassword/:resetPasswordToken"
        component={ResetPassword}
      />

      <PrivateRoute path="/users" component={Users} />
      <PrivateRoute path="/user/:userId" component={User} />
    </Switch>
  );
}
