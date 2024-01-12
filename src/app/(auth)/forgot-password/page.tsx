"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormError from "@/components/FormFeedback";
import {
  TForgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/validations/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { forgotPassword } from "@/actions/forgot-password";

const ForgotPassword = () => {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: TForgotPasswordSchema) => {
    setErrorMsg("");
    setSuccessMsg("");
    startTransition(() => {
      forgotPassword(data)
        .then((res) => {
          if (res?.error) setErrorMsg(res.error);
          else if (res?.success) setSuccessMsg(res.success);
          // else if (res?.redirect) router.push("/dashboard");
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-8 spx-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-secondary">
            Forgot your password?
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    className="block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2">{`${errors.email.message}`}</p>
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
                  Send reset email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
