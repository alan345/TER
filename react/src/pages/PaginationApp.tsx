import React from "react";
import { Pagination } from "@material-ui/lab";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
  count: number;
  take: number;
}

const PaginationApp = (props: Props) => {
  const queryString = require("query-string");

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const page = parsed.page ? Number(parsed.page) : 1;

  const history = useHistory();
  const onChange = (event: any, page: number) => {
    parsed.page = page;
    history.push("?" + queryString.stringify(parsed));
  };

  return (
    <>
      <Pagination
        count={Math.ceil(props.count / props.take)}
        onChange={onChange}
        page={page}
      />
    </>
  );
};
export default PaginationApp;
