import { CreateWorkerDialog } from "./CreateWorkerDialog";
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
      {/* Todo: After the creation, we can update 1 line instead of the whole table*/}
      <CreateWorkerDialog onSuccess={workersQuery.refetch} />

      {/* Todo: make this table responsive */}
      <table className="w-full text-sm text-left mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th></th>
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
            <tr key={worker.id} className="hover:bg-[#0B6081] h-10">
              <td>{worker.id}</td>
              <td>{worker.first_name}</td>
              <td>{worker.last_name}</td>
              <td>{worker.email}</td>
              <td>{worker.avatar}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
