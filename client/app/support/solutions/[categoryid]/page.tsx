import FetchedFolder from "@/Components/FetchedFolder";
import LinkTrack from "@/Components/LinkTrack";
import Searchbox from "@/Components/Searchbox";
import React from "react";

import { PiStackBold } from "react-icons/pi";
import { folders } from "@/app/sample";
import PageHero from "@/Components/PageHero";

const CategoryPage = ({ params }: { params: { categoryid: string } }) => {
  return (
    <>
      <PageHero
        pageTitle="categoryName"
        currentLink="category..."
        Links={[
          { link: "Home", href: "/support/" },
          { link: "knowledge...", href: "../solutions" },
        ]}
        Icon={<PiStackBold className="md:text-5xl text-2xl text-slate-50" />}
      />
      <FetchedFolder Folders={folders} />
    </>
  );
};

export default CategoryPage;
