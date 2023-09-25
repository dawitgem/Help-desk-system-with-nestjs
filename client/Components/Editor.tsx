import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
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
  setValue: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<ErrorType>>;
}
const Editor = ({ modules, style, setValue, setError }: EditorProps) => {
  const [input, setInput] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

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
    setValue(html);
  };
  return (
    <div className={`${style ? style : "w-[70%]"} w-full`}>
      <ReactQuill
        modules={modules}
        theme="snow"
        onChange={onChange}
        placeholder="Type here"
        id="Discription"
      />
    </div>
  );
};

export default Editor;
