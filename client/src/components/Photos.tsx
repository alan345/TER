import { ErrorTemplate } from "../template/ErrorTemplate"
import { LoadingTemplate } from "../template/LoadingTemplate"
import { trpc } from "../utils/trpc"
import { useSearchParams } from "react-router-dom"

export const Photos = () => {
  const [searchParams] = useSearchParams()
  let sizeUrl = searchParams.get("size")

  const initSize = 6
  const finalSize = sizeUrl ? Number(sizeUrl) : initSize

  const dataQuery = trpc.getPhotos.useQuery({ size: finalSize })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />

  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Photo</th>
          </tr>
        </thead>

        <tbody>
          {dataQuery.data?.map((singleElement) => (
            <tr key={singleElement.id}>
              <td>{singleElement.id}</td>
              <td>{singleElement.title}</td>
              <td>
                <img className="w-10 h-10" src={singleElement.thumbnailUrl} alt={singleElement.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
