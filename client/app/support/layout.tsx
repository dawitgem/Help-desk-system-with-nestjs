import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import LinearDeterminate from "@/Components/LinerProgress";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Header />
      {children}
      <Footer />
    </Suspense>
  );
}
