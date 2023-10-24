"use client";
import { selectTicket } from "@/app/Redux/features/ticketSlice";
import { storage } from "@/firebase/firebaseconfig";
import { Backdrop } from "@mui/material";
import DOMPurify from "dompurify";
import {
  StorageReference,
  UploadTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import dynamic from "next/dynamic";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LiaTimesSolid } from "react-icons/lia";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";

interface ErrorType {
  issueType: boolean;
  Email: boolean;
  Subject: boolean;
  Discription: boolean;
}
interface EditorProps {
  modules: object;
  style?: string;
  setValue: Dispatch<
    SetStateAction<{
      IssueType: string;
      Email: string | undefined;
      Subject: string;
      Description: string;
      Priority: string;
    }>
  >;
  setError: Dispatch<SetStateAction<ErrorType>>;
}

const Editor = ({ modules, style, setValue, setError }: EditorProps) => {
  const { Loading } = useSelector(selectTicket);
  const [input, setInput] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const editorRef = useRef(null);
  const [ImageInputs, setImageInputs] = useState();
  const [html, setHtml] = useState(" ");
  const [uploadRef, setUploadRef] = useState<StorageReference>();
  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<
    string[] | null | undefined
  >(null);

  const [open, setOpen] = useState(false);

  const cancelUpload = () => {
    if (uploadTask) {
      uploadTask.cancel();
      setUploadProgress(null);
    }
  };

  const onChange = async (html: string) => {
    setError((prevState) => {
      return { ...prevState, Discription: false };
    });

    console.log("don't give up on medlkfjalsdkfjalskdfjlkasjdfjhgjh");

    setValue((prevState) => ({
      ...prevState,
      Description: DOMPurify.sanitize(html),
    }));
  };

  return (
    <div className={`relative  ${style ? style : "w-[70%]"} w-full`}>
      {uploadProgress && (
        <div className="w-full  h-[500px] absolute top-0 left-0 md:bg-transparent z-50">
          <div className="lg:p-5 p-5  lg:w-[300px] border  bg-slate-50 flex flex-col gap-2 rounded-md">
            <button
              className="p-2 text-xl rounded-full hover:bg-slate-300 w-[40px] text-gray-800 "
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
              <p className="text-md text-gray-800 font-bold">
                Image uploading...
              </p>
              <p className="text-md text-blue-500 font-bold">
                {uploadProgress}%
              </p>
            </div>
          </div>
        </div>
      )}
      <ReactQuill
        modules={modules}
        readOnly={Loading}
        theme="snow"
        onChange={onChange}
        onFocus={() => {
          setError((prevState) => ({ ...prevState, Discription: false }));
        }}
        placeholder="Type here"
        id="Description"
      />
    </div>
  );
};

export default Editor;

interface ErrorType {
  issueType: boolean;
  Email: boolean;
  Subject: boolean;
  Discription: boolean;
}
interface TicketEditorProps {
  modules: object;
  style?: string;
  setValue: Dispatch<
    SetStateAction<{
      IssueType: string;
      Email: string;
      Subject: string;
      Description: string;
      Priority: string;
    }>
  >;
  value: string;
  setChanged: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<ErrorType>>;
}
export const TicketEditor = ({
  modules,
  style,
  setValue,
  setError,
  setChanged,
  value,
}: TicketEditorProps) => {
  console.log(value);
  const { Loading } = useSelector(selectTicket);
  const [input, setInput] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const editorRef = useRef(null);

  useEffect(() => {}, []);

  const onChange = (html: string) => {
    setChanged(true);

    setError((prevState) => {
      return { ...prevState, Discription: false };
    });
    setValue((prevState) => ({
      ...prevState,
      Description: DOMPurify.sanitize(html),
    }));
  };

  return (
    <div className={`${style ? style : "w-[70%]"} w-full`}>
      <ReactQuill
        modules={modules}
        readOnly={Loading}
        theme="snow"
        onChange={onChange}
        onFocus={() => {
          setError((prevState) => ({ ...prevState, Discription: false }));
        }}
        value={value ? value : undefined}
        placeholder="Type here"
        id="Description"
      />
    </div>
  );
};
