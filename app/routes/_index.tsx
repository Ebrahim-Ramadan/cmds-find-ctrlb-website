import type { MetaFunction } from "@remix-run/node";
import {CommandHistorySearch} from "~/components/CommandHistorySearch";
import SponserComponent from "~/components/SponserComponent";
export const meta: MetaFunction = () => {
  return [
    { title: "cmds find" },
    { name: "description", content: "Command history search" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center gap-4 py-6 px-4 sm:px-6 lg:px-8">
      <SponserComponent/>
    <CommandHistorySearch/>
    </div>
  );
}
