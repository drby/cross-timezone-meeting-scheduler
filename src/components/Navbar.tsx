import Link from 'next/link'
import LogoutForm from './LogoutForm'
import { getSession } from '@/actions'

const Navbar = async () => {
  const session = await getSession()

  console.log(session)
  return (
    <nav>
      <Link href="/" >Homepage</Link>
      <Link href="/calendar" >Calendar</Link>
      {session.isLoggedIn && <Link href="/profile" >Profile</Link>}
      {!session.isLoggedIn && <Link href="/login" >Login</Link>}
      {session.isLoggedIn && <LogoutForm />}
    </nav>
  )
}

export default Navbar
