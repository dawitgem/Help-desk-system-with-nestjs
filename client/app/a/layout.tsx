import NavbarAgent from "@/Components/NavbarAgent";
import SideBar from "@/Components/SideBar";
export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full bg-slate-100">
      <SideBar />
      <div className="flex flex-col w-full ">{children}</div>
    </div>
  );
}
