import {
  Alert,
  Autocomplete,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { BsPaperclip } from "react-icons/bs";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import AttachmentLists from "./AttachmentLists";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/app/Redux/features/userSlice";
import {
  Attachement,
  addAttachementStart,
  addTicketFaliure,
  addTicketStart,
  selectTicket,
} from "@/app/Redux/features/ticketSlice";
import { LiaTimesSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebaseconfig";
import MyEditor from "./NewEditor";
import {z} from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

enum Options{
  Question="Question",
  Report="Report an issue",
  Enquire="Enquire status"

}
const priorityOptions = ["Low", "Medium", "High", "Urgent"];

const options = ["Question", "Report an issue", "Enquire status"];

const NewTicketSchema=z.object({
  IssueType: z.enum([Options.Question,Options.Report,Options.Enquire]),
  Email: z.string().email('Invalid email format').min(1,"Email required"),
  Subject: z.string().min(1,{message:"This field is required"}),
  Description: z.string().min(1,{message:"This field is required"}),
  Priority: z.string().default(priorityOptions[0]),
})
interface AutocompleteOption {
  label: string;
}


const TextEditor = () => {
  const { register, handleSubmit , formState: { errors } } = useForm({
    resolver: zodResolver(NewTicketSchema),
    mode:"onBlur"
  });
  const { user } = useSelector(selectUser);
  const { error, Loading } = useSelector(selectTicket);
  const [IsChanged, setIsChanged] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successFullUpdate, setSuccessFullUpdate] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    IssueType: "",
    Email: user?.Email,
    Subject: "",
    Description: "",
    Priority: priorityOptions[0],
  });
  const [ErrorMessage, setErrorMessage] = useState("");
  const [Error, setError] = useState({
    issueType: false,
    Email: false,
    Subject: false,
    Discription: false,
  });
  const [removedAttachment, setRemovedAttachment] = useState<Attachement[]>();
  const [attachment, setAttachement] = useState<any>([]);
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
    Action: Dispatch<SetStateAction<any>>,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const array: File[] = Array.from(e.target.files);
      Action((prevState: any) => [...prevState, ...array]);
    }
  };

  const AttachmentChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const maxsize = 20 * 1024 * 1024;
    const selectedFile = e.target.files?.[0];
    if (e.target.files && selectedFile) {
      if (selectedFile.size > maxsize) {
        attachFiles(setErrorAttachments, e);
      } else if (
        attachment?.some((file: any) =>
          "name" in file
            ? file.name === selectedFile.name
            : file.FileName === selectedFile.name
        )
      )
        e.target.value = "";
      else if (
        attachment &&
        [...attachment, ...Array.from(e.target.files)]?.reduce(
          (count, { size }) => {
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
  const onSubmit =  (data:any) => {
     console.log("come on man")
    console.log(data)
    // if (validateForm()) {
    //   setIsValid(true);
    //   const { IssueType, Subject, Description, Email, Priority } = formData;
    //   const ticket = {
    //     IssueType,
    //     Subject,
    //     Description,
    //     Email,
    //     Priority,
    //     UserId: user?.Id,
    //   };
    //   const file = attachment;
    //   dispatch(addAttachementStart({ ticket, file }));
    // }
  };
  useEffect(() => {
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
      const element = document.getElementById("Fullname");
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
      if (!Loading && isValid && error === null) {
        setFormData({
          IssueType: "",
          Email: user?.Email,
          Subject: "",
          Description: "",
          Priority: priorityOptions[0],
        });
        setSuccessFullUpdate(true);
        setTimeout(() => {
          setSuccessFullUpdate(false);
          router.push("/support/");
        }, 1000);
      }
    };

    checkError();
  }, [isValid, Loading, error]);
  return (
    <>
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

      <div className="md:p-20 p-2 bg-slate-100" id="Fullname">
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
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-lg md:p-10 p-2 flex flex-col gap-5"
          method="POST"
        >
          {Loading && (
            <CircularProgress
              color="secondary"
              size={30}
              className="self-end"
            />
          )}
          <div className="flex flex-col gap-1">
            <h1 className="md:text-xl text-sm text-gray-600 font-bold ">
              What is your issue ?{" "}
              <span className="text-red-500 self-center"> *</span>
            </h1>
            <Autocomplete
              className={`md:w-[70%] w-[full] ${
                Loading
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              disabled={Loading}
              {...register("IssueType")}
              onChange={(event: any, newValue: any) => {
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
              renderInput={(params) => (
                <TextField key={params.id} {...params} label="Issue type" />
              )}
            />
            {Error.issueType && (
              <p className="text-[12px] text-red-500">This field is required</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="md:text-lg text-sm text-gray-700 font-semibold ">
              Email <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="Email"
              {...register("Email")}
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
            }`}
            disabled={Loading}
            inputValue={formData.Priority}
            {...register("Priority")}
            onInputChange={(event, newPriority) => {
              setFormData((prevState) => ({
                ...prevState,
                Priority: newPriority,
              }));
            }}
            id="combo-box-demo"
            options={priorityOptions}
            renderInput={(params) => (
              <TextField key={1} {...params} label="Priority" />
            )}
          />
          <div className="flex flex-col gap-1">
            <label className="md:text-lg text-sm text-gray-700 font-semibold ">
              Subject <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="Subject"
              {...register("Subject")}
              className={`md:w-[70%] w-full h-14 border-2  outline-none focus:outline-2 focus:outline-blue-500 hover:outline-1 hover:outline-black
              rounded-md ${
                Loading
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              autoFocus={Error.Subject}
              onChange={handleChange}
              onFocus={() =>
                setError((prevState) => ({ ...prevState, Subject: false }))
              }
            />
            {Error.Subject && (
              <p className="text-[12px] text-red-500">This field is required</p>
            )}
          </div>
          <label className="md:text-lg text-sm text-gray-700 font-semibold ">
            Description <span className="text-red-700">*</span>
          </label>
          <div className="flex flex-col gap-1">
            <MyEditor {...register("Description")} value={formData.Description} setValue={setFormData} />
            {Error.Discription && (
              <p className="text-[12px] text-red-500">This field is required</p>
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
            disabled={Loading}
          />
          {attachment && (
            <AttachmentLists
              setRemovedAttachment={setRemovedAttachment}
              DeleteAttach={false}
              attachment={attachment}
              setAttachement={setAttachement}
              formatBytes={formatBytes}
              setChanged={setIsChanged}
            />
          )}
          {CumulativeErrorFiles?.length != 0 && (
            <AttachmentLists
              setRemovedAttachment={setRemovedAttachment}
              DeleteAttach={false}
              setAttachement={setCumulativeErrorFiles}
              attachment={CumulativeErrorFiles}
              formatBytes={formatBytes}
              message="Cumulative file size can't exceed 20MB"
              error={true}
              setChanged={setIsChanged}
            />
          )}
          {ErrorAttachments?.length !== 0 && (
            <AttachmentLists
              setRemovedAttachment={setRemovedAttachment}
              DeleteAttach={false}
              attachment={ErrorAttachments}
              setAttachement={setErrorAttachments}
              formatBytes={formatBytes}
              message="File size can't exceed 20MB"
              error={true}
              setChanged={setIsChanged}
            />
          )}
          {ErrorDirectoryAttachments?.length !== 0 && (
            <AttachmentLists
              setRemovedAttachment={setRemovedAttachment}
              DeleteAttach={false}
              attachment={ErrorDirectoryAttachments}
              setAttachement={setErrorDirectoryAttachments}
              formatBytes={formatBytes}
              message="Can't Use Directories . You should use only files with Extension {.jpg,.pdf e.t.c}"
              error={true}
              setChanged={setIsChanged}
            />
          )}
          <div className="flex gap-2 p-5">
            <button className="p-3  text-sm bg-slate-50 border rounded-md  border-gray-300">
              cancel
            </button>
            <button
              className={`p-3  text-sm text-white bg-[#063750] border rounded-md ${
                Loading
                  ? "opacity-70 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              } `}
              disabled={Loading}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TextEditor;
