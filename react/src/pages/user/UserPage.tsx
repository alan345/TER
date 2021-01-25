import React from "react";
import { useParams } from "react-router";
import { User } from "./User";
// import { Button } from "@material-ui/core/";
import { gql, useQuery } from "@apollo/client";
import { ParamTypes } from "../../ParamTypes.type";

export const QUERY = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      id
      name
      email
      lastLogin
    }
  }
`;

const UserPage = () => {
  const params: ParamTypes = useParams<ParamTypes>();
  const userId = params.userId;

  const { data } = useQuery(QUERY, {
    variables: {
      userId,
    },
  });

  if (!data?.user) return null;
  const user: User = data.user;
  return (
    <div>
      <h3>User</h3>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Last Login: {user.lastLogin}</div>
    </div>
  );
};
export default UserPage;
