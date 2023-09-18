import { DashboardView } from "@/Components/DashboardView";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsCheck2 } from "react-icons/bs";

const KnowledgebaseDashboardPage = () => {
  const ActiveLink = usePathname();
  return (
    <div className="">
      <NavbarAgent
        currentPage="My dashboard"
        filterComponent={DashboardView( ActiveLink )}
        tooltipTitle="Dashboard View
  "
      />
    </div>
  );
};

export default KnowledgebaseDashboardPage;
