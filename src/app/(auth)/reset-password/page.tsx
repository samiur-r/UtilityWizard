import PasswordResetForm from "@/components/PasswordResetForm";

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams.token;

  return <PasswordResetForm token={token as string} />;
};

export default ResetPassword;
