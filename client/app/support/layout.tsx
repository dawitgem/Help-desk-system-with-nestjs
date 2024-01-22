import type { Metadata } from "next";
import Provider from "@/utils/Provider";
import SupportProvider from "@/utils/SupportProvider";

export const metadata: Metadata = {
  title: "KNS Support Service",
  description: "Reliable Support Service Software",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SupportProvider>{children}</SupportProvider>
    </>
  );
}
