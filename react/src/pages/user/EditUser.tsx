import React from "react";
import { Button, TextField } from "@material-ui/core/";
import { gql, useMutation } from "@apollo/client";
import { User } from "./User";

const MUTATION = gql`
  mutation UpdateUser($data: UserUpdateInput!, $userId: String!) {
    updateUser(data: $data, userId: $userId) {
      id
      name
    }
  }
`;

interface Props {
  user: User;
  onCancel: () => void;
  onUpdate: () => void;
}
const EditUser = (props: Props) => {
  // const client = useApolloClient();
  const [message, setMessage] = React.useState("");
  const [user, setUser] = React.useState(props.user);

  const [updateUser] = useMutation(MUTATION);

  const editUserF = async () => {
    let dataUser;
    try {
      dataUser = await updateUser({
        variables: {
          data: {
            name: user.name,
          },
          userId: props.user.id,
        },
      });
    } catch (e) {
      e.graphQLErrors.some((graphQLError: any) =>
        setMessage(graphQLError.message)
      );
    }
    if (dataUser?.data?.updateUser) {
      setMessage("");
      props.onUpdate();
      // client.resetStore();
    }
  };

  return (
    <>
      <TextField
        id="name"
        label="name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <div style={{ height: "10px" }} />
      <div>
        <Button variant={"outlined"} color={"default"} onClick={props.onCancel}>
          Cancel
        </Button>{" "}
        <Button variant={"outlined"} color={"primary"} onClick={editUserF}>
          Save
        </Button>
        <div className="secondary">{message}</div>
      </div>
    </>
  );
};
export default EditUser;
