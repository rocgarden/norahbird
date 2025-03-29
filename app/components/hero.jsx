import classes from './hero.module.css';

const hero = () => {
  return (
    <header
      className="border-t-2 border-slate-100 text-slate-50 w-full bg-center bg-cover flex items-center justify-center relative"
      style={{ backgroundImage: "url('/bowl.jpg')" , height:"40rem"}}
    >
      <div className="container flex flex-col md:flex-row items-center justify-center sm:mx-auto lg:mr-0 md:h-full">
        {/* Left Section: Square with Image on Top and Text Box Below */}
        <div className="flex flex-col items-center justify-center   pb-1 -mb-80 w-80 h-80 relative z-10">
          {/* Image on top */}
          {/* <img
            className="w-full h-2/3 object-cover rounded-t-lg"
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1721411674/snoraProfile_hs3sng.jpg`}
            alt="Profile picture"
          /> */}

          {/* Text Box below the Image */}
          {/* <div className="bg-slate-100 w-full h-1/3 p-3 rounded-b-lg flex items-center justify-center">
            <div className="text-center">
              <h1 className="sm:hidden block text-2xl font-medium tracking-wide text-gray-800 md:text-4xl">
                Norah <span className="text-[#F6AF3B]">Bird</span>
              </h1>
              <h2 className="font-semibold border-b-2 border-gray-700 text-gray-700 my-4">
                Food | Fun | Travel
              </h2>
              <h2 className="font-ArchitectsDaughter hidden md:block mt-2 text-base text-gray-700">
                Sharing Places and food I enjoy every day.
              </h2>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default hero;



    // <header
    //   className=" border-t-2 border-slate-100 text-slate-50 w-full bg-center"
    //   // style={{
    //   //   height: "25rem",
    //   //   backgroundImage: `url(/leaves-8724_128.gif)`,
    //   // }}
    // >
    //   <div className="container flex flex-col md:flex-row sm:mx-auto lg:mr-0 md:h-115 md:items-center md:space-x-6">
    //     {/* px-6 py-4  md:pb-16 */}
    //     <div className=" mr-5 flex flex-col justify-items-center pl-10 pb-10 w-full md:flex-row md:w-1/2">
    //       <div className="max-w-lg  md:order-2">
    //         <div className="hidden  w-full md:flex">
    //           <div className="flex">
    //             <img
    //               className="w-60 mt-5 "
    //               src={
    //                 `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}` +
    //                 "/v1721411674/snoraProfile_hs3sng.jpg "
    //               }
    //               alt="Profile picture"
    //             />
    //           </div>
    //           {/* <img
    //         className="animate-fly h-32 mr-3 w-auto"
    //         src="/birdLogo.png"
    //         alt="Norah Bird"
    //         height='auto'
    //         width='auto'
    //       /> */}
    //         </div>
    //         <div className="bg-slate-100  w-50 p-3 -m-4">
    //           <h1 className="sm:hidden block text-2xl font-medium tracking-wide text-gray-800 md:text-4xl">
    //             Norah <span className={classes.name}>Bird</span>
    //           </h1>
    //           <h2 className="font-semibold border-b-2 border-gray-700  text-gray-700 my-4">
    //             Food | Fun | Travel
    //           </h2>
    //           <h2 className="font-ArchitectsDaughter hidden md:block mt-2 text-base   text-gray-700">
    //             Sharing Places and food I enjoy everyday.
    //           </h2>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex items-center justify-center w-full h-96 relative isolate  ">
    //       <img
    //         className=" object-cover w-full h-full max-w-4xl"
    //         src="/bowl.jpg"
    //         alt="bowl photo"
    //       />
    //       <h2 className="absolute font-semibold  tracking-wide md:hidden block mt-2 text-base">
    //         Sharing Places and food I enjoy everyday.
    //       </h2>
    //       {/* </div> */}
    //     </div>
    //   </div>
    // </header>;
