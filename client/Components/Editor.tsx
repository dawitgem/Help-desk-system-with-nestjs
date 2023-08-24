import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  modules: object;
  readonly?: any;
  style?: string;
}

const Editor = ({ modules, readonly, style }: EditorProps) => {
  const [value, setValue] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const onChange = (content: any, delta: any, source: any, editor: any) => {
    setValue(content);
  };

  return (
    <div className={`${style ? style : "w-[70%]"} w-full`}>
      {readonly ? (
        <ReactQuill
          modules={modules}
          theme="snow"
          readOnly
          value={"ticket value"}
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
