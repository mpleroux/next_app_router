import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <div className="px-3 py-4 md:px-2 flex h-full flex-col">
      <Link
        className="mb-2 h-20 rounded-md bg-blue-600 p-4 md:h-40 flex items-end justify-start"
        href="/">
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="space-x-2 md:flex-col md:space-x-0 md:space-y-2 flex grow flex-row justify-between">
        <NavLinks />
        <div className="rounded-md bg-gray-50 md:block hidden h-auto w-full grow"></div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}>
          <button className="gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 flex h-[48px] w-full grow items-center justify-center">
            <PowerIcon className="w-6" />
            <div className="md:block hidden">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
