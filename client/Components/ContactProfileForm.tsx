import {
  selectUser,
  updateUserFaliure,
  updateUserSuccess,
} from "@/app/Redux/features/userSlice";
import { Alert, Avatar, CircularProgress, Snackbar } from "@mui/material";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage, uploadBytesResumable } from "@/firebase/firebaseconfig";
import {
  getDownloadURL,
  ref,
  UploadTask,
  deleteObject,
  StorageReference,
} from "firebase/storage";
import { LiaTimesSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";

const ContactProfileForm = () => {
  const { user, isAuth, error, Loading } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [uploadRef, setUploadRef] = useState<StorageReference>();
  const [successFullUpdate, setSuccessFullUpdate] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: user?.FullName,
    workphone: user?.WorkingPhone,
    mobilephone: user?.MobilePhone,
    Image: user?.Image,
  });
  const [Error, setError] = useState({
    Fullname: false,
    workPhone: false,
    mobilePhone: false,
  });
  const [isDataChanged, setDataChanged] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValid(false);
    setDisabled(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setDataChanged(true);
  };

  const validatePhone = (phone: string) => {
    const pattern = /^(\+\d{12}|\d{10})$/;
    return pattern.test(phone);
  };
  const validateForm = () => {
    const element = document.getElementById("fullname");
    let valid: boolean = true;
    if (!formData.fullname) {
      setError((prevState) => {
        return { ...prevState, Fullname: true };
      });
      valid = false;
      if (element) {
        const offset = 300;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
      return false;
    } else
      setError((prevState) => {
        return { ...prevState, Fullname: false };
      });
    if (formData.workphone) {
      validatePhone(formData.workphone)
        ? setError((prevState) => {
            return { ...prevState, workPhone: false };
          })
        : setError((prevState) => {
            return { ...prevState, workPhone: true };
          });
      return validatePhone(formData.workphone);
    }
    if (formData.mobilephone) {
      validatePhone(formData.mobilephone)
        ? setError((prevState) => {
            return { ...prevState, mobilePhone: false };
          })
        : setError((prevState) => {
            return { ...prevState, mobilePhone: true };
          });
      return validatePhone(formData.mobilephone);
    }
    return valid;
  };
  const uploadProfileToFirebase = (file: File) => {
    const profileRef = ref(storage, `userProfile/${user?.Id}/${file.name}`);
    setUploadRef(profileRef);
    const uploadTask = uploadBytesResumable(profileRef, file);
    setUploadTask(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 5
          ) * 5;
        setUploadProgress(progress);
      },
      (Error) => {
        switch (Error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, Image: downloadURL });
          setSelectedImage(downloadURL);
          setUploadProgress(null);
        });
      }
    );
  };
  const cancelUpload = () => {
    if (uploadTask) {
      uploadTask.cancel();
      setUploadProgress(null);
    }
  };
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setIsValid(false);
    setDisabled(false);
    const file = event.target.files?.[0];
    if (file) {
      uploadProfileToFirebase(file);
    } else {
      setSelectedImage(null);
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && user) {
      dispatch(
        updateUserSuccess({
          Id: user.Id,
          FullName: formData.fullname,
          Image: formData.Image,
          WorkingPhone: formData.workphone,
          MobilePhone: formData.mobilephone,
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
      const element = document.getElementById("fullname");
      if (Loading) {
        if (element) {
          const offset = 300;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }
      if (!Loading && isValid && error !== null) {
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
        setSuccessFullUpdate(true);
        setTimeout(() => {
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
  console.log(
    !Loading && isValid && error !== null,
    !Loading && isValid && error === null
  );
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
        id="fullname"
      >
        {error && showError && (
          <div className="p-3 border bg-red-200 border-red-400 flex justify-between">
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button
              className="text-lg text-gray-800"
              onClick={() => {
                setIsValid(false);
                setShowError(false);
              }}
            >
              <LiaTimesSolid />
            </button>
          </div>
        )}
        <form action="" className="md:p-10 p-3  w-full" onSubmit={handleSubmit}>
          <div className="flex lg:flex-row flex-col gap-5 md:justify-between w-full">
            <ul className="flex flex-col gap-8 w-full">
              {Loading && (
                <CircularProgress
                  color="secondary"
                  size={30}
                  className="self-end"
                />
              )}
              <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
                <p>
                  Full name <span className="text-red-600 font-bold"> *</span>
                </p>
                <input
                  type="text"
                  name="fullname"
                  disabled={Loading}
                  value={formData.fullname || ""}
                  className={`md:w-3/4 w-full p-3 placeholder:text-sm  border rounded-lg ${
                    Error.Fullname
                      ? "border-red-500 outline-none"
                      : "border-gray-300 hover:border-black outline-blue-500"
                  }  ${
                    Loading
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                  autoFocus
                  onFocus={() => {
                    setError((prevState) => {
                      return { ...prevState, Fullname: false };
                    });
                  }}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                />
                {Error.Fullname && (
                  <p className="text-red-500 text-[13px] font-normal">
                    This field is required
                  </p>
                )}
              </li>{" "}
              <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
                <p>Email </p>
                <p>{user?.Email}</p>
              </li>{" "}
              <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
                <p>Work Phone</p>
                <input
                  type="text"
                  name="workphone"
                  maxLength={13}
                  disabled={Loading}
                  value={formData.workphone || ""}
                  className={`md:w-3/4 w-full p-3 placeholder:text-sm  border rounded-lg ${
                    Error.workPhone
                      ? "border-red-500 outline-none"
                      : "border-gray-300 hover:border-black outline-blue-500"
                  }  ${
                    Loading
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                  placeholder="Enter your work Phone"
                  onFocus={() => {
                    setError((prevState) => {
                      return { ...prevState, workPhone: false };
                    });
                  }}
                  onChange={handleChange}
                />
                {Error.workPhone && (
                  <p className="text-red-500 text-[13px] font-normal">
                    Invalid Phone number pattern (+000-000-000-000 or
                    00-000-000-00)
                  </p>
                )}
              </li>
              <li className="flex flex-col gap-1 text-gray-700 text-sm font-semibold ">
                <p>Mobile phone</p>
                <input
                  type="text"
                  name="mobilephone"
                  value={formData.mobilephone || ""}
                  maxLength={13}
                  disabled={Loading}
                  className={`md:w-3/4 w-full p-3 placeholder:text-sm  border rounded-lg ${
                    Error.mobilePhone
                      ? "border-red-500 outline-none"
                      : "border-gray-300 hover:border-black outline-blue-500"
                  }  ${
                    Loading
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                  placeholder="Enter your Mobile Phone"
                  onFocus={() => {
                    setError((prevState) => {
                      return { ...prevState, mobilePhone: false };
                    });
                  }}
                  onChange={handleChange}
                />
                {Error.mobilePhone && (
                  <p className="text-red-500 text-[13px] font-normal">
                    Invalid Phone number pattern (+000-000-000-000 or
                    00-000-000-00)
                  </p>
                )}
              </li>{" "}
            </ul>
            <div className="flex w-full  flex-col gap-5 md:px-20 md:border-l-2 px-5 border-none">
              <h3 className="text-gray-700 text-sm font-semibold self-center">
                Profile Picture
              </h3>
              <Avatar
                alt="image"
                src={formData.Image || " "}
                className="w-[150px] h-[150px]  self-center bg-slate-400 rounded-full shadow-md object-contain "
              >
                {user?.FullName ? user.FullName.slice(0, 1) : " "}
              </Avatar>
              {selectedImage ? (
                <>
                  {!uploadProgress && !Loading && (
                    <div className="flex gap-3 self-center">
                      <label
                        htmlFor="Image"
                        className="p-3 border border-gray-300 rounded-md text-gray-600 text-sm bg-slate-50 text-center self-center shadow-sm cursor-pointer"
                      >
                        Change
                      </label>
                      <button
                        className="p-3 border border-gray-300 rounded-md text-gray-600 text-sm bg-slate-50 text-center self-center shadow-sm"
                        type="button"
                        onClick={async () => {
                          setIsValid(false);
                          try {
                            if (uploadRef) await deleteObject(uploadRef);
                          } catch (Error: any) {
                            console.error(
                              "Error deleting file:",
                              Error.message
                            );
                          }
                          setFormData({ ...formData, Image: user?.Image });
                          setSelectedImage(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {!uploadProgress && !Loading && (
                    <label
                      htmlFor="Image"
                      className="p-3 border border-gray-300 rounded-md text-gray-600 text-sm bg-slate-50 text-center self-center shadow-sm cursor-pointer"
                    >
                      Add
                    </label>
                  )}
                </>
              )}

              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                id="Image"
                name="Image"
                hidden
                onChange={handleImageUpload}
              />
              {uploadProgress && (
                <div className="lg:p-5  lg:w-[300px] border  bg-slate-50 flex flex-col gap-2 rounded-md">
                  <button
                    className="p-2 text-xl rounded-full hover:bg-slate-100 w-[30px] "
                    type="button"
                    onClick={cancelUpload}
                  >
                    <LiaTimesSolid className="w-full h-full " />
                  </button>
                  <div className="w-full h-2  bg-white border rounded-3xl flex justify-between">
                    <div
                      className={` h-full  bg-blue-500 rounded-3xl border flex justify-between`}
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex w-full justify-between">
                    <p className="text-md font-bold">Image uploading...</p>
                    <p className="text-md text-blue-500 font-bold">
                      {uploadProgress}%
                    </p>
                  </div>
                </div>
              )}
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
              disabled={disabled || Loading || uploadProgress !== null}
              className={`p-3 bg-[#063750] ${
                disabled || Loading || uploadProgress !== null
                  ? "opacity-60 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }  text-white text-sm font-semibold border rounded-md shadow-sm`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactProfileForm;
