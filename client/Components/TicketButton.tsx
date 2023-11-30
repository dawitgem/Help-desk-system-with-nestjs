import React, { Dispatch, ReactElement, SetStateAction } from "react";
import {
  Avatar,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import { HiReply } from "react-icons/hi";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
  TbNotes,
} from "react-icons/tb";
import { CgMailForward } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi";
import { TiTrash } from "react-icons/ti";
import { RiMore2Fill } from "react-icons/ri";
import {
  MdOutlineMoreHoriz,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
} from "react-icons/md";
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#123d52",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#123d52",
  },
}));

interface TicketButtonProps {
  toolTipTitle: string;
  Icon: ReactElement;
  clickHandler: () => void;
  buttonTitle?: string;
}

const TicketButton = ({
  toolTipTitle,
  Icon,
  clickHandler,
  buttonTitle,
}: TicketButtonProps) => {
  return (
    <BootstrapTooltip
      title={toolTipTitle}
      placement="bottom-start"
      className="z-[0]"
    >
      <button
        className="border-gray-300 border bg-[#ffffffb7] rounded-lg text-gray-600 text-[14px] font-medium px-3 shadow-sm  flex gap-1 align-middle justify-center  hover:bg-[#f2f2f2bd]"
        onClick={clickHandler}
      >
        {Icon}
        <p className="self-center">{buttonTitle}</p>
      </button>
    </BootstrapTooltip>
  );
};

export default TicketButton;

interface TicketNavigationButtonProps {
  toolTipTitle: string;
  Icon: ReactElement;
  clickHandler: () => void;
}

export const TicketNavigationButton = ({
  toolTipTitle,
  Icon,
  clickHandler,
}: TicketNavigationButtonProps): any => {
  return (
    <BootstrapTooltip
      title={toolTipTitle}
      placement="bottom-start"
      className="z-[0]"
    >
      <button className=" text-gray-600  font-medium px-3 shadow-sm   hover:bg-[#f2f2f2bd]">
        {Icon}
      </button>
    </BootstrapTooltip>
  );
};

export const TicketReplyButton = ({
  toolTipTitle,
  Icon,
  clickHandler,
}: TicketNavigationButtonProps): any => {
  return (
    <BootstrapTooltip
      title={toolTipTitle}
      placement="top-start"
      className="z-[0]"
    >
      <button className="hover:bg-gray-200  rounded-md text-lg py-1 text-gray-600  font-medium px-2   hover:bg-[#f2f2f2bd]">
        {Icon}
      </button>
    </BootstrapTooltip>
  );
};

interface TicketNavbarButtonsProps {
  OpenContact: boolean;
  OpenForward: boolean;
  setOpenReply: Dispatch<SetStateAction<boolean>>;
  setOpenForward: Dispatch<SetStateAction<boolean>>;
  setIsClosed: Dispatch<SetStateAction<boolean>>;
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
  setIsMore: Dispatch<SetStateAction<boolean>>;
  setOpenContact: Dispatch<SetStateAction<boolean>>;
}
export const TicketNavbarButtons = ({
  setOpenReply,
  setOpenForward,
  setOpenContact,
  OpenContact,
  OpenForward,
}: TicketNavbarButtonsProps) => {
  const handleReplyClick = () => {
    setOpenReply(true);
    const element = document.getElementsByClassName("ql-editor").item(0);
    if (element && element instanceof HTMLElement) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      element.style.height = "400px";
      element.style.overflow = "auto";
      element.focus();
    }
  };

  return (
    <div className="sticky z-[10] top-14 px-10 py-[8px] h-14 bg-slate-100  border border-gray-300 shadow-sm  flex justify-between">
      <div className="flex gap-2 ">
        <TicketButton
          toolTipTitle="Reply ( r )"
          Icon={<HiReply className="self-center" />}
          buttonTitle={"Reply"}
          clickHandler={handleReplyClick}
        />
        <TicketButton
          toolTipTitle="Forward ( f )"
          Icon={<CgMailForward className="self-center text-lg" />}
          buttonTitle={"Forward"}
          clickHandler={() => {
            setOpenForward(true);
          }}
        />{" "}
        <TicketButton
          toolTipTitle="Close ( c )"
          Icon={<FiCheckCircle className="self-center text-md" />}
          buttonTitle={"Close"}
          clickHandler={() => {}}
        />
        <TicketButton
          toolTipTitle="Delete ( # )"
          Icon={<TiTrash className="self-center text-lg" />}
          buttonTitle={"Delete"}
          clickHandler={() => {}}
        />
        <TicketButton
          toolTipTitle="More "
          Icon={<RiMore2Fill className="self-center text-md" />}
          clickHandler={() => {}}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex  bg-[#ffffffb7] border border-gray-300 rounded-lg divide-x shadow-sm">
          <TicketNavigationButton
            toolTipTitle={"Previous ( k )"}
            Icon={<MdOutlineNavigateBefore className="text-lg text-gray-800" />}
            clickHandler={() => {}}
          />
          <TicketNavigationButton
            toolTipTitle={"Jump to ticket"}
            Icon={<MdOutlineMoreHoriz className="text-lg text-gray-800" />}
            clickHandler={() => {}}
          />
          <TicketNavigationButton
            toolTipTitle={"Next ( j )"}
            Icon={<MdOutlineNavigateNext className="text-lg text-gray-800" />}
            clickHandler={() => {}}
          />
        </div>
        <BootstrapTooltip
          title={`${OpenContact ? "Collapse" : "Expand"}`}
          placement="bottom-start"
          className="z-[0]"
        >
          <button
            className={` text-gray-600  font-medium px-3 shadow-sm bg-[#ffffffb7] rounded-lg border border-gray-300   hover:bg-[#f2f2f2bd] ${
              OpenForward
                ? "md:opacity-60 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            onClick={() => setOpenContact((prevState) => !prevState)}
            disabled={OpenForward}
          >
            {OpenContact ? (
              <TbLayoutSidebarRightCollapse className="text-gray-700 text-lg" />
            ) : (
              <TbLayoutSidebarLeftCollapse className="text-gray-700 text-lg" />
            )}
          </button>
        </BootstrapTooltip>
      </div>
    </div>
  );
};
