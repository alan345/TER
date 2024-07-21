import { ErrorTemplate } from "../template/ErrorTemplate";
import { LoadingTemplate } from "../template/LoadingTemplate";
import { SizeTable } from "../template/SizeTable";
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
      refetchOnWindowFocus: false,
    }
  );
  if (workersQuery.isLoading) return <LoadingTemplate />;
  if (workersQuery.isError)
    return <ErrorTemplate message={workersQuery.error.message} />;

  return (
    <div>
      <div className="flex justify-between mt-4">
        <p>
          This page is Public. You dont need to be logged in to see this page.
        </p>
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
    </div>
  );
}
