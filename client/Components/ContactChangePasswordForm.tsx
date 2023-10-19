import {
  selectUser,
  updatePasswordRequest,
  updatePasswordSuccess,
} from "@/app/Redux/features/userSlice";
import { Alert, Avatar, Checkbox, Snackbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

const ContactChangePasswordForm = () => {
  const { user, isAuth, Loading, error } = useSelector(selectUser);
  const [registerError, setRegError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [PasswordMatch, setPasswordMatch] = useState(false);
  const [showPasswordMissMatchError, setShowMissMatchPassword] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [successFullUpdate, setSuccessFullUpdate] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isDataChanged, setDataChanged] = useState(false);

  const [Error, setError] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [ErrorMessage, setErrorMessage] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValid(false);
    setDisabled(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setDataChanged(true);
  };
  const validateForm = () => {
    let valid: boolean = true;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=.#$%^*()-_+/><,"'])[A-Za-z\d@$!%*?&=.#$%^*()-_+/><,"']{8,}$/;
    setShowMissMatchPassword(false);
    if (!formData.confirmPassword.trim()) {
      setError((prevState) => {
        return { ...prevState, confirmPassword: true };
      });
      setErrorMessage((prevState) => ({
        ...prevState,
        currentPassword: "This field is required",
      }));
      valid = false;
    }
    if (!formData.newPassword.trim()) {
      setError((prevState) => {
        return { ...prevState, newPassword: true };
      });
      setErrorMessage((prevState) => ({
        ...prevState,
        newPassword: "This field is required",
      }));
      valid = false;
    }
    if (!formData.confirmPassword.trim()) {
      setError((prevState) => {
        return { ...prevState, confirmPassword: true };
      });
      setErrorMessage((prevState) => ({
        ...prevState,
        confirmPassword: "This field is required",
      }));

      valid = false;
    }
    if (formData.newPassword && !passwordRegex.test(formData.newPassword)) {
      setError((prevState) => {
        return { ...prevState, newPassword: true };
      });
      setErrorMessage((prevState) => ({
        ...prevState,
        newPassword:
          "invalid password Pattern . it must include {atleaset 8 characters,A-Z,a-z,0-9,special character}",
      }));
      valid = false;
    }

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
    if (validateForm() && confirmPassword() && user) {
      dispatch(
        updatePasswordRequest({
          Id: user?.Id,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        })
      );
      setIsValid(true);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDataChanged) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    const checkError = () => {
      const element = document.getElementById("Fullname");
      if (!Loading && isValid && error !== null) {
        setRegError(error);
        if (element) {
          const offset = 300;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
        setSuccessFullUpdate(false);
        setShowError(true);
      }
      if (!Loading && isValid && error === null) {
        setRegError(null);
        setSuccessFullUpdate(true);
        console.log("come on man");
        setTimeout(() => {
          setSuccessFullUpdate(true);
          router.push("/support/");
        }, 1000);
      }
    };

    checkError();
    window.addEventListener("beforeunload", (e: BeforeUnloadEvent) => {
      handleBeforeUnload(e);
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDataChanged, Loading]);

  return (
    <>
      <Snackbar
        open={successFullUpdate}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Successfully updated
        </Alert>
      </Snackbar>
      <div
        className="bg-white border shadow-md rounded-lg w-full "
        id="Fullname"
      >
        {error && showError && (
          <div className="p-3 border bg-red-200 border-red-400 flex justify-between">
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button
              className="text-lg text-gray-800"
              onClick={() => {
                setRegError("null");
                setIsValid(false);
                setShowError(false);
              }}
            >
              <LiaTimesSolid />
            </button>
          </div>
        )}
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
                type={`${showPassword ? "type" : "password"}`}
                id="currentpassword"
                name="currentPassword"
                value={formData.currentPassword}
                className={`md:w-1/2  p-3 placeholder:text-sm  border ${
                  Error.currentPassword
                    ? "border-red-500 outline-none"
                    : "border-gray-300 hover:border-black outline-blue-500"
                }  rounded-md`}
                placeholder="Enter your current password"
                onChange={handleChange}
                onFocus={() => {
                  setError((prevState) => ({
                    ...prevState,
                    currentPassword: false,
                  }));
                  setShowMissMatchPassword(false);
                }}
              />
              {Error.currentPassword && (
                <p className="text-red-500 text-[13px] font-normal">
                  {ErrorMessage.currentPassword}
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
                id="newPassword"
                value={formData.newPassword}
                className={`md:w-1/2   p-3 placeholder:text-sm  border ${
                  Error.newPassword
                    ? "border-red-500 outline-none"
                    : "border-gray-300 hover:border-black outline-blue-500"
                }  rounded-md`}
                placeholder="Create new password"
                onChange={handleChange}
                onFocus={() => {
                  setError((prevState) => ({
                    ...prevState,
                    newPassword: false,
                  }));
                  setShowMissMatchPassword(false);
                }}
              />
              {Error.newPassword && (
                <p className="text-red-500 text-[13px] font-normal">
                  {ErrorMessage.newPassword}
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
                  className={`md:w-1/2  p-3 placeholder:text-sm  border ${
                    Error.confirmPassword
                      ? "border-red-500 outline-none"
                      : "border-gray-300 hover:border-black outline-blue-500"
                  }  rounded-md`}
                  placeholder="Type  new password"
                  onChange={handleChange}
                  onFocus={() => {
                    setError((prevState) => ({
                      ...prevState,
                      confirmPassword: false,
                    }));
                    setShowMissMatchPassword(false);
                  }}
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
              {Error.confirmPassword && (
                <p className="text-red-500 text-[13px] font-normal">
                  {ErrorMessage.confirmPassword}
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
                onClick={() => setRegError(null)}
              >
                Save
              </button>
            </div>
          </ul>
        </form>
      </div>
    </>
  );
};

export default ContactChangePasswordForm;
