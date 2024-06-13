import PostCard from "../components/postCard";
import { getPosts } from "@/_actions";
import classes from './feed.module.css';
import { Suspense } from "react";

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
async function fetchPosts() {
  const allPosts = await getPosts();
    console.log("allposts body:: ", allPosts)

    if (!allPosts || allPosts.length === 0) {
    throw new Error("Posts not found");
  }
  return allPosts;

}

async function Feed() {   
  try {
   const data = await fetchPosts([]);
   console.log("data:: ",data)
    var postsArr = [];
      for (var i = 0; i < 10; i++) {
        var title = capitalize(data[i].title.toString());
        var content = data[i].content;
        var id = data[i]._id;
        var postDate = formattedDate(id); 
        var img = data[i].cloudinary_id;
        var phone = phoneFormat(data[i].phoneNumber);
        var address = data[i].address;
        var addresLink = data[i].addressLink;
        var category = data[i].category;
        var postObj = {
          title: title,
          content: content,
          postId: id,
          date: postDate,
          image: img,
          phoneNumber: phone,
          address: address,
          addressLink: addresLink,
          category: category
        }; 
        postsArr.push(postObj);
     //  return postsArr;
     }
  } catch (error) {
    console.log("posts error:: ", error);
  }

  
  return (
    <section className='container mx-auto px-14'>
      <div>
        <p className={classes.date}   >{ currentDate}</p>
      </div>
      <div className="bg-white">
        <div className="max-w-5xl px-6 lg:px-8">
         <div className="flex flex-col justify-between mx-auto mt-10 max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {postsArr?.map((post) => {
                return (
                <>
                 <div key={post.id} className="items-center my-5 group relative">  
                 <div className="border-b-2">
                  <time dateTime="2020-03-16" className="text-gray-500">
                      {post.date}
                   </time> 
                  </div> 
                  <Suspense fallback={<p>Loading data...</p>}>
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
                  </Suspense>
                                   
                </div>
                </>
              )
            })}
        </div>
      </div>
      </div>
      </section>
    );
















}

export default Feed