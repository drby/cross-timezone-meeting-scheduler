import { FC } from 'react'

import Link from 'next/link'
import LogoutForm from './authentication/LogoutForm'
import { getSession } from '@/actions'

const Navbar: FC = async () => {
  const session = await getSession()

  return (
    <nav>
      <Link href="/" >Homepage</Link>
      {session.isLoggedIn && <Link href="/calendar" >Calendar</Link>}
      {session.isLoggedIn && <Link href="/profile" >Profile</Link>}
      {!session.isLoggedIn && <Link href="/login" >Login</Link>}
      {!session.isLoggedIn && <Link href="/signup" >Sign up</Link>}
      {session.isLoggedIn && <LogoutForm />}
    </nav>
  )
}

export default Navbar
