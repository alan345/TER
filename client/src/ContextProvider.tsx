import React from "react"
import { trpc } from "./utils/trpc"
type ContextType = {
  me: {
    id: string
    name: string
    image: string
  } | null
  updateUserId: () => void
  isLoading: boolean
}
const initialContext: ContextType = {
  me: null,
  isLoading: false,
  updateUserId: () => {},
}
export const AppContext = React.createContext<ContextType>(initialContext)

type Props = {
  children: React.ReactNode
}

export const ContextProvider = (props: Props) => {
  const getAuthQuery = trpc.getAuth.useQuery(undefined, { retry: false })

  const [isLoading, setIsLoading] = React.useState(false)
  const [me, setMe] = React.useState<ContextType["me"]>(null)
  const updateUserId = async () => {
    await getAuthQuery.refetch()
  }

  React.useEffect(() => {
    setIsLoading(getAuthQuery.isLoading)
    if (getAuthQuery.isError) {
      setMe(null)
      return
    }
    if (getAuthQuery.data) {
      setMe(getAuthQuery.data)
    }
  }, [getAuthQuery])

  return (
    <AppContext.Provider
      value={{
        me,
        isLoading,
        updateUserId,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
