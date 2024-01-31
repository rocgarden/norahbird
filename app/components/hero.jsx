import classes from './hero.module.css';
import Image from "next/image";

const hero = () => {
      // let urlImg = `https://source.unsplash.com/random`;

  return (
          // <div className="grid content-center place-items-center mx-auto lg:mx-0 bg-auto bg-center">
            <div className={classes.div}>
            <h2 className="text-3xl  tracking-tight text-white md:text-6xl text-center" >
              From the blog
            </h2>
         
            <p className="md:text-3xl leading-8 text-white text-center text-xl">
              Learn how to grow your business with our expert advice.
            </p>
          </div>  
          )
}

export default hero;

{/* <Image src={urlImg} 
              alt="Random Image" 
              width="0"
              height="0"
              sizes="100vw"
              className={classes.image}
              priority      
              />    */}