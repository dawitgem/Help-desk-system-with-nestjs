"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

const queryclient = new QueryClient();
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryclient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;
