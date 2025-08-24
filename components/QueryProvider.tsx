"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            refetchInterval: false,
            retry: 2,
            retryDelay: 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
  );
}
