import { logout } from "@/actions"

const LogoutButton = () => {
  return (
    <form action={logout} className="flex items-center justify-center min-h-screen">
      <button className="p-2 border border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition-colors duration-200">
        Logout
      </button>
    </form>
  )
}

export default LogoutButton
