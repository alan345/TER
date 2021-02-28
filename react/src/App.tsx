import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Me from "./Me";

import { PostsContext, postsContextDefaultValue } from "./Context";
import { Card, CardContent } from "@material-ui/core/";
import RouteApp from "./route/RouteApp";

export default function BasicExample() {
  const [user, setUser] = React.useState(postsContextDefaultValue.user);

  const updateUser = React.useCallback(
    (user: any) => {
      console.log("updateUser");
      setUser(user);
    },
    [setUser, user]
  );

  return (
    <PostsContext.Provider value={{ user, updateUser }}>
      <Router>
        <Header />
        <Me />
        <Card elevation={3}>
          <CardContent>
            <RouteApp />
          </CardContent>
        </Card>
      </Router>
    </PostsContext.Provider>
  );
}
