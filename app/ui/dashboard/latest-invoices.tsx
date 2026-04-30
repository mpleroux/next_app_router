import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { fetchLatestInvoices } from "@/app/lib/data";

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="md:col-span-4 flex w-full flex-col">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="rounded-xl bg-gray-50 p-4 flex grow flex-col justify-between">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  "py-4 flex flex-row items-center justify-between",
                  {
                    "border-t": i !== 0,
                  },
                )}>
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold md:text-base truncate">
                      {invoice.name}
                    </p>
                    <p className="text-sm text-gray-500 sm:block hidden">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} text-sm font-medium md:text-base truncate`}>
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="pb-2 pt-6 flex items-center">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
