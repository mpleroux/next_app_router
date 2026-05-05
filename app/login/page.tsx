import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="md:h-screen flex items-center justify-center">
      <div className="space-y-2.5 p-4 md:-mt-32 relative mx-auto flex w-full max-w-[400px] flex-col">
        <div className="h-20 rounded-lg bg-blue-500 p-3 md:h-36 flex w-full items-end">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
