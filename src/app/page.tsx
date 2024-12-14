import { FC } from "react";

import Link from 'next/link';

const Home: FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <Link href="https://www.youtube.com/watch?v=xvFZjo5PgG0">Cross-Timezone Meeting Scheduler</Link>
    </div>
  );
}

export default Home;