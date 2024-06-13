import Feed from './feed/page';
import Hero from './components/hero';
import { headers } from "next/headers";
import { Suspense } from 'react';
export default function Home() {
    const nonce = headers().get("x-nonce");

  return (
    <main>
      <Hero />
        <Feed />
    </main>
  );
}
