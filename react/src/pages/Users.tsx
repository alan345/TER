import React from "react";
import { gql, useQuery } from "@apollo/client";
import { User } from "./model/User";
import { useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core/";
import Search from "./Search";
import PaginationApp from "./PaginationApp";
import DeleteUser from "./DeleteUser";

export const QUERY = gql`
  query UsersPagination($page: Float!, $where: UserWhereInput) {
    usersPagination(page: $page, where: $where) {
      users {
        id
        name
        email
      }
      count
      take
    }
  }
`;

const Users = () => {
  const queryString = require("query-string");

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const page = parsed.page ? Number(parsed.page) : 1;

  const { data } = useQuery(QUERY, {
    variables: {
      where: {
        search: parsed.search,
      },
      page,
    },
  });

  return (
    <>
      <h3>Users</h3>
      <Search />
      <div style={{ height: "15px" }} />
      {data?.usersPagination?.users && (
        <>
          {data.usersPagination.users.map((user: User) => (
            <Grid container key={user.id} spacing={2}>
              <Grid item>
                <DeleteUser userId={user.id} />
              </Grid>
              <Grid item>
                {user.name} ({user.email})
              </Grid>
            </Grid>
          ))}
          <div style={{ height: "20px" }} />

          <PaginationApp
            count={data.usersPagination.count}
            take={data.usersPagination.take}
          />
        </>
      )}
    </>
  );
};
export default Users;
