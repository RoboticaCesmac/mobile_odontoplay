import { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./_form";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 items-center justify-center bg-(--background-secondary) lg:flex">
        <div className="flex h-full w-full items-center justify-center px-8">
          <Image src="/assets/img/icons/logo_.png" alt="Logo Odontoplay" width={580} height={500} priority />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}
