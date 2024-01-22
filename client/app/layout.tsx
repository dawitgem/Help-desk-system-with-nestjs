import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./Redux/Providers";
import Provider from "@/utils/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KNS Support Service",
  description: "Reliable Support Service Software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 flex flex-col min-h-[100vh] ">
        <Provider>
          <Providers>{children}</Providers>
        </Provider>
      </body>
    </html>
  );
}
