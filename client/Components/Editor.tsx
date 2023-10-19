"use client";
import dynamic from "next/dynamic";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "react-quill/dist/quill.snow.css";

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
  const [input, setInput] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const editorRef = useRef(null);

  useEffect(() => {
    const editorContainer = document.getElementById("Description"); // Replace with your actual container ID

    if (editorContainer) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // Handle mutations if needed
          console.log("Content changed");
        });
      });

      const config = { childList: true, subtree: true };
      observer.observe(editorContainer, config);

      return () => {
        observer.disconnect();
      };
    } else {
      console.error("Editor container not found.");
    }
  }, []);

  const onChange = (html: string) => {
    setError((prevState) => {
      return { ...prevState, Discription: false };
    });
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgElements = doc.querySelectorAll("img");
    const imageInputs: any = [];
    imgElements.forEach((img) => {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt");
      imageInputs.push({ src, alt });
    });
    setValue((prevState) => ({ ...prevState, Description: html }));
  };
  return (
    <div className={`${style ? style : "w-[70%]"} w-full`}>
      <ReactQuill
        modules={modules}
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
