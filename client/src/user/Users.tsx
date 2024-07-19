import { trpc } from "../utils/trpc";
import { useSearchParams } from "react-router-dom";
import { SizeUsersTable } from "./SizeUsersTable";
import React from "react";

export function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  let sizeUrl = searchParams.get("size");
  const finalSize = sizeUrl ? Number(sizeUrl) : 2;

  const [sizeInput, setSizeInput] = React.useState(sizeUrl || "2");

  const workersQuery = trpc.getUsers.useQuery(
    { size: Number(finalSize) },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleSubmit = () => {
    setSearchParams({ size: sizeInput });
  };

  return (
    <div>
      {/* <SizeUsersTable setSize={(size) => setSize(size)} /> */}

      <>
        <input
          type="number"
          value={sizeInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          onChange={(e) => setSizeInput(e.target.value)}
        />
      </>

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
