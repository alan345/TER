import { useLocation } from "react-router-dom"
import { trpc } from "../../utils/trpc"
import ErrorTemplate from "../../template/ErrorTemplate"
import Pagination from "./Pagination"
import ImgAvatar from "../../template/layout/ImgAvatar"
import Search from "../search/Search"
import { Devices, CloudWarning } from "@phosphor-icons/react"
import utils from "../../utils/utils"
import DeviceImage from "./DeviceImage"

const DevicesPage = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = query.get("page")
  const search = query.get("search") || undefined
  const dataQuery = trpc.getDevices.useQuery({ page: utils.sanitizePage(page), search })
  if (dataQuery.isError) return <ErrorTemplate message={dataQuery.error.message} />

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center">
            <Devices className="text-3xl mr-3" />
            <h1>Devices</h1>
          </div>

          <p>This page is private. You can access it only when logged in.</p>
          <div className="mt-4 mb-4">
            <Search />
          </div>
          <table>
            <thead>
              <tr>
                <th>userAgent</th>
                <th>Created At</th>
                <th>Last Login At</th>
                <th>User</th>
                {/* <th>Email</th>
                <th>Avatar</th> */}
              </tr>
            </thead>
            <tbody>
              {dataQuery.data?.devices.map((device) => (
                <tr key={device.id}>
                  <td>
                    <DeviceImage deviceName={utils.getDeviceName(device.userAgent)} />
                    {utils.getDeviceName(device.userAgent)}
                  </td>
                  <td>{new Date(device.createdAt).toLocaleString()}</td>
                  <td>{device.lastLoginAt ? new Date(device.lastLoginAt).toLocaleString() : ""}</td>
                  {/* <td>{user.email}</td> */}
                  <td>
                    <ImgAvatar src={device.user.image} alt="Profile Image" className="w-10 h-10" />
                    <span>{device.user.name}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {dataQuery.data?.devices.length === 0 && (
            <div className="flex justify-center items-center mt-10">
              <div className="flex items-center gap-2">
                <CloudWarning className="text-4xl text-orange-400" />
                <div>No users found</div>
              </div>
            </div>
          )}
          {dataQuery.isLoading && <div>Loading...</div>}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="sticky bottom-0 h-10 mr-6 mt-4">
          <div className="flex justify-end">
            {dataQuery.data && (
              <Pagination limit={dataQuery.data.limit} page={dataQuery.data.page} total={dataQuery.data.total} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevicesPage
