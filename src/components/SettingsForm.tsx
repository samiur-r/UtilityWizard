"use client";

import { changeName } from "@/actions/change-name";
import { NameSchema, TNameSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "@/components/Toast";

const SettingsForm = ({ session }: { session: any }) => {
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  const [isPendingName, startTransitionName] = useTransition();
  const [toastOpts, setToastOpts] = useState({
    showToast: false,
    isToastError: false,
    toastMessage: "",
  });

  const {
    register: registerChangeNameField,
    handleSubmit: handleChangeNameSubmit,
    formState: { errors: errorsName, isSubmitting: isSubmittingName },
  } = useForm<TNameSchema>({
    resolver: zodResolver(NameSchema),
  });

  const handleChangeName = (values: { name: string }) => {
    startTransitionName(() => {
      changeName(values)
        .then((res) => {
          if (res.error)
            setToastOpts({
              showToast: true,
              isToastError: true,
              toastMessage: res.error,
            });
          else if (res.success) {
            setToastOpts({
              showToast: true,
              isToastError: false,
              toastMessage: res.success,
            });
          }
        })
        .catch((error) => console.log(error));
    });
  };

  const resetToastValues = () => {
    setToastOpts({
      showToast: false,
      isToastError: false,
      toastMessage: "",
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-8">
      <Toast
        showToast={toastOpts.showToast}
        isToastError={toastOpts.isToastError}
        toastMessage={toastOpts.toastMessage}
        reset={resetToastValues}
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Settings
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg flex flex-col gap-6 shadow-md p-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              disabled
              defaultValue={session?.user?.email ?? ""}
              className="block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <form onSubmit={handleChangeNameSubmit(handleChangeName)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2 grid md:grid-cols-3 gap-5">
              <input
                {...registerChangeNameField("name")}
                id="name"
                type="text"
                defaultValue={session?.user?.name ?? ""}
                className="col-span-2 block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              <button
                type="submit"
                disabled={isSubmittingName}
                className="col-span-1 flex w-full justify-center items-center gap-2 rounded-md bg- px-3 py-1.5 text-xs font-semibold leading-6 text-secondary shadow-sm bg-primary hover:bg-secondary hover:text-white"
              >
                {isPendingName && (
                  <LoadingSpinner style="text-white  w-5 h-5" />
                )}
                Change Name
              </button>
            </div>
            {errorsName.name && (
              <p className="text-red-500 text-xs mt-2">{`${errorsName.name.message}`}</p>
            )}
          </div>
        </form>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2 grid md:grid-cols-3 gap-5">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              disabled
              defaultValue={"**********"}
              className="col-span-2 block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            {!showPasswordResetForm && (
              <button
                onClick={() => setShowPasswordResetForm(!showPasswordResetForm)}
                type="submit"
                className="col-span-1 flex w-full justify-center items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold leading-6 text-secondary shadow-sm bg-primary hover:bg-secondary hover:text-white"
              >
                Change Password
              </button>
            )}
          </div>
        </div>
        {showPasswordResetForm && (
          <form className="space-y-6">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Old Password
              </label>
              <div className="mt-2">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  autoComplete="oldPassword"
                  required
                  className="block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="newPassword"
                  required
                  className="block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm new Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  autoComplete="confirmNewPassword"
                  required
                  className="block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold leading-6 text-secondary shadow-sm bg-primary hover:bg-secondary hover:text-white"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsForm;
