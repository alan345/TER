import { Link } from "react-router-dom"
import { CaretRight, CaretLeft } from "@phosphor-icons/react"

type Props = {
  page: number
  total: number
  limit: number
}
const Pagination = (props: Props) => {
  return (
    <div className="flex justify-end items-center mt-4">
      {props.page > 1 && (
        <Link to={`?page=${props.page - 1}`} className="link mr-2">
          <CaretLeft />
        </Link>
      )}
      {props.page}
      {props.page * props.limit < props.total && (
        <Link className="link ml-2" to={`?page=${props.page + 1}`}>
          <CaretRight />
        </Link>
      )}
    </div>
  )
}
export default Pagination
