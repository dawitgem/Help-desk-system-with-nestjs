import FetchedArticles from "@/Components/FetchedArticles";
import FetchedFolder from "@/Components/FetchedFolder";
import LinkTrack from "@/Components/LinkTrack";
import PageHero from "@/Components/PageHero";
import Searchbox from "@/Components/Searchbox";
import React from "react";
import { BsFolder2Open } from "react-icons/bs";
import { PiStackBold } from "react-icons/pi";

const FolderPageId = () => {
  return (
    <>
      <PageHero
        pageTitle=" FolderName"
        currentLink="Folder name"
        Links={[
          { link: "Home", href: "/support/" },
          { link: "knowledge...", href: "/support/solutions" },
          { link: "category...", href: "/support/solutions/12312" },
        ]}
        Icon={<BsFolder2Open className="md:text-5xl text-2xl text-slate-50" />}
      />
    </>
  );
};

export default FolderPageId;
