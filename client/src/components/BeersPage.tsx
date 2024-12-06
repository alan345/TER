import ErrorTemplate from "../template/ErrorTemplate"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { SizeTable } from "../template/SizeTable"
import { trpc } from "../utils/trpc"
import { useSearchParams } from "react-router-dom"
import { BeerStein } from "@phosphor-icons/react"
const BeersPage = () => {
  const [searchParams] = useSearchParams()
  const sizeUrl = searchParams.get("size")

  const initSize = 6
  const finalSize = sizeUrl ? Number(sizeUrl) : initSize

  const dataQuery = trpc.getBeers.useQuery({ size: finalSize })
  if (dataQuery.isLoading) return <LoadingTemplate />

  return (
    <div className="p-6">
      <div className="flex items-center">
        <BeerStein className="text-3xl mr-3" />
        <h1>Beers</h1>
      </div>
      <p>This page is public. Both logged-in and non-logged-in users can access it.</p>
      <p>
        This data comes from an external API:{" "}
        <a className="link" href="https://random-data-api.com" target="_blank" rel="noopener noreferrer">
          Random Data API
        </a>
        .
      </p>
      <div className="flex items-center mt-4 mb-4">
        <SizeTable initSize={initSize} />
        <span className="ml-1">Beers per page</span>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table-auto border-collapse w-full">
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

        {dataQuery.isError && <ErrorTemplate message={dataQuery.error.message} />}
      </div>
    </div>
  )
}

export default BeersPage
