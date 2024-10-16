import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import { trpc } from "./utils/trpc"
import { BrowserRouter } from "react-router-dom"
import { ContextProvider } from "./ContextProvider"
import { LayoutApp } from "./template/layout/LayoutApp"

export function App() {
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
          // Todo: based on the environement, we should use the correct url dynamically
          url: "http://localhost:2022",
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
            <LayoutApp />
          </QueryClientProvider>
        </ContextProvider>
      </trpc.Provider>
    </BrowserRouter>
  )
}
