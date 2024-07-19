import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import BackgroundPage from "./template/BackgroundPage";
import { BrowserRouter } from "react-router-dom";
import { Users } from "./user/Users";
import ContextProvider from "./ContextProvider";
import { AuthManagement } from "./auth/AuthManagement";

export function App() {
  const [queryClient] = useState(() => new QueryClient());

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
            });
          },
        }),
      ],
    })
  );
  return (
    <BrowserRouter>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <ContextProvider>
          <QueryClientProvider client={queryClient}>
            <BackgroundPage>
              <div className="min-h-10">
                <AuthManagement />
              </div>
              <Users />
            </BackgroundPage>
          </QueryClientProvider>
        </ContextProvider>
      </trpc.Provider>
    </BrowserRouter>
  );
}
