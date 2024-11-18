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
  updateAuth: () => void
  isLoadingAuth: boolean
}
const initialContext: ContextType = {
  me: null,
  decoded: null,
  isLoadingAuth: false,
  updateAuth: () => {},
}
export const AppContext = React.createContext<ContextType>(initialContext)

type Props = {
  children: React.ReactNode
}

const ContextProvider = (props: Props) => {
  const getAuthQuery = trpc.getAuth.useQuery(undefined, { retry: false })

  const [isLoadingAuth, setIsLoadingAuth] = React.useState(false)
  const [me, setMe] = React.useState<ContextType["me"]>(null)
  const [decoded, setDecoded] = React.useState<ContextType["decoded"]>(null)
  const updateAuth = async () => {
    await getAuthQuery.refetch()
  }

  React.useEffect(() => {
    setIsLoadingAuth(getAuthQuery.isLoading)
    if (getAuthQuery.isError) {
      setMe(null)
      return
    }
    if (getAuthQuery.data) {
      setMe(getAuthQuery.data.user)
      setDecoded(getAuthQuery.data.decoded)
    }
  }, [getAuthQuery])

  return (
    <AppContext.Provider
      value={{
        me,
        decoded,
        isLoadingAuth,
        updateAuth,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
export default ContextProvider
