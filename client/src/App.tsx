import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import { trpc } from "./utils/trpc"
import { BrowserRouter } from "react-router-dom"
import ContextProvider from "./ContextProvider"
import LayoutApp from "./layout/LayoutApp"
import MyIdle from "./MyIdle"

const App = () => {
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
          url: import.meta.env.VITE_URL_BACKEND ?? "http://localhost:2022",
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
