import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

const FormError = ({ message }: { message: string }) => {
  return (
    <div className="flex gap-2 items-center bg-red-100 p-2">
      <ShieldExclamationIcon className="h-6 w-6 text-red-500" />
      <p className="text-red-500">{message}</p>
    </div>
  );
};

export default FormError;
