import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createInvoice } from "@/app/lib/actions";

export default function Form({ customers }: { customers: CustomerField[] }) {
  return (
    <form action={createInvoice}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 text-sm font-medium block">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer rounded-md border-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500 block w-full cursor-pointer border outline-2"
              defaultValue="">
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="left-3 text-gray-500 pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 text-sm font-medium block">
            Choose an amount
          </label>
          <div className="mt-2 rounded-md relative">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer rounded-md border-gray-200 py-2 pl-10 text-sm placeholder:text-gray-500 block w-full border outline-2"
              />
              <CurrencyDollarIcon className="left-3 text-gray-500 peer-focus:text-gray-900 pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium block">
            Set the invoice status
          </legend>
          <div className="rounded-md border-gray-200 bg-white py-3 border px-[14px]">
            <div className="gap-4 flex">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 cursor-pointer focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 gap-1.5 bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 flex cursor-pointer items-center rounded-full">
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 cursor-pointer focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 gap-1.5 bg-green-500 px-3 py-1.5 text-xs font-medium text-white flex cursor-pointer items-center rounded-full">
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 gap-4 flex justify-end">
        <Link
          href="/dashboard/invoices"
          className="h-10 rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200 flex items-center transition-colors">
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
