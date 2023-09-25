import { Avatar } from "@mui/material";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const ContactProfileForm = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    fullname: "",
    workphone: "",
    mobilephone: "",
    profilepic: "",
  });
  const [error, setError] = useState(false);
  const [isDataChanged, setDataChanged] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabled(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setDataChanged(true);
  };

  const validateForm = () => {
    const element = document.getElementById("fullname");
    let valid: boolean = true;
    if (!formData.fullname) {
      setError(true);
      valid = false;
      if (element) {
        const offset = 300; // Adjust this offset as needed
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    } else setError(false);
    return valid;
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setDisabled(false);
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFormData({ ...formData, profilepic: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) console.log(formData);
  };
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDataChanged) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", (e: BeforeUnloadEvent) => {
      handleBeforeUnload(e);
    });
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDataChanged]);
  return (
    <div className="bg-white border shadow-md rounded-lg w-full " id="fullname">
      <form action="" className="md:p-10 p-3  w-full" onSubmit={handleSubmit}>
        <div className="flex md:flex-row flex-col gap-5 md:justify-between w-full">
          <ul className="flex flex-col gap-8 w-full">
            <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
              <p>
                Full name <span className="text-red-600 font-bold"> *</span>
              </p>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                className={`md:w-3/4 w-full p-3 placeholder:text-sm  border rounded-lg ${
                  error
                    ? "border-red-500 outline-none"
                    : "border-gray-300 hover:border-black outline-blue-500"
                }  `}
                autoFocus
                placeholder="Enter your full name"
                onChange={handleChange}
              />
              {error && (
                <p className="text-red-500 text-[13px] font-normal">
                  This field is required
                </p>
              )}
            </li>{" "}
            <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
              <p>Email </p>
              <p>contactemail@gmail.com</p>
            </li>{" "}
            <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
              <p>Work Phone</p>
              <input
                type="text"
                name="workphone"
                value={formData.workphone}
                className="md:w-3/4 w-full p-3 placeholder:text-sm  border border-gray-300 hover:border-black outline-blue-500 rounded-md"
                placeholder="Enter your work Phone"
                onChange={handleChange}
              />
            </li>{" "}
            <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
              <p>Mobile phone</p>
              <input
                type="text"
                name="mobilephone"
                value={formData.mobilephone}
                className="md:w-3/4 w-full p-3 placeholder:text-sm  border border-gray-300 hover:border-black outline-blue-500 rounded-md"
                placeholder="Enter your Mobile Phone"
                onChange={handleChange}
              />
            </li>{" "}
          </ul>
          <div className="flex flex-col gap-5 md:px-20 md:border-l-2 px-5 border-none">
            <h3 className="text-gray-700 text-sm font-semibold self-center">
              Profile Picture
            </h3>
            <Avatar
              alt="image"
              src={formData.profilepic}
              className="md:w-[150px] md:h-[150px] w-[80px] h-[80px] self-center bg-slate-400 rounded-full shadow-md object-contain "
            >
              N
            </Avatar>
            {selectedImage ? (
              <div className="flex gap-3">
                <label
                  htmlFor="ProfilePic"
                  className="p-3 border border-gray-300 rounded-md text-gray-600 text-sm bg-slate-50 text-center self-center shadow-sm cursor-pointer"
                >
                  Change
                </label>
                <button
                  className="p-3 border border-gray-300 rounded-md text-gray-600 text-sm bg-slate-50 text-center self-center shadow-sm"
                  onClick={() => setSelectedImage(null)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="ProfilePic"
                className="p-3 border border-gray-300 rounded-md text-gray-600 text-sm bg-slate-50 text-center self-center shadow-sm cursor-pointer"
              >
                Add
              </label>
            )}

            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              id="ProfilePic"
              name="profilepic"
              hidden
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="py-10 px-10 flex gap-3">
          <Link
            href={"/support"}
            className="p-3 text-sm font-semibold border rounded-md shadow-sm text-gray-500"
          >
            cancel
          </Link>
          <button
            disabled={disabled}
            className={`p-3 bg-[#063750] ${
              disabled
                ? "opacity-60 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }  text-white text-sm font-semibold border rounded-md shadow-sm`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactProfileForm;
