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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Avatar</th>
          </tr>
        </thead>

        <tbody>
          {workersQuery.data?.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.brand}</td>
              <td>{worker.name}</td>
              <td>{worker.style}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {workersQuery.isLoading && <div>Loading...</div>}
      {workersQuery.isError && <div>Error: {workersQuery.error.message}</div>}
    </div>
  );
}
