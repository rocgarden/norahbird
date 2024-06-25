'use client'
import GoogleSignInButton from "../components/googleSignInButton";
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const SignInPage = () => {
  const { data: session } = useSession()

  return (
    <section className="flex min-h-full overflow-hidden pt-16 sm:py-28">
      {
        session ? (
          redirect('/')
        ) : 
        <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
        <div className="relative mt-12 sm:mt-16">
          <img
            className="animate-fly mx-auto h-20 w-auto"
            src="/birdLogo.png"
            alt="Norah Bird"
            height='auto'
            width='auto'
          />
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="sm:rounded-5xl -mx-4 mt-10 flex-auto bg-white px-4 py-10  sm:mx-0 sm:flex-none sm:p-24">
          <GoogleSignInButton  />
        </div>
      </div>
      }
   
    </section>
  );
};

export default SignInPage;
