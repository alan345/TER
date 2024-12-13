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
  className: string
  deviceName: "" | "iPhone" | "iPad" | "Android Device" | "Windows PC" | "Mac" | "Linux PC" | "Chromebook"
}

const DeviceImage = (props: Props) => {
  if (props.deviceName === "iPhone") return <DeviceMobileCamera className={props.className} />
  if (props.deviceName === "Android Device") return <AndroidLogo className={props.className} />
  if (props.deviceName === "iPad") return <DeviceTablet className={props.className} />
  if (props.deviceName === "Windows PC") return <WindowsLogo className={props.className} />
  if (props.deviceName === "Mac") return <Desktop className={props.className} />
  if (props.deviceName === "Linux PC") return <DesktopTower className={props.className} />
  if (props.deviceName === "Chromebook") return <Laptop className={props.className} />

  return null
}

export default DeviceImage
