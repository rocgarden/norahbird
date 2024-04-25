import classes from './hero.module.css';

const hero = () => {
  return (
          // <div className="grid content-center place-items-center mx-auto lg:mx-0 bg-auto bg-center">
            <div className={classes.hero} fetchPriority="high" rel='preload'>
            <h2 className="text-3xl tracking-tight text-white md:text-6xl text-center" >
              From the blog
            </h2>
         
            <p className="md:text-3xl leading-8 text-white text-center text-xl">
              Take a tour of my favorite spots to eat and have fun.
            </p>
          </div>  
          )
}

export default hero;
