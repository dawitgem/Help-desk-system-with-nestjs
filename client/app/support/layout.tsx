import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-[100vh] ">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
