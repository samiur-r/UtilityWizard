import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

const FormFeedback = ({ message, type }: { message: string; type: string }) => {
  const isError = type === "error";
  return (
    <div
      className={`flex gap-2 items-center p-2 ${
        isError ? "bg-red-100" : "bg-green-100"
      }`}
    >
      <ShieldExclamationIcon
        className={`h-5 w-5 ${isError ? "text-red-600" : "text-green-600"}`}
      />
      <p className={`text-sm ${isError ? "text-red-600" : "text-green-600"}`}>
        {message}
      </p>
    </div>
  );
};

export default FormFeedback;
