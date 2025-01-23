import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import { trpc } from "./utils/trpc"
import { BrowserRouter } from "react-router"
import ContextProvider from "./ContextProvider"
import LayoutApp from "./layout/LayoutApp"
import MyIdle from "./MyIdle"
import LogoTer from "./layout/LogoTer"

const App = () => {
  const url = import.meta.env.VITE_URL_BACKEND
  if (!url)
    return (
      <div className="p-6">
        <LogoTer />
        <div className="flex flex-col items-center mt-12">
          <h1>Error</h1>
          <p>URL_BACKEND not set in env file</p>
        </div>
      </div>
    )

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            gcTime: 1000 * 60 * 60 * 24 * 7,
          },
        },
      })
  )

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_URL_BACKEND,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            })
          },
        }),
      ],
    })
  )
  return (
    <BrowserRouter>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <ContextProvider>
          <QueryClientProvider client={queryClient}>
            <MyIdle>
              <LayoutApp />
            </MyIdle>
          </QueryClientProvider>
        </ContextProvider>
      </trpc.Provider>
    </BrowserRouter>
  )
}

export default App
