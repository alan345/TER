import ErrorTemplate from "../template/ErrorTemplate"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { SizeTable } from "../template/SizeTable"
import { trpc } from "../utils/trpc"
import { useSearchParams } from "react-router-dom"

export const Beers = () => {
  const [searchParams] = useSearchParams()
  const sizeUrl = searchParams.get("size")

  const initSize = 6
  const finalSize = sizeUrl ? Number(sizeUrl) : initSize

  const dataQuery = trpc.getBeers.useQuery({ size: finalSize })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />

  return (
    <div className="p-6">
      <h1>Beers</h1>
      <div className="flex justify-between">
        <SizeTable initSize={initSize} />
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Style</th>
            </tr>
          </thead>

          <tbody>
            {dataQuery.data?.map((singleElement) => (
              <tr key={singleElement.id}>
                <td>{singleElement.id}</td>
                <td>{singleElement.brand}</td>
                <td>{singleElement.name}</td>
                <td>{singleElement.style}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
