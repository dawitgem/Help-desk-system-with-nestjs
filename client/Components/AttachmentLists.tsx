import React, { Dispatch, SetStateAction } from "react";
import { LiaTimesSolid } from "react-icons/lia";

interface AttachmentListsProps {
  attachment: File[] | null;
  setAttachement: Dispatch<SetStateAction<File[] | null>>;
  formatBytes: (size: number) => string;
  message?: string;
  error?: boolean;
}
const AttachmentLists = ({
  attachment,
  setAttachement,
  formatBytes,
  message,
  error,
}: AttachmentListsProps) => {
  return (
    <div>
      {attachment && (
        <div className="text-gray-700 flex flex-col gap-5">
          <p className="text-sm font-medium">{message}</p>
          <div className="grid grid-cols-2 gap-2 w-3/4">
            {attachment.map((attach, i) => (
              <div
                key={i}
                className={`border ${
                  error ? "border-red-600 line-through" : "border-gray-300"
                } p-2 flex gap-2 w-full`}
              >
                <button
                  className="text-sm text-gray-600 hover:bg-slate-100 rounded-full w-[20px] h-[20px]"
                  type="button"
                  onClick={() => {
                    setAttachement(
                      attachment.filter((attach) => attach != attachment[i])
                    );
                  }}
                >
                  <LiaTimesSolid />
                </button>
                <p className="text-gray-700 font-medium text-[12px]">
                  {attach.name.substring(0, 15) + "..."}
                </p>

                <p className="text-gray-700 text-[11px]">
                  ({formatBytes(attach.size)})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentLists;
