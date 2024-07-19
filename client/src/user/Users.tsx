import { trpc } from "../utils/trpc";
import { useSearchParams } from "react-router-dom";

export function Users() {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");
  if (!page) {
    page = "1";
  }
  const workersQuery = trpc.getUsers.useQuery({ page: Number(page) });

  return (
    <div>
      {/* Todo: make this table responsive */}
      <table className="w-full text-sm text-left mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>avatar</th>
          </tr>
        </thead>
        <tbody>
          {workersQuery.isLoading && (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          )}
          {workersQuery.isError && (
            <tr>
              <td colSpan={5}>Error: {workersQuery.error.message}</td>
            </tr>
          )}
          {workersQuery.data?.map((worker) => (
            <tr key={worker.id} className="hover:bg-blue-200 h-10">
              <td>{worker.id}</td>
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
