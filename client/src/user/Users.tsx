import { trpc } from "../utils/trpc";
import { useSearchParams } from "react-router-dom";

export function Users() {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");
  if (!page) {
    page = "1";
  }
  const workersQuery = trpc.getUsers.useQuery(
    { page: Number(page) },
    { retry: false, refetchOnWindowFocus: false }
  );

  return (
    <div>
      {/* Todo: make this table responsive */}

      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-start text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10 text-left">
                  <tr>
                    <th scope="col" className="px-6 py-2">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-2">
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Avatar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workersQuery.isLoading && <div>Loading...</div>}
                  {workersQuery.isError && (
                    <div>Error: {workersQuery.error.message}</div>
                  )}

                  {workersQuery.data?.map((worker) => (
                    <tr
                      key={worker.id}
                      className="border-b border-neutral-200 dark:border-white/10 hover:bg-[#CF4EC1] h-20"
                    >
                      <td className="whitespace-nowrap px-6 py-2 font-medium">
                        {worker.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {worker.first_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {worker.last_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {worker.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2">
                        {" "}
                        <img src={worker.avatar} width="60px" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
