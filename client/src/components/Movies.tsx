import { ErrorTemplate } from "../template/ErrorTemplate"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { trpc } from "../utils/trpc"
import { useSearchParams } from "react-router-dom"

export const Movies = () => {
  const [searchParams] = useSearchParams()
  let sizeUrl = searchParams.get("size")

  const initSize = 6
  const finalSize = sizeUrl ? Number(sizeUrl) : initSize

  const dataQuery = trpc.getMovies.useQuery({ size: finalSize })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />

  return (
    <div>
      <div className="flex justify-between mt-4">
        <p>This page is Public. You dont need to be logged in to see this page.</p>
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {dataQuery.data?.map((singleElement) => (
              <tr key={singleElement.id}>
                <td>{singleElement.id}</td>
                <td>{singleElement.movie}</td>
                <td>{singleElement.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
