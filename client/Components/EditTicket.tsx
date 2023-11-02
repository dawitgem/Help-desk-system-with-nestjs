"use client";
import {
  Alert,
  Autocomplete,
  Backdrop,
  CircularProgress,
  Snackbar,
  TextField,
  fabClasses,
} from "@mui/material";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { RxUpdate } from "react-icons/rx";
import { RiTicket2Line } from "react-icons/ri";
import { LiaTimesSolid } from "react-icons/lia";
import AttachmentLists from "./AttachmentLists";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/app/Redux/features/userSlice";
import {
  Attachement,
  Ticket,
  deleteAttachmentStart,
  selectTicket,
  updateAttachmentStart,
} from "@/app/Redux/features/ticketSlice";
import { useRouter } from "next/navigation";
import Editor, { TicketEditor } from "./Editor";
import { modules } from "@/Inputs";
import { BsPaperclip } from "react-icons/bs";
interface AutocompleteOption {
  label: string;
}
const options = ["Ask a question", "Report an issue", "Enquire status"];
const priorityOptions = ["Low", "Medium", "High", "Urgent"];

interface EditTicketProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  Ticket: any;
  Attachment?: Attachement[];
}
const EditTicket = ({ open, setOpen, Ticket, Attachment }: EditTicketProps) => {
  const { user } = useSelector(selectUser);
  const { error, Loading } = useSelector(selectTicket);
  const [IsChanged, setIsChanged] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successFullUpdate, setSuccessFullUpdate] = useState(false);
  const [removedAttachment, setRemovedAttachment] = useState<Attachement[]>();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    IssueType: Ticket.IssueType || "",
    Email: user?.Email || " ",
    Subject: Ticket?.Subject || " ",
    Description: Ticket?.Content || " ",
    Status: Ticket.Status || "Open",
    Priority: priorityOptions[0],
  });
  const [ErrorMessage, setErrorMessage] = useState("");
  const [Error, setError] = useState({
    issueType: false,
    Email: false,
    Subject: false,
    Discription: false,
  });
  const [attachment, setAttachement] = useState<any>(Attachment);
  const [ErrorAttachments, setErrorAttachments] = useState<any>([]);
  const [CumulativeErrorFiles, setCumulativeErrorFiles] = useState<any>([]);
  const [ErrorDirectoryAttachments, setErrorDirectoryAttachments] =
    useState<any>([]);
  const router = useRouter();

  const validateInput = (inputId: string) => {
    const element = document.getElementById(inputId);
    const offset = 300;

    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChanged(true);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (Email: string) => {
    let Valid: boolean = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (Email && !emailRegex.test(Email)) {
      setError((prevState) => ({ ...prevState, Email: true }));
      setErrorMessage("Invalid Email ... Please enter proper email...");
      Valid = false;
    }
    return Valid;
  };

  const validateForm = () => {
    let Valid: boolean = true;
    if (!formData.Description || formData.Description === "<p><br></p>") {
      setError((prevState) => ({ ...prevState, Discription: true }));
      Valid = false;
    }
    if (!formData.IssueType) {
      validateInput("issueType");
      setError((prevState) => ({ ...prevState, issueType: true }));
      Valid = false;
    }
    if (!formData.Subject) {
      validateInput("Subject");
      setError((prevState) => ({ ...prevState, Subject: true }));
      Valid = false;
    }
    if (!formData.Email) {
      validateInput("Email");
      setError((prevState) => ({ ...prevState, Email: true }));
      setErrorMessage("This field is required!!");
      Valid = false;
    }
    if (formData.Email && !validateEmail(formData.Email)) {
      validateInput("Email");
      Valid = false;
    }
    return Valid;
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  };

  const attachFiles = (
    Action: Dispatch<SetStateAction<File[] | null | Attachement[]>>,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const array: File[] = Array.from(e.target.files);
      Action((prevState: any) => [...prevState, ...array]);
    }
  };

  const AttachmentChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChanged(true);
    const maxsize = 20 * 1024 * 1024;
    const selectedFile = e.target.files?.[0];
    if (e.target.files && selectedFile) {
      if (selectedFile.size > maxsize) {
        attachFiles(setErrorAttachments, e);
      } else if (
        attachment?.some((file: any) => file.FileName === selectedFile.name)
      )
        e.target.value = "";
      else if (
        attachment &&
        [...attachment, ...Array.from(e.target.files)]?.reduce(
          (count, { size }: any) => {
            count += size;
            return count;
          },
          0
        ) > maxsize
      ) {
        attachFiles(setCumulativeErrorFiles, e);
      } else if (selectedFile.type === "") {
        attachFiles(setErrorDirectoryAttachments, e);
      } else {
        attachFiles(setAttachement, e);
      }
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsValid(true);
      const {
        IssueType,
        Subject,
        Description: Content,
        Email,
        Priority,
        Status,
      } = formData;
      const ticket = {
        Id: Ticket.Id,
        IssueType,
        Subject,
        Content,
        Email,
        Priority,
        Status,
        UserId: user?.Id,
        CreatedAt: Ticket.CreatedAt,
      };
      const Id = ticket.Id;
      const file = attachment.filter((attach: any) => "name" in attach);
      const Remove = removedAttachment;
      dispatch(updateAttachmentStart({ ticket, file, Id, Remove }));
    }
  };
  useEffect(() => {
    if (Loading) {
      const element = document.getElementById("Fullname");
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
    if (error !== null) {
      const element = document.getElementById("Fullname");
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
  }, [error]);
  useEffect(() => {
    const checkError = () => {
      if (!Loading && isValid && error === null) {
        setFormData({
          IssueType: "",
          Email: user?.Email || " ",
          Subject: "",
          Description: "",
          Status: " ",
          Priority: priorityOptions[0],
        });
        setSuccessFullUpdate(true);
        setTimeout(() => {
          setSuccessFullUpdate(false);
          router.push("/support/tickets");
        }, 1000);
      }
    };

    checkError();
  }, [isValid, Loading, error]);
  console.log("edit ticket");
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
        height: "100vh",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
      open={open}
    >
      <Snackbar
        open={successFullUpdate}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="w-[400px]"
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Successfully Issued
        </Alert>
      </Snackbar>
      <div className="flex   border-t-2 border-[#102034] md:w-2/3 w-full  justify-self-end self-start h-screen">
        <button
          className="md:block hidden bg-[#102034] text-white text-xl p-[2px] w-[25px] h-[25px]"
          onClick={() => setOpen(false)}
        >
          <LiaTimesSolid />
        </button>
        <div className="bg-white w-full h-full   md:px-10 px-2 flex flex-col gap-5">
          <div className="flex justify-between">
            <div className="flex gap-5">
              <div className="flex">
                <RiTicket2Line className="text-5xl text-gray-500 self-center mt-3 -ml-1 border-2 border-white rounded-full " />
                <RxUpdate className="text-xl text-gray-700 self-end" />
              </div>
              <h2 className="text-lg text-gray-800 font-medium self-center">
                Edit Ticket
              </h2>
            </div>
            {Loading && <CircularProgress color="secondary" size={30} />}
          </div>
          {error && showError && (
            <div className="p-3 border bg-red-200 border-red-400 flex justify-between">
              <Alert severity="error" className="w-[90%]  bg-red-200">
                {error}
              </Alert>
              <button
                className="text-lg text-gray-800"
                onClick={() => {
                  setShowError(false);
                }}
              >
                <LiaTimesSolid />
              </button>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            id="Fullname"
            className="h-screen  bg-white rounded-lg  md:p-10 p-2 flex flex-col gap-5 "
          >
            <div className="md:h-[65vh] h-[70vh] overflow-auto px-2">
              <div className="flex flex-col gap-1">
                <h1 className="md:text-xl text-sm text-gray-600 font-bold ">
                  What is your issue ?{" "}
                  <span className="text-red-500 self-center"> *</span>
                </h1>
                <Autocomplete
                  disabled={Loading}
                  className={`md:w-[70%] w-[full] ${
                    Loading
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100 cursor-pointer"
                  }`}
                  onChange={(event: any, newValue: any) => {
                    setIsChanged(true);
                    setError((prevState) => {
                      return { ...prevState, issueType: false };
                    });
                    setFormData((prevState) => ({
                      ...prevState,
                      IssueType: newValue,
                    }));
                  }}
                  onInputChange={(event, newInputValue) => {}}
                  id="issueType"
                  options={options}
                  value={formData.IssueType}
                  renderInput={(params) => (
                    <TextField {...params} label="Issue type" />
                  )}
                />
                {Error.issueType && (
                  <p className="text-[12px] text-red-500">
                    This field is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="md:text-lg text-sm text-gray-700 font-semibold ">
                  Email <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  disabled={Loading}
                  className={`md:w-[70%] w-full h-14 border-2  outline-none focus:outline-2 focus:outline-blue-500 hover:outline-1 hover:outline-black
          rounded-md ${
            Loading
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
                  value={formData.Email || ""}
                  onChange={handleChange}
                  onFocus={() =>
                    setError((prevState) => ({ ...prevState, Email: false }))
                  }
                />
                {Error.Email && (
                  <p className="text-[12px] text-red-500">{ErrorMessage}</p>
                )}
              </div>
              <label className="md:text-lg text-sm text-gray-d700 font-semibold ">
                Priority
              </label>
              <Autocomplete
                className={`md:w-[70%] w-[full] ${
                  Loading
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                } `}
                inputValue={formData.Priority}
                disabled={Loading}
                onInputChange={(event, newPriority) => {
                  setIsChanged(true);
                  setFormData((prevState) => ({
                    ...prevState,
                    Priority: newPriority,
                  }));
                }}
                id="combo-box-demo"
                options={priorityOptions}
                value={formData.Priority}
                renderInput={(params) => (
                  <TextField {...params} label="Priority" />
                )}
              />
              <div className="flex flex-col gap-1">
                <label className="md:text-lg text-sm text-gray-700 font-semibold ">
                  Subject <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="Subject"
                  name="Subject"
                  className={`md:w-[70%] w-full h-14 border-2  outline-none focus:outline-2 focus:outline-blue-500 hover:outline-1 hover:outline-black
          rounded-md ${
            Loading
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
                  value={formData.Subject}
                  autoFocus={Error.Subject}
                  onChange={handleChange}
                  disabled={Loading}
                  onFocus={() =>
                    setError((prevState) => ({ ...prevState, Subject: false }))
                  }
                />
                {Error.Subject && (
                  <p className="text-[12px] text-red-500">
                    This field is required
                  </p>
                )}
              </div>
              <label className="md:text-lg text-sm text-gray-700 font-semibold ">
                Description <span className="text-red-700">*</span>
              </label>
              <div className="flex flex-col gap-1">
                <TicketEditor
                  modules={modules}
                  setValue={setFormData}
                  setError={setError}
                  value={formData.Description}
                  setChanged={setIsChanged}
                />
                {Error.Discription && (
                  <p className="text-[12px] text-red-500">
                    This field is required
                  </p>
                )}
              </div>

              <label htmlFor="attachment" className="flex gap-1 ">
                <BsPaperclip className="self-center text-gray-700" />
                <span className="text-blue-600 hover:text-gray-700 text-md font-medium">
                  Attachment
                </span>
              </label>
              <input
                id="attachment"
                type="file"
                hidden
                onChange={AttachmentChangeHandle}
              />
              {attachment && (
                <AttachmentLists
                  setRemovedAttachment={setRemovedAttachment}
                  DeleteAttach={true}
                  setChanged={setIsChanged}
                  attachment={attachment}
                  setAttachement={setAttachement}
                  formatBytes={formatBytes}
                />
              )}
              {CumulativeErrorFiles?.length != 0 && (
                <AttachmentLists
                  setRemovedAttachment={setRemovedAttachment}
                  DeleteAttach={false}
                  setChanged={setIsChanged}
                  setAttachement={setCumulativeErrorFiles}
                  attachment={CumulativeErrorFiles}
                  formatBytes={formatBytes}
                  message="Cumulative file size can't exceed 20MB"
                  error={true}
                />
              )}
              {ErrorAttachments?.length !== 0 && (
                <AttachmentLists
                  setRemovedAttachment={setRemovedAttachment}
                  DeleteAttach={false}
                  setChanged={setIsChanged}
                  attachment={ErrorAttachments}
                  setAttachement={setErrorAttachments}
                  formatBytes={formatBytes}
                  message="File size can't exceed 20MB"
                  error={true}
                />
              )}
              {ErrorDirectoryAttachments?.length !== 0 && (
                <AttachmentLists
                  setRemovedAttachment={setRemovedAttachment}
                  DeleteAttach={false}
                  setChanged={setIsChanged}
                  attachment={ErrorDirectoryAttachments}
                  setAttachement={setErrorDirectoryAttachments}
                  formatBytes={formatBytes}
                  message="Can't Use Directories . You should use only files with Extension {.jpg,.pdf e.t.c}"
                  error={true}
                />
              )}
            </div>
            <div className="flex gap-2 p-5">
              <button
                className="p-3  text-sm bg-slate-50 border rounded-md  border-gray-300"
                type="button"
                disabled={Loading}
                onClick={() => setOpen(false)}
              >
                cancel
              </button>
              <button
                className={`p-3  text-sm text-white bg-[#063750] border rounded-md ${
                  !IsChanged || Loading
                    ? "opacity-70 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                } `}
                disabled={!IsChanged || Loading}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Backdrop>
  );
};

export default EditTicket;
