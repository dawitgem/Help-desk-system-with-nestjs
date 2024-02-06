import Link from "next/link";
import Signout from "./Signout";
import { user } from "@/app/Redux/features/userSlice";

interface agentProps{
  User:user
}
const AgentProfileModal = ({User}:agentProps) => { 
  return (
    <div className="">
      <div className="bg-slate-100 p-4 border-b flex flex-col gap-1">
        <h3 className="text-md text-gray-700 font-medium">{User?.UserName}</h3>
        <p className="text-sm text-gray-500">{User?.Email}</p>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <Link
          href={`/a/profile/${User.Id}`}
          className="text-sm p-2 text-gray-700 font-medium hover:bg-slate-100 "
        >
          Profile setting
        </Link>
        <Link
          href={"/support"}
          className="text-sm p-2 text-gray-700 font-medium hover:bg-slate-100 "
        >
          Go to customer Portal
        </Link>
       <Signout/>
      </div>
    </div>
  );
};

export default AgentProfileModal;
