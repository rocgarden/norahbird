import Feed from './feed/page';
import Hero from './components/hero';
import { headers } from "next/headers";
export default function Home() {
    const nonce = headers().get("x-nonce");
    console.log("nonce::: ", nonce);

  return (
    <main>
      <Hero />
      <Feed />
    </main>
  );
}
