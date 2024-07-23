import { trpc } from "../../utils/trpc";
import { useSearchParams } from "react-router-dom";
import { SizeTable } from "../../template/SizeTable";
import { LoadingTemplate } from "../../template/LoadingTemplate";
import { ErrorTemplate } from "../../template/ErrorTemplate";

export function Users() {
  const [searchParams] = useSearchParams();
  let sizeUrl = searchParams.get("size");

  const initSize = 6;
  const finalSize = sizeUrl ? Number(sizeUrl) : initSize;

  const dataQuery = trpc.getUsers.useQuery({ size: finalSize });
  if (dataQuery.isLoading) return <LoadingTemplate />;
  if (dataQuery.isError)
    return <ErrorTemplate message={dataQuery.error.message} />;

  return (
    <div>
      <div className="flex justify-between mt-4">
        <p>
          This page is Protected. You need to be logged in to see this page.
        </p>
        <SizeTable initSize={initSize} />
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>

          <tbody>
            {dataQuery.data?.map((worker) => (
              <tr key={worker.id}>
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
    </div>
  );
}
