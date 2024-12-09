import React from "react"
import iconAvatar from "@ter/client/src/assets/icons/avatar.svg"

type Props = {
  src?: React.ImgHTMLAttributes<HTMLImageElement>["src"] | null
  alt: React.ImgHTMLAttributes<HTMLImageElement>["alt"]
  className: React.HTMLAttributes<HTMLImageElement>["className"]
}
const ImgAvatar = (props: Props) => {
  return (
    <img
      src={props.src ? props.src : iconAvatar}
      className={`${props.className} rounded-full shadow-lg transition-transform duration-200 transform hover:scale-110 border-2 border-gray-300 hover:border-[#034DA2]`}
      alt={props.alt}
    />
  )
}
export default ImgAvatar
