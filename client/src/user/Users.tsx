import { trpc } from "../utils/trpc";
import { useSearchParams } from "react-router-dom";
import { SizeUsersTable } from "./SizeUsersTable";
import { LoadingTemplate } from "../template/LoadingTemplate";
import { ErrorTemplate } from "../template/ErrorTemplate";

export function Users() {
  const [searchParams] = useSearchParams();
  let sizeUrl = searchParams.get("size");

  const initSize = 6;
  const finalSize = sizeUrl ? Number(sizeUrl) : initSize;

  const workersQuery = trpc.getUsers.useQuery(
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
      <SizeUsersTable initSize={initSize} />

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
              <td className="whitespace-nowrap px-6 py-2 ">{worker.id}</td>
              <td>{worker.first_name}</td>
              <td>{worker.last_name}</td>
              <td>{worker.email}</td>
              <td>
                <img src={worker.avatar} width="60px" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
