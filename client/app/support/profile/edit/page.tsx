"use client";
import ContactChangePasswordForm from "@/Components/ContactChangePasswordForm";
import ContactProfileForm from "@/Components/ContactProfileForm";
import LinkTrack from "@/Components/LinkTrack";
import PageHero from "@/Components/PageHero";
import Searchbox from "@/Components/Searchbox";
import SelectedArticle from "@/Components/SelectedArticle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { BsFillFileEarmarkTextFill, BsPersonCircle } from "react-icons/bs";
const ProfileEditPage = () => {
  const [changePassword, setChangePassword] = useState(false);
  const router = useRouter();
  return (
    <div>
      <PageHero
        currentLink="profile"
        Links={[{ link: "Home", href: "/support/" }]}
        Icon={<BsPersonCircle className="md:text-5xl text-2xl text-slate-50" />}
        pageTitle="My profile"
      />
      <div className=" flex flex-col gap-10 py-10 px-40 ">
        <div className="flex gap-1 text-sm  font-semibold ">
          <Link
            href={"/support/profile/edit#"}
            scroll={false}
            className={`p-3 border rounded-md ${
              !changePassword
                ? "bg-[#063750] text-white"
                : "bg-slate-50 hover:bg-white"
            }`}
            onClick={() => {
              setChangePassword(false);
            }}
          >
            EditProfile
          </Link>
          <Link
            href={"/support/profile/edit#"}
            scroll={false}
            className={`p-3 border rounded-md ${
              changePassword
                ? "bg-[#063750] text-white"
                : "bg-slate-50 hover:bg-white"
            }`}
            onClick={() => {
              setChangePassword(true);
            }}
          >
            Change Password
          </Link>
        </div>
        {!changePassword ? (
          <ContactProfileForm />
        ) : (
          <ContactChangePasswordForm />
        )}
      </div>
    </div>
  );
};

export default ProfileEditPage;
