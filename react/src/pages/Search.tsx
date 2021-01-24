import React, { useState } from "react";
import { FormControl, InputLabel, Input, Grid } from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory, useLocation } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const queryString = require("query-string");
  const parsed = queryString.parse(location.search);

  const [search, setSearch] = useState(parsed.search ? parsed.search : "");

  const onKeyPress = (data: any) => {
    if (data.charCode === 13) {
      searchF();
    }
  };

  const searchF = () => {
    parsed.search = search;
    parsed.page = 1;
    history.push("?" + queryString.stringify(parsed));
  };
  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="search">{`Search`}</InputLabel>
          <Input
            endAdornment={
              <InputAdornment position="end">
                {parsed.search ? (
                  <ClearIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSearch("");
                      delete parsed.search;

                      history.push("?" + queryString.stringify(parsed));
                    }}
                  />
                ) : (
                  <SearchIcon style={{ cursor: "pointer" }} onClick={searchF} />
                )}
              </InputAdornment>
            }
            id="search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            type="text"
            onKeyPress={onKeyPress}
            value={search}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default Search;
