import Image from "next/image";
import classes from './about.module.css';

export const metadata = {
  title: 'Norah Bird/About',
  description: 'About Me, Norah Bird',
}


const about = () => {

    
      return ( 
  <div className={classes.title}>
   <div className="grid flex-col-3 justify-items-center content-center mx-auto mt-10 max-w-2xl gap-x-2 gap-y-8 pt-10 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"> 
       <div>
        <div>
            <div className="mt-4">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
              >
                  <div className="lg:flex hidden items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={process.env.NEXT_PUBLIC_CLOUDINARY_URL + "/v1710185768/next/bday_vyoo89.jpg"}
                          alt="bday"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-45 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img 
                            src={process.env.NEXT_PUBLIC_CLOUDINARY_URL + "/v1710714711/apple-touch-icon_nsqu9s.png"}
                          alt="logo"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={process.env.NEXT_PUBLIC_CLOUDINARY_URL + "/v1691982080/samples/food/dessert.jpg"}
                          alt="pie"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={process.env.NEXT_PUBLIC_CLOUDINARY_URL + "/v1710714362/hiking_uv3pmf.jpg"}
                          alt="hike"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={process.env.NEXT_PUBLIC_CLOUDINARY_URL +"/v1710715969/mudrun_ivdoyb.jpg"}
                          alt="run"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
    </div>
     
    <div>
    {
      <Image 
        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}` + "/v1718822970/snora_advfnw.jpg"}
        alt="image" 
        width="0"
        height="0"
        sizes="100vw , 100vh"
        style={{ width: 'auto', height: 'auto' }}
        className="shadow-2xl"
        priority
          />   
    }   
      
    </div>
    <div>
        <div>
            <div className="mt-8">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
              >
            <article className="flex max-w-xl flex-col items-start m-3">
             <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">About Me</h1>
              <p className="text-base text-gray-900">I have lived in Santa Monica for over 20 years. Love to eat out. Enjoy traveling.
              &quot;Love&quot; to share ideas and tips.</p>

            </article>
                {/* <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8"> */}
                  {/* <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src=""
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src=""
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src=""
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src=""
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src=""
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src=""
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src=""
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              {/* </div> */}
            </div>
          </div>
    </div>
 </div>

</div>
      
  )
}

export default about;