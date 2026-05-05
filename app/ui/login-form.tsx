"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="rounded-lg bg-gray-50 px-6 pb-4 pt-8 flex-1">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 text-xs font-medium text-gray-900 block"
              htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer rounded-md border-gray-200 pl-10 text-sm placeholder:text-gray-500 block w-full border py-[9px] outline-2"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                data-1p-ignore
              />
              <AtSymbolIcon className="left-3 text-gray-500 peer-focus:text-gray-900 pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 text-xs font-medium text-gray-900 block"
              htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer rounded-md border-gray-200 pl-10 text-sm placeholder:text-gray-500 block w-full border py-[9px] outline-2"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                data-1p-ignore
              />
              <KeyIcon className="left-3 text-gray-500 peer-focus:text-gray-900 pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callBackUrl} />
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="h-5 w-5 text-gray-50 ml-auto" />
        </Button>
        <div
          className="h-8 space-x-1 flex items-end"
          aria-live="polite"
          aria-atomic="true">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
