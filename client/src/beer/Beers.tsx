import { ErrorTemplate } from "../template/ErrorTemplate";
import { LoadingTemplate } from "../template/LoadingTemplate";
import { trpc } from "../utils/trpc";
import { useSearchParams } from "react-router-dom";

export function Beers() {
  const [searchParams] = useSearchParams();
  let sizeUrl = searchParams.get("size");

  const initSize = 6;
  const finalSize = sizeUrl ? Number(sizeUrl) : initSize;

  const workersQuery = trpc.getBeers.useQuery(
    { size: finalSize },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  if (workersQuery.isLoading) return <LoadingTemplate />;
  if (workersQuery.isError)
    return <ErrorTemplate message={workersQuery.error.message} />;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Brand</th>
            <th scope="col">Name</th>
            <th scope="col">Style</th>
          </tr>
        </thead>

        <tbody>
          {workersQuery.data?.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.brand}</td>
              <td>{worker.name}</td>
              <td>{worker.style}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
