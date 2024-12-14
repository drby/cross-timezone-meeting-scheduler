import { redirect } from "next/navigation"
import { getSession } from "@/actions";
import ProfileContent from "@/components/ProfileContent";

const Page = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  return <ProfileContent session={{ ...session, username: session.username || "" }} />;
};

export default Page;