"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import FormError from "@/components/FormFeedback";
import { RegisterSchema, TRegisterSchema } from "@/validations/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { register } from "@/actions/register";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

const Register = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleSocialRegister = (provider: string) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: TRegisterSchema) => {
    setErrorMsg("");
    setSuccessMsg("");
    startTransition(() => {
      register(data)
        .then((res) => {
          if (res?.error) setErrorMsg(res.error);
          else if (res?.success) setSuccessMsg(res.success);
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-8 px-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-secondary">
            Register a new account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    {...registerField("name")}
                    id="name"
                    type="text"
                    className="block w-full px-2 rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-2">{`${errors.name.message}`}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...registerField("email")}
                    id="email"
                    type="email"
                    className="block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2">{`${errors.email.message}`}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    {...registerField("password")}
                    id="password"
                    type="password"
                    className="block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 fo sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2">{`${errors.password.message}`}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    {...registerField("confirmPassword")}
                    id="confirmPassword"
                    type="password"
                    className="block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-2">{`${errors.confirmPassword.message}`}</p>
                )}
              </div>
              {errorMsg && <FormError message={errorMsg} type="error" />}
              {successMsg && <FormError message={successMsg} type="success" />}
              <div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="flex w-full justify-center items-center gap-2 rounded-md bg- px-3 py-1.5 text-sm font-semibold leading-6 text-secondary shadow-sm bg-primary hover:bg-secondary hover:text-white"
                >
                  {isPending && <LoadingSpinner style="text-white  w-5 h-5" />}
                  Register
                </button>
              </div>
            </form>
            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSocialRegister("google")}
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#C71610] px-3 py-1.5 text-[#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C71610]"
                >
                  <Image
                    src="/gmail-icon.png"
                    width={20}
                    height={20}
                    alt="gmail-ico"
                  />
                  <span className="text-sm font-semibold leading-6">Gmail</span>
                </button>

                <button
                  onClick={() => handleSocialRegister("github")}
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    GitHub
                  </span>
                </button>
              </div>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login to your account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
