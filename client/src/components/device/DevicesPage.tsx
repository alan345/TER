import { Link, useLocation } from "react-router-dom"
import { trpc } from "../../utils/trpc"
import ErrorTemplate from "../../template/ErrorTemplate"
import Pagination from "../../layout/Pagination"
import ImgAvatar from "../../layout/ImgAvatar"
import { Devices, CloudWarning } from "@phosphor-icons/react"
import utils from "../../utils/utils"
import DeviceImage from "./DeviceImage"
import ChipUserId from "../user/ChipUserId"
import DeleteDevice from "./DeleteDevice"
import React from "react"
import { AppContext } from "../../ContextProvider"

const DevicesPage = () => {
  const context = React.useContext(AppContext)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = query.get("page")
  const search = query.get("search") || undefined
  const userId = query.get("userId") || undefined
  const dataQuery = trpc.getDevices.useQuery({ page: utils.sanitizePage(page), search, userId })
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
            {userId && <ChipUserId userId={userId} />}
            {/* <Search /> */}
          </div>

          <div className="overflow-x-auto w-full">
            <table className="table-auto ">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Created At</th>
                  <th>Last Login At</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataQuery.data?.devices.map((device) => (
                  <tr key={device.id}>
                    <td>
                      <DeviceImage
                        deviceName={utils.getDeviceName(device.userAgent)}
                        className={`text-3xl ${device.id === context.deviceId ? "text-[#034DA2]" : ""}`}
                      />
                      <div className={`${device.id === context.deviceId ? "text-[#034DA2]" : ""}`}>
                        {utils.getDeviceName(device.userAgent)}
                      </div>
                      {device.ip && device.ip !== "::1" && <div className="text-xxs">{device.ip}</div>}
                    </td>
                    <td>{new Date(device.createdAt).toLocaleString()}</td>
                    <td>{device.lastLoginAt ? new Date(device.lastLoginAt).toLocaleString() : ""}</td>
                    <td>
                      <ImgAvatar src={device.user.image} alt="Profile Image" className="w-10 h-10" />
                      <Link className="link" to={`/users?userId=${device.user.id}`}>
                        <span>{device.user.name}</span>
                      </Link>
                    </td>
                    <td>
                      <DeleteDevice deviceId={device.id} onDelete={() => dataQuery.refetch()} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {dataQuery.data?.devices.length === 0 && (
            <div className="flex justify-center items-center mt-10">
              <div className="flex items-center gap-2">
                <CloudWarning className="text-4xl text-orange-400" />
                <div>No devices found</div>
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
