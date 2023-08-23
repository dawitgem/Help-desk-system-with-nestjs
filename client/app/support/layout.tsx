import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
