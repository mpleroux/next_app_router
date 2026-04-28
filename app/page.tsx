import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { lusitana } from "./ui/fonts";

export default function Page() {
  return (
    <main className="p-6 flex min-h-screen flex-col">
      <div className="h-20 rounded-lg bg-blue-500 p-4 md:h-52 flex shrink-0 items-end">
        <AcmeLogo />
      </div>
      <div className="mt-4 gap-4 md:flex-row flex grow flex-col">
        <div className="gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20 flex flex-col justify-center">
          <div className={styles.shape} />
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal antialiased`}>
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-400 md:text-base flex items-center self-start transition-colors">
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="p-6 md:w-3/5 md:px-28 md:py-12 flex items-center justify-center">
          {/* Add Hero Images Here */}
        </div>
      </div>
    </main>
  );
}
