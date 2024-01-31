import PostCard from "../components/postCard";
import { getPosts } from "@/_actions";
import { deleteById } from "@/_actions";
import { architects_daughter } from "@/styles/fonts";
import classes from './feed.module.css';

// async function getPosts() {
//     try {
//         const res = await fetch("http://localhost:3000/api/post",
//         {
//             cache: 'no-store'
//         }
//         );
//         if (!res.ok) {
//             throw new Error("Error. No posts found.");
//         }
//         const postRes = res.json();
//         // console.log(postRes)
//         return postRes;
//     } catch (error) {
//         console.log(error);
//     }
// }
// const architects_daughter = Architects_Daughter({
//   subsets: ["latin"],
//   display: "swap",
//   weight: "400",
//   // variable: "--font-architects-daughter",
// });

async function Feed() {  
   const currentDate = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const capitalize = (word) => {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
  };

  const phoneFormat = (input) => {
  if (!input || isNaN(input) || input === 'undefined') return null;
  // if(!input || isNaN(input)) return `input must be a number was sent ${input}`
  if(typeof(input) !== 'string') input = input.toString()
  if(input.length === 10){
    return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if(input.length < 10) {
    return 'was not supplied enough numbers please pass a 10 digit number'
  } else if(input.length > 10) {
    return 'was supplied too many numbers please pass a 10 digit number'
  }else{
    return 'something went wrong'
  }
}

const formattedDate = (postDate) => {
  var date = new Date(parseInt(postDate.substring(0, 8), 16) * 1000).toLocaleDateString('en-us',
  {
    day: 'numeric',
    month: 'long',
    year:'numeric'
  }
  );
  return date;
}
var postsArr = [];
const allPosts = await getPosts();
// console.log("allPosts:: ",allPosts)
  try {
      for (var i = 0; i < 10; i++){
          var title = capitalize(allPosts[i].title.toString());
          var content = allPosts[i].content;
          var id = allPosts[i]._id;
          var postDate = formattedDate(id);
          var img = allPosts[i].cloudinary_id;
          var phone = phoneFormat(allPosts[i].phoneNumber);
          var address = allPosts[i].address;
          var addresLink = allPosts[i].addressLink;
          var category = allPosts[i].category;
          var postObj = {
              title : title,
              content: content,
              postId : id,
              date: postDate,
              image: img,
              phoneNumber: phone,
              address : address,
              addressLink: addresLink,
              category:category
          }
          postsArr.push(postObj);
      }
  } catch (error) {
        console.log("posts error:: ",error);
  }
  
  return (
    <section className='container mx-auto px-24'>
      <div>
        <p className={classes.date}   >{ currentDate}</p>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* {" "}
        <div key={id}>
          {" "}
          <PostCard
            title={post.title}
            content={post.content}
            postId={post.postId}
          />
          {" "}
        </div> */}
          {/* <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="bg-white py-24 sm:py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
         <div className="flex flex-col justify-between mx-auto mt-10 max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* <article className="flex max-w-xl flex-col items-start justify-between"> */}
            {postsArr.map((post) => {
                return (
                <>
                 {/* <div key={id}> */}
                 {/* <div className="flex items-center gap-x-4 text-xs">
                  
                 </div> */}
                 <div key={post.id} className="items-center my-5 group relative">  
                 <div className="border-b-2">
                  <time dateTime="2020-03-16" className="text-gray-500">
                      {post.date}
                   </time> 
                  </div> 
                  <PostCard
                    title={post.title}
                    content={post.content}
                    postId={post.postId}
                    image={post.image}
                    phoneNumber={post?.phoneNumber}
                    addressLink={post.addressLink}
                    address={post.address}
                    category={post.category}
                  />
                </div>
                </>
              );
            })}
          {/* </article> */}
          {/* </div> */}
        </div>
      </div>
      </div>
      </section>
      // </div>
      //   </div>
        
    );
















}

export default Feed