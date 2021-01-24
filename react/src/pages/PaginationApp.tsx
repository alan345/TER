import React from "react"
import { Pagination } from "@material-ui/lab"
import { useHistory, useLocation } from "react-router-dom"
import { ParamTypes } from "../ParamTypes.type"
import { useParams } from "react-router"

// interface Props {
//   count: number
//   take: number
// }

const PaginationApp = (props: any) => {
  const params: ParamTypes = useParams<ParamTypes>()
  const queryString = require("query-string")
  const page = Number(params.page)
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  console.log(parsed)

  const history = useHistory()
  const onChange = (event: any, page: number) => {
    parsed.search = page
    history.push("?" + queryString.stringify(parsed))

    // history.push(`/users/${page}?${queryString.stringify(parsed)}`)
  }

  return (
    <>
      <Pagination
        count={Math.ceil(props.count / props.take)}
        onChange={onChange}
        page={page}
      />
    </>
  )
}
export default PaginationApp
