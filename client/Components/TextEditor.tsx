import { Autocomplete, TextField } from "@mui/material";
import Editor from "./Editor";
import { BsPaperclip } from "react-icons/bs";
import { modules } from "@/Inputs";
import { readonlymodules } from "@/Inputs";
import { FormEvent, useState } from "react";

const newModules = { ...modules, imageDrop: true };
interface AutocompleteOption {
  label: string;
}
const options = ["Ask a question", "Report an issue", "Enquire status"];
const priorityOptions = ["Low", "Medium", "High", "Urgent"];

const TextEditor = () => {
  const [inputValue, setInputValue] = useState(priorityOptions[0]);
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="md:p-20 p-2 bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg md:p-10 p-2 flex flex-col gap-5"
      >
        <h1 className="text-xl text-gray-600 font-bold ">
          What is your issue ?
        </h1>
        <Autocomplete
          key={1}
          className="md:w-[70%] w-[full] "
          onChange={(event: any, newValue: string | null) => {}}
          onInputChange={(event, newInputValue) => {}}
          id="combo-box-demo"
          options={options}
          renderInput={(params) => (
            <TextField key={1} {...params} label="Issue type" />
          )}
        />
        <label className="text-lg text-gray-700 font-semibold ">
          Email <span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          className="md:w-[70%] w-full h-14 border-2  outline-none focus:outline-2 focus:outline-blue-500 hover:outline-1 hover:outline-black
          rounded-md"
        />
        <label className="text-lg text-gray-700 font-semibold ">Priority</label>
        <Autocomplete
          key={2}
          className="md:w-[70%] w-[full] "
          onChange={(event: any, newValue: string | null) => {
            console.log(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="combo-box-demo"
          options={priorityOptions}
          renderInput={(params) => (
            <TextField key={1} {...params} label="Priority" />
          )}
        />
        <label className="text-lg text-gray-700 font-semibold ">
          Subject <span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          className="md:w-[70%] w-full h-14 border-2  outline-none focus:outline-2 focus:outline-blue-500 hover:outline-1 hover:outline-black
          rounded-md"
        />
        <label className="text-lg text-gray-700 font-semibold ">
          Description <span className="text-red-700">*</span>
        </label>
        {/* <Editor modules={modules} /> */}
        <Editor
          modules={readonlymodules}
          value={value}
          setValue={setValue}
          readonly={true}
        />
        <label htmlFor="attachment" className="flex gap-1 ">
          <BsPaperclip />
          <span className="text-blue-600 hover:text-black">Attachment</span>
        </label>
        <input
          id="attachment"
          type="file"
          hidden
          onChange={(e) => console.log(e.target.value)}
        />
        <div className="flex gap-2 p-5">
          <button className="p-3  text-xl bg-slate-50 border rounded-md ">
            cancel
          </button>{" "}
          <button className="p-3  text-xl text-white bg-[#063750] border rounded-md ">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
