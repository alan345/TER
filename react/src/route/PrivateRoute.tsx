import React from "react";
import { Route } from "react-router-dom";
import { PostsContext } from "../Context";
import Login from "../pages/auth/Login";

type Props = {
  component: any;
  path: string;
};

const PrivateRoute = (props: Props) => {
  const context = React.useContext(PostsContext);

  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) => (
        <>{context.user?.id ? <Component {...props} /> : <Login />}</>
      )}
    />
  );
};
export default PrivateRoute;
