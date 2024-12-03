import { Link } from "react-router-dom"
import { CaretRight, CaretLeft } from "@phosphor-icons/react"

type Props = {
  page: number
  total: number
  limit: number
}
const Pagination = (props: Props) => {
  const isLastPage = props.page * props.limit < props.total
  return (
    <div className="flex">
      <div className="min-w-28">
        {props.page * props.limit - (props.limit - 1)} - {!isLastPage ? props.total : props.page * props.limit} of{" "}
        {props.total}
      </div>
      <div className="flex items-center">
        {props.page > 1 ? (
          <Link to={`?page=${props.page - 1}`} className="link mr-2 hover:bg-gray-100 rounded-full p-1">
            <CaretLeft />
          </Link>
        ) : (
          <div className="mr-2 p-1">
            <CaretLeft className="text-gray-400" />
          </div>
        )}
        {isLastPage ? (
          <Link className="link ml-2 hover:bg-gray-100 rounded-full p-1" to={`?page=${props.page + 1}`}>
            <CaretRight />
          </Link>
        ) : (
          <div className="ml-2 p-1">
            <CaretRight className="text-gray-400" />
          </div>
        )}
      </div>
    </div>
  )
}
export default Pagination
