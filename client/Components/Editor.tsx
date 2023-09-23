import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  modules: object;
  readonly?: boolean;
  style?: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

const Editor = ({ modules, readonly, style, value, setValue }: EditorProps) => {
  const [input, setInput] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const onChange = (html: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgElements = doc.querySelectorAll("img");
    const imageInputs: any = [];

    imgElements.forEach((img) => {
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt");
      imageInputs.push({ src, alt });
    });

    console.log("Extracted image inputs:", imageInputs);
  };
  console.log(readonly);
  return (
    <div className={`${style ? style : "w-[70%]"} w-full`}>
      {readonly ? (
        <ReactQuill
          modules={modules}
          theme="snow"
          readOnly
          value={"alskdfjla;skjdf;laksjdfl;kjasdlfkjasldkfj"}
          className="ql-container"
        />
      ) : (
        <ReactQuill
          modules={modules}
          theme="snow"
          onChange={onChange}
          placeholder="Type here"
        />
      )}
    </div>
  );
};

export default Editor;
