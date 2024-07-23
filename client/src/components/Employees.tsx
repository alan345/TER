import { trpc } from "../utils/trpc";
import { useSearchParams } from "react-router-dom";
import { SizeTable } from "../template/SizeTable";
import { LoadingTemplate } from "../template/LoadingTemplate";
import { ErrorTemplate } from "../template/ErrorTemplate";

export function Employees() {
  const [searchParams] = useSearchParams();
  let sizeUrl = searchParams.get("size");

  const initSize = 6;
  const finalSize = sizeUrl ? Number(sizeUrl) : initSize;

  const dataQuery = trpc.getEmployees.useQuery({ size: finalSize });
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
              <th>Name</th>
              <th>Age</th>
              <th>Salary</th>
            </tr>
          </thead>

          <tbody>
            {dataQuery.data?.map((singleElement) => (
              <tr key={singleElement.id}>
                <td>{singleElement.id}</td>
                <td>{singleElement.employee_name}</td>
                <td>{singleElement.employee_age}</td>
                <td>${singleElement.employee_salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
