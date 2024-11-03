import { trpc } from "../utils/trpc"
import { useSearchParams } from "react-router-dom"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { ErrorTemplate } from "../template/ErrorTemplate"

export const Facts = () => {
  const [searchParams] = useSearchParams()
  let sizeUrl = searchParams.get("size")

  const initSize = 6
  const finalSize = sizeUrl ? Number(sizeUrl) : initSize

  const dataQuery = trpc.getFacts.useQuery({ size: finalSize })
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
              <th>Fact</th>
              <th>Length</th>
            </tr>
          </thead>

          <tbody>
            {dataQuery.data?.map((singleElement) => (
              <tr key={singleElement.fact}>
                <td>{singleElement.fact}</td>
                <td>{singleElement.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
