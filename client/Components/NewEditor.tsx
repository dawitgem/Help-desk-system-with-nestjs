import React, { Dispatch, SetStateAction } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { EditorPlugins, EditorToolBar, ImageUploadHandler } from "@/Inputs";
import dotenv from "dotenv";

dotenv.config();

interface MyEditorProps {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
}

export default function MyEditor({ value, setValue }: MyEditorProps) {
  const handleChange = (content: any) => {
    console.log(content);
    setValue((prevState: any) => prevState.concat(content));
  };
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_EDITOR_API}
      init={{
        plugins: EditorPlugins,
        toolbar: EditorToolBar,
        toolbar_location: "bottom",
        statusbar: false,
        menubar: false,
        tinycomments_mode: "embedded",
        images_upload_handler: ImageUploadHandler,

        ai_request: (request: any, respondWith: any) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
      }}
      initialValue={value}
      onChange={handleChange}
      onEditorChange={handleChange}
    />
  );
}
