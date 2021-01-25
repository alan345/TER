import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PostsContext } from "../Context";

type Props = {
  component: any;
  path: string;
};

const PublicRoute = (props: Props) => {
  const context = React.useContext(PostsContext);

  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) => (
        <>{context.user?.id ? <Redirect to="/" /> : <Component {...props} />}</>
      )}
    />
  );
};
export default PublicRoute;
