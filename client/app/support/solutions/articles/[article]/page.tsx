import LinkTrack from "@/Components/LinkTrack";
import PageHero from "@/Components/PageHero";
import Searchbox from "@/Components/Searchbox";
import SelectedArticle from "@/Components/SelectedArticle";
import { Icon } from "@mui/material";
import React, { useRef } from "react";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
const ArticlePage = () => {
  return (
    <div>
      <PageHero
        pageTitle="Articles name"
        currentLink="article name"
        Links={[
          { link: "Home", href: "/support/" },
          { link: "knowledge...", href: "/support/solutions" },
          { link: "category...", href: "/support/solutions/12312" },
          { link: "folder...", href: "/support/solutions/folder/12312" },
        ]}
        Icon={
          <BsFillFileEarmarkTextFill className="md:text-5xl text-2xl text-slate-50" />
        }
        p={"created by abebe wondwosen,at 12:00 pm 12 aug"}
      />
      <SelectedArticle />
    </div>
  );
};

export default ArticlePage;
