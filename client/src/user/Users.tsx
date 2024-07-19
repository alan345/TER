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
      <table className="min-w-full table-fixed w-full">
        <thead className="border-b border-neutral-200  dark:border-white/10 text-left">
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
              <td className="whitespace-nowrap px-6 py-2 ">{worker.id}</td>
              <td className="whitespace-nowrap px-6 py-2">
                {worker.first_name}
              </td>
              <td className="whitespace-nowrap px-6 py-2">
                {worker.last_name}
              </td>
              <td className="whitespace-nowrap px-6 py-2">{worker.email}</td>
              <td className="whitespace-nowrap px-6 py-2">
                <img src={worker.avatar} width="60px" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
