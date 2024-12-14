import { FC } from 'react';
import Link from 'next/link';
import LogoutForm from './authentication/LogoutButton';
import { getSession } from '@/actions';

const Navbar: FC = async () => {
  const session = await getSession();

  return (
    <nav className="h-24 flex gap-8 items-center justify-center font-medium">
      <Link href="/" className="hover:underline">Homepage</Link>
      {session.isLoggedIn && <Link href="/calendar" className="hover:underline">Calendar</Link>}
      {session.isLoggedIn && <Link href="/profile" className="hover:underline">Profile</Link>}
      {!session.isLoggedIn && <Link href="/login" className="hover:underline">Login</Link>}
      {!session.isLoggedIn && <Link href="/signup" className="hover:underline">Sign up</Link>}
      {session.isLoggedIn && <LogoutForm />}
    </nav>
  );
};

export default Navbar;
