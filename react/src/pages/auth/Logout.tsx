import React from "react";
import { Link } from "@material-ui/core";
import { PostsContext } from "../../Context";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { userClass } from "../user/User.type";

export default function Logout() {
  const context = React.useContext(PostsContext);
  const history = useHistory();

  const logout = async () => {
    history.push("/");
    localStorage.setItem("AUTH_TOKEN", "");
    context.updateUser(userClass);
  };

  return (
    <>
      <Link onClick={logout}>
        <Button variant="contained" color="primary">
          Logout
        </Button>
      </Link>
    </>
  );
}
