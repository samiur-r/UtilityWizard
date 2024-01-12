import { auth } from "@/auth";
import SettingsForm from "@/components/SettingsForm";

const Settings = async () => {
  const session = await auth();

  return <SettingsForm session={session} />;
};

export default Settings;
