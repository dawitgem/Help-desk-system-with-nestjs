import { Avatar, Checkbox } from "@mui/material";
import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { VscError } from "react-icons/vsc";

const ContactChangePasswordForm = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [PasswordMatch, setPasswordMatch] = useState(false);
  const [showPasswordMissMatchError, setShowMissMatchPassword] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordref = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isDataChanged, setDataChanged] = useState(false);

  const [error, setError] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisabled(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setDataChanged(true);
  };

  const validateForm = () => {
    let valid: boolean = true;
    setShowMissMatchPassword(false);
    if (!formData.confirmPassword.trim()) {
      setError((prevState) => {
        return { ...prevState, confirmPassword: true };
      });
      valid = false;
    } else
      setError((prevState) => {
        return { ...prevState, confirmPassword: false };
      });
    if (!formData.currentPassword.trim()) {
      setError((prevState) => {
        return { ...prevState, currentPassword: true };
      });
      valid = false;
    } else
      setError((prevState) => {
        return { ...prevState, currentPassword: false };
      });
    if (!formData.newPassword.trim()) {
      setError((prevState) => {
        return { ...prevState, newPassword: true };
      });
      valid = false;
    } else
      setError((prevState) => {
        return { ...prevState, newPassword: false };
      });

    return valid;
  };
  const confirmPassword = () => {
    let valid = true;
    if (formData.confirmPassword != formData.newPassword) {
      setPasswordMatch(false);
      setShowMissMatchPassword(true);
      valid = false;
    } else setPasswordMatch(true);
    return valid;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && confirmPassword()) console.log(formData);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDataChanged) {
        event.preventDefault();
        event.returnValue = ""; // Required for some browsers
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
    <div className="bg-white border shadow-md rounded-lg w-full ">
      <form
        action=""
        className="p-10 md:flex block justify-between w-full"
        onSubmit={handleSubmit}
      >
        <ul className="flex flex-col gap-8 w-full">
          <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
            <p>
              Current Password{" "}
              <span className="text-red-600 font-bold"> *</span>
            </p>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              className={`w-1/2 p-3 placeholder:text-sm  border ${
                error.currentPassword
                  ? "border-red-500 outline-none"
                  : "border-gray-300 hover:border-black outline-blue-500"
              }  rounded-md`}
              placeholder="Enter your current password"
              onChange={handleChange}
              onFocus={() => {}}
            />
            {error.currentPassword && (
              <p className="text-red-500 text-[13px] font-normal">
                This field is required
              </p>
            )}
          </li>{" "}
          <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
            <p>
              New Password <span className="text-red-600 font-bold"> *</span>
            </p>
            <input
              type={`${showPassword ? "type" : "password"}`}
              name="newPassword"
              value={formData.newPassword}
              className={`w-1/2 p-3 placeholder:text-sm  border ${
                error.newPassword
                  ? "border-red-500 outline-none"
                  : "border-gray-300 hover:border-black outline-blue-500"
              }  rounded-md`}
              placeholder="Create new password"
              onChange={handleChange}
              onFocus={() => {}}
            />
            {error.newPassword && (
              <p className="text-red-500 text-[13px] font-normal">
                This field is required
              </p>
            )}
          </li>{" "}
          <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
            <p>
              Confirm password{" "}
              <span className="text-red-600 font-bold"> *</span>
            </p>
            <div className="w-full flex gap-4">
              <input
                type={`${showPassword ? "type" : "password"}`}
                name="confirmPassword"
                value={formData.confirmPassword}
                className={`w-1/2 p-3 placeholder:text-sm  border ${
                  error.confirmPassword
                    ? "border-red-500 outline-none"
                    : "border-gray-300 hover:border-black outline-blue-500"
                }  rounded-md`}
                placeholder="Type  new password"
                onChange={handleChange}
                onFocus={() => {}}
              />
              {!PasswordMatch && showPasswordMissMatchError && (
                <div className="flex gap-2">
                  <VscError className="text-red-600 text-lg font-bold self-center" />
                  <p className="text-red-500 text-sm font-semibold self-center">
                    Password doesn't match
                  </p>
                </div>
              )}
            </div>
            {error.confirmPassword && (
              <p className="text-red-500 text-[13px] font-normal">
                This field is required
              </p>
            )}
          </li>
          <li className="flex gap-2 text-sm text-gray-700 font-semibold  ">
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <p className="self-center">Show Password</p>
          </li>
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
        </ul>
      </form>
    </div>
  );
};

export default ContactChangePasswordForm;
