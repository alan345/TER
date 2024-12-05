import {
  AndroidLogo,
  DeviceMobileCamera,
  DeviceTablet,
  WindowsLogo,
  Desktop,
  DesktopTower,
  Laptop,
} from "@phosphor-icons/react"

type Props = {
  deviceName: "" | "iPhone" | "iPad" | "Android Device" | "Windows PC" | "Mac" | "Linux PC" | "Chromebook"
}

const DeviceImage = (props: Props) => {
  if (props.deviceName === "iPhone") return <DeviceMobileCamera className="text-3xl" />
  if (props.deviceName === "Android Device") return <AndroidLogo className="text-3xl" />
  if (props.deviceName === "iPad") return <DeviceTablet className="text-3xl" />
  if (props.deviceName === "Windows PC") return <WindowsLogo className="text-3xl" />
  if (props.deviceName === "Mac") return <Desktop className="text-3xl" />
  if (props.deviceName === "Linux PC") return <DesktopTower className="text-3xl" />
  if (props.deviceName === "Chromebook") return <Laptop className="text-3xl" />

  return null
}

export default DeviceImage
