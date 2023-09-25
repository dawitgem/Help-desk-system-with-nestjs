import { Autocomplete, TextField } from "@mui/material";
import Editor from "./Editor";
import { BsPaperclip } from "react-icons/bs";
import { modules } from "@/Inputs";
import { readonlymodules } from "@/Inputs";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

import AttachmentLists from "./AttachmentLists";

interface AutocompleteOption {
  label: string;
}
const options = ["Ask a question", "Report an issue", "Enquire status"];
const priorityOptions = ["Low", "Medium", "High", "Urgent"];

const TextEditor = () => {
  const [Priority, setPriority] = useState(priorityOptions[0]);
  const [issueType, setIssueType] = useState<string | null>("");
  const [Email, setEmail] = useState("dawitgem@gmail.com");
  const [Subject, setSubject] = useState("");
  const [Discription, setDiscription] = useState("");
  const [Error, setError] = useState({
    issueType: false,
    Email: false,
    Subject: false,
    Discription: false,
  });
  const [attachment, setAttachement] = useState<File[] | null>([]);
  const [ErrorAttachments, setErrorAttachments] = useState<File[] | null>([]);
  const [CumulativeErrorFiles, setCumulativeErrorFiles] = useState<
    File[] | null
  >([]);

  let valid: boolean = true;
  const validateInput = (input: string | null, inputId: string) => {
    if (!input || input === "<p><br></p>") {
      const element = document.getElementById(inputId);
      valid = false;
      if (element) {
        const offset = 300;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
        setError((prevState) => {
          return { ...prevState, [inputId]: true };
        });
      }
    } else
      setError((prevState) => {
        return { ...prevState, [inputId]: false };
      });
  };

  const validateForm = () => {
    validateInput(issueType, "issueType");
    validateInput(Email, "Email");
    validateInput(Subject, "Subject");
    validateInput(Discription, "Discription");
    return valid;
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  };

  const attachFiles = (
    Action: Dispatch<SetStateAction<File[] | null>>,
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
      } else if (attachment?.some((file) => file.name === selectedFile.name))
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
      } else {
        attachFiles(setAttachement, e);
      }
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) console.log("come on babay");
  };
  return (
    <div className="md:p-20 p-2 bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg md:p-10 p-2 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1">
          <h1 className="md:text-xl text-sm text-gray-600 font-bold ">
            What is your issue ?{" "}
            <span className="text-red-500 self-center"> *</span>
          </h1>
          <Autocomplete
            className="md:w-[70%] w-[full] "
            onChange={(event: any, newValue: string | null) => {
              setError((prevState) => {
                return { ...prevState, issueType: false };
              });
              setIssueType(newValue);
            }}
            onInputChange={(event, newInputValue) => {}}
            id="issueType"
            options={options}
            renderInput={(params) => (
              <TextField key={1} {...params} label="Issue type" />
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
            className="md:w-[70%] w-full h-14 border-2  outline-none focus:outline-2 focus:outline-blue-500 hover:outline-1 hover:outline-black
          rounded-md"
            value={Email}
            onChange={(e) => {
              setError((prevState) => {
                return { ...prevState, Email: false };
              });
              setEmail(e.target.value);
            }}
          />
          {Error.Email && (
            <p className="text-[12px] text-red-500">This field is required</p>
          )}
        </div>
        <label className="md:text-lg text-sm text-gray-d700 font-semibold ">
          Priority
        </label>
        <Autocomplete
          className="md:w-[70%] w-[full] "
          inputValue={Priority}
          onInputChange={(event, newPriority) => {
            setPriority(newPriority);
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
            className="md:w-[70%] w-full h-14 border-2  outline-none focus:outline-2 focus:outline-blue-500 hover:outline-1 hover:outline-black
          rounded-md"
            autoFocus={Error.Subject}
            onChange={(e) => {
              setError((prevState) => {
                return { ...prevState, Subject: false };
              });
              setSubject(e.target.value);
            }}
          />
          {Error.Subject && (
            <p className="text-[12px] text-red-500">This field is required</p>
          )}
        </div>
        <label className="md:text-lg text-sm text-gray-700 font-semibold ">
          Description <span className="text-red-700">*</span>
        </label>
        <div className="flex flex-col gap-1">
          <Editor
            modules={modules}
            setValue={setDiscription}
            setError={setError}
          />
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
        />
        {attachment && (
          <AttachmentLists
            attachment={attachment}
            setAttachement={setAttachement}
            formatBytes={formatBytes}
          />
        )}
        {CumulativeErrorFiles?.length != 0 && (
          <AttachmentLists
            setAttachement={setCumulativeErrorFiles}
            attachment={CumulativeErrorFiles}
            formatBytes={formatBytes}
            message="Cumulative file size can't exceed 20MB"
            error={true}
          />
        )}
        {ErrorAttachments?.length != 0 && (
          <AttachmentLists
            attachment={ErrorAttachments}
            setAttachement={setErrorAttachments}
            formatBytes={formatBytes}
            message="File size can't exceed 20MB"
            error={true}
          />
        )}
        <div className="flex gap-2 p-5">
          <button className="p-3  text-sm bg-slate-50 border rounded-md  border-gray-300">
            cancel
          </button>{" "}
          <button className="p-3  text-sm text-white bg-[#063750] border rounded-md ">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
