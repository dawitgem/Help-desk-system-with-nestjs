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
    setValue((prevState: any) => ({ ...prevState, Description: content }));
  };
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_EDITOR_API}
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",

        toolbar_location: "bottom",
        statusbar: false,
        menubar: false,
        tinycomments_mode: "embedded",
        images_upload_handler: ImageUploadHandler,
      }}
      initialValue={value}
      onChange={handleChange}
      onEditorChange={handleChange}
    />
  );
}
