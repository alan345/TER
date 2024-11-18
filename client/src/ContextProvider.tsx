import React from "react"
import { trpc } from "./utils/trpc"

type ContextType = {
  me: {
    id: string
    name: string
    image: string | null
  } | null
  decoded: {
    id: string
    exp: number
    iat: number
  } | null
  updateUser: () => void
  isLoading: boolean
}
const initialContext: ContextType = {
  me: null,
  decoded: null,
  isLoading: false,
  updateUser: () => {},
}
export const AppContext = React.createContext<ContextType>(initialContext)

type Props = {
  children: React.ReactNode
}

const ContextProvider = (props: Props) => {
  const getAuthQuery = trpc.getAuth.useQuery(undefined, { retry: false })

  const [isLoading, setIsLoading] = React.useState(false)
  const [me, setMe] = React.useState<ContextType["me"]>(null)
  const [decoded, setDecoded] = React.useState<ContextType["decoded"]>(null)
  const updateUser = async () => {
    await getAuthQuery.refetch()
  }

  React.useEffect(() => {
    setIsLoading(getAuthQuery.isLoading)
    if (getAuthQuery.isError) {
      setMe(null)
      return
    }
    if (getAuthQuery.data) {
      if (getAuthQuery.data.user) {
        setMe(getAuthQuery.data.user)
      }
      if (getAuthQuery.data.decoded) {
        setDecoded(getAuthQuery.data.decoded)
      }
    }
  }, [getAuthQuery])

  return (
    <AppContext.Provider
      value={{
        me,
        decoded,
        isLoading,
        updateUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
export default ContextProvider
