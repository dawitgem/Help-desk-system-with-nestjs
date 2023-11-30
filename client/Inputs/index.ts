import { storage } from "@/firebase/firebaseconfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const EditorPlugins =
  "ai tinycomments mentions anchor autolink charmap codesample emoticons image code link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss";
export const EditorToolBar =
  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image code table  | align lineheight |  checklist numlist bullist indent outdent |  removeformat";

export const filePicker = (callback: any, value: any, meta: any) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.onchange = function () {
    const file = input.files![0];
    const reader = new FileReader();

    reader.onload = function (e) {
      callback(e.target!.result, {
        alt: file.name,
      });
    };

    reader.readAsDataURL(file);
  };

  input.click();
};

export const ImageUploadHandler = async (
  blobInfo: any,
  progress: any
): Promise<string> => {
  const file = blobInfo.blob();
  return await new Promise((resolve, reject) => {
    const ImageRef = ref(storage, `EditorImage/${file.name}`);
    const uploadTask = uploadBytesResumable(ImageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const Imageprogress =
          Math.round(
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 5
          ) * 5;
        progress(Imageprogress);
      },
      (Error) => {
        switch (Error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          if (url) resolve(url);
        } catch (e: any) {
          reject(e);
        }
      }
    );
  });
};
