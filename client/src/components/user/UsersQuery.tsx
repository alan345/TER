import { trpc } from "../../utils/trpc"
import { LoadingTemplate } from "../../template/LoadingTemplate"
import { ErrorTemplate } from "../../template/ErrorTemplate"

type Props = {
  page: number
}
const UsersQuery = (props: Props) => {
  const dataQuery = trpc.getUsers.useQuery({ page: props.page })
  if (dataQuery.isLoading) return <LoadingTemplate />
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />

  return (
    <>
      {dataQuery.data?.users.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.image && <img src={user.image} width="50px" />}</td>
        </tr>
      ))}
    </>
  )
}
export default UsersQuery
