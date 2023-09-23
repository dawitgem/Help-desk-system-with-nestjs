import FetchedTickets from "@/Components/FetchedTickets";
import LinkTrack from "@/Components/LinkTrack";
import PageHero from "@/Components/PageHero";
import Searchbox from "@/Components/Searchbox";
import { BsTicket } from "react-icons/bs";
import { PiTicket } from "react-icons/pi";
const ArticlePage = () => {
  return (
    <div>
      <PageHero
        pageTitle="Tickets"
        currentLink="tickets"
        Links={[{ link: "Home", href: "/support/" }]}
        Icon={<PiTicket className="md:text-5xl text-2xl text-slate-50" />}
      />
      <FetchedTickets />
    </div>
  );
};

export default ArticlePage;
