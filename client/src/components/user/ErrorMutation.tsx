import { TRPCClientErrorLike } from "@trpc/client"
import { AppRouter } from "../../../../server"

type Props = {
  data: TRPCClientErrorLike<AppRouter>
}

const ErrorMutation = (props: Props) => {
  if (!props.data.message) return null

  let parsedMessage
  try {
    parsedMessage = JSON.parse(props.data.message)[0].message
  } catch {
    parsedMessage = props.data.message
  }

  return <p className="text-red-600">Error: {parsedMessage}</p>
}

export default ErrorMutation
