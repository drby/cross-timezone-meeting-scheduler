import { FC } from "react";
import { changeUsername } from "@/actions";
import { redirect } from "next/navigation";

interface ProfileContentProps {
  session: {
    isLoggedIn: boolean;
    username: string;
  };
}

const ProfileContent: FC<ProfileContentProps> = ({ session }) => {
  if (!session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="profile-content p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p className="mb-4">Welcome, <b>{session.username}</b></p>
      <h4 className="text-lg font-semibold mb-2">Change Username</h4>
      <form action={changeUsername} className="space-y-4">
        <input
          type="text"
          name="username"
          required
          placeholder={session.username}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
};

export default ProfileContent;
