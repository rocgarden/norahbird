import classes from './hero.module.css';

const hero = () => {
  return (
    <header className=" bg-slate-100 border-t-2 border-slate-100 text-slate-50">
      <div className="container flex flex-col md:flex-row sm:mx-auto lg:mr-0 md:h-115 md:items-center md:space-x-6">
        {/* px-6 py-4  md:pb-16 */}
        <div className=" mr-5 flex flex-col justify-items-center pl-10 pb-10 w-full md:flex-row md:w-1/2">
          <div className="max-w-lg  md:order-2">
            <div className="hidden  w-full md:flex">
              <div className="flex">
                <img
                  className="w-60 mt-5 "
                  src={
                    `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}` +
                    "/v1721411674/snoraProfile_hs3sng.jpg "
                  }
                  alt="Profile picture"
                />
              </div>
              {/* <img
            className="animate-fly h-32 mr-3 w-auto"
            src="/birdLogo.png"
            alt="Norah Bird"
            height='auto'
            width='auto'
          /> */}
            </div>
            <div className="bg-slate-100  w-50 p-3 -m-4">
              <h1 className="sm:hidden block text-2xl font-medium tracking-wide text-gray-800 md:text-4xl">
                Norah <span className={classes.name}>Bird</span>
              </h1>
              <h2 className="font-semibold border-b-2 border-gray-700  text-gray-700 my-4">
                Food | Fun | Travel
              </h2>
              <h2 className="font-ArchitectsDaughter hidden md:block mt-2 text-base   text-gray-700">
                Sharing Places and food I enjoy everyday.
              </h2>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-96 relative isolate  ">
          <img
            className=" object-cover w-full h-full max-w-4xl"
            src="/bowl.jpg"
            alt="bowl photo"
          />
          <h2 className="absolute font-semibold  tracking-wide md:hidden block mt-2 text-base">
            Sharing Places and food I enjoy everyday.
          </h2>
          {/* </div> */}
        </div>
      </div>
    </header>
  );
}

export default hero;
