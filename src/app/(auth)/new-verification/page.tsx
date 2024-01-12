import Link from "next/link";

import { newVerification } from "@/actions/new-verification";
import LoadingSpinner from "@/components/LoadingSpinner";


const NewVerification = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams.token;
  const result = await newVerification(token as string);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {result.error && (
          <>
            <p className="text-base font-semibold text-gray-900">Oops!</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {result.error}
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Go back to Login
              </Link>
            </div>
          </>
        )}
        {result.success && (
          <>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {result.success}
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Log into your account
              </Link>
            </div>
          </>
        )}
        {!result.error ||
          (result.success && (
            <div className="flex items-center gap-5">
              <LoadingSpinner style="text-secondary  w-8 h-8" />
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Verifying
              </h2>
            </div>
          ))}
      </div>
    </main>
  );
};

export default NewVerification;
