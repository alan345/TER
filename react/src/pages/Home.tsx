import React from "react";
import { useHistory } from "react-router-dom";
import { PostsContext } from "../Context";
import { Link } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const context = React.useContext(PostsContext);
  React.useEffect(() => {
    console.log(context.user.id === "");
    if (!context.user.id) {
      history.push("/login");
    }
  }, [context]);

  return (
    <>
      <h3>Home</h3>
      Hello {context.user.name}. Your email is {context.user.email}
      <div>
        <Link to={`/user/${context.user.id}`}>My profile</Link>
      </div>
    </>
  );
};

export default Home;
