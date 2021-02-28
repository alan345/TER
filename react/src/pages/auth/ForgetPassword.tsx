import React from "react";
import { TextField, Button } from "@material-ui/core/";
import { gql, useMutation } from "@apollo/client";
import { Typography } from "@material-ui/core";
import { PostsContext } from "../../Context";
import { useHistory } from "react-router-dom";

const MUTATION = gql`
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;
const ForgetPassword = () => {
  const history = useHistory();
  const context = React.useContext(PostsContext);
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [forgetPassword] = useMutation(MUTATION);

  React.useEffect(() => {
    if (context.user.id) {
      history.push("/");
    }
  }, [context]);

  const loginF = async () => {
    let dataUser;
    try {
      dataUser = await forgetPassword({
        variables: {
          email,
        },
      });
    } catch (e) {
      e.graphQLErrors.some((graphQLError: any) =>
        setMessage(graphQLError.message)
      );
    }
    if (dataUser?.data?.forgetPassword) {
      setMessage(
        "🥳 Success! Please check the terminal to get the content of the email sent to the user"
      );
    }
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      loginF();
    }
  };
  return (
    <>
      <h3>Forget Password</h3>

      <div>
        <TextField
          id="email"
          label="email"
          value={email}
          onKeyPress={handleKeyPress}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={{ height: "15px" }} />
      <div>
        <Button variant={"outlined"} color={"primary"} onClick={loginF}>
          ForgetPassword
        </Button>
      </div>
      <Typography color={"secondary"}>{message}</Typography>
    </>
  );
};
export default ForgetPassword;
