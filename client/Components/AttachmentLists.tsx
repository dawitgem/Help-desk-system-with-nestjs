import {
  Attachement,
  deleteAttachmentStart,
  selectTicket,
} from "@/app/Redux/features/ticketSlice";
import React, { Dispatch, SetStateAction } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";

interface AttachmentListsProps {
  attachment: any;
  setRemovedAttachment: Dispatch<SetStateAction<Attachement[] | undefined>>;
  setAttachement: Dispatch<SetStateAction<any>>;
  setChanged: Dispatch<SetStateAction<boolean>>;
  formatBytes: (size: number) => string;
  message?: string;
  error?: boolean;
  DeleteAttach: boolean;
}
const AttachmentLists = ({
  attachment,
  setAttachement,
  formatBytes,
  message,
  error,
  setChanged,
  DeleteAttach,
  setRemovedAttachment,
}: AttachmentListsProps) => {
  const { Loading } = useSelector(selectTicket);
  return (
    <div>
      {attachment && (
        <div className="text-gray-700 flex flex-col gap-5">
          <p className="text-sm font-medium">{message}</p>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2 w-3/4">
            {attachment.map((attach: any, i: any) => (
              <div
                key={i}
                className={`border ${
                  error ? "border-red-600 line-through" : "border-gray-300"
                } p-2 flex gap-2 w-full`}
              >
                <button
                  className={`text-sm text-gray-600 hover:bg-slate-100 rounded-full w-[20px] h-[20px] ${
                    Loading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  type="button"
                  disabled={Loading}
                  onClick={() => {
                    if (DeleteAttach && "FileName" in attach) {
                      setRemovedAttachment((prevState) => {
                        if (prevState) return [...prevState, attach];
                        else return [attach];
                      });
                    }
                    setChanged(true);
                    const filter = attachment.filter(
                      (file: any) => file !== attachment[i]
                    );
                    setAttachement(filter);
                  }}
                >
                  <LiaTimesSolid />
                </button>
                <p className="text-gray-700 font-medium text-[12px]">
                  {"name" in attach
                    ? attach.name.substring(0, 15) + "..."
                    : attach.FileName.substring(0, 15) + "..."}
                </p>

                <p className="text-gray-700 text-[11px]">
                  ({formatBytes("size" in attach ? attach.size : attach.Size)})
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
