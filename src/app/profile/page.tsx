import { changeUsername, getSession } from "@/actions"
import { redirect } from "next/navigation"

const Page = async () => {
  const session = await getSession()

  if (!session.isLoggedIn) {
    redirect("/")
  }

  return (
    <div className="profile">
      <h1>Profile page</h1>
      <p>Welcome, <b>{session.username}</b></p>
      <h4>Change user name</h4>
      <form action={changeUsername}>
        <input type="text" name="username" required placeholder={session.username} />
        <button>Update</button>
      </form>
    </div>
  )
}

export default Page
