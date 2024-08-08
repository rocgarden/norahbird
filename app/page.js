import Feed from './feed/page';
import Hero from './components/hero';
import { headers } from "next/headers";
import Featured from './components/featured';


export default function Home({searchParams}) {

   const nonce = headers().get("x-nonce");

  return (
    <main>
      {/* <Hero /> */}
      <Feed {...searchParams} />
    </main>
  );
}
