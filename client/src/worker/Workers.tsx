import { CreateWorkerDialog } from "./CreateWorkerDialog";
import { trpc } from "../utils/trpc";
import { Pagination } from "../Pagination";
import { useSearchParams } from "react-router-dom";
import { CloseWorker } from "./CloseWorker";
import { CreatePayoutDialog } from "./CreatePayoutDialog";

export function Workers() {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");
  if (!page) {
    page = "1";
  }
  const workersQuery = trpc.getWorkers.useQuery({ page: Number(page) });

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
          {workersQuery.data?.data.map((worker) => (
            <tr key={worker.id} className="hover:bg-[#0B6081] h-10">
              <td>{worker.id}</td>
              <td>{worker.createdAt}</td>
              <td>{worker.profile.email}</td>
              <td>{worker.profile.phoneNumber}</td>
              <td>{worker.status}</td>
              <td>
                {worker.status !== "manual_review" &&
                  worker.status !== "closed" && (
                    <>
                      <div>
                        <CloseWorker
                          id={worker.id}
                          onSuccess={workersQuery.refetch}
                        />
                      </div>
                      <div className="my-1">
                        <CreatePayoutDialog
                          workerId={worker.id}
                          onSuccess={() => console.log("ok")}
                        />
                      </div>
                    </>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {workersQuery.data && (
        <div className="mt-4">
          <Pagination count={workersQuery.data.count} />
        </div>
      )}
    </div>
  );
}
