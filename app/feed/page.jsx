import PostCard from "../components/postCard";
import { getPosts } from "@/_actions";
import { Suspense } from "react";
import Pagination from '../components/pagination';
import Search from '../components/search';
import Hero from "../components/hero";
import FeaturedPlaces from "../featured_places/page";
const currentDate = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
});
const capitalize = (words) => {
  words.split(" ");
  for (let i = 0; i < words.length; i++){
    (words[i][0].toUpperCase() + words[i].substring(1).toLowerCase());
  };
  return words;
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
async function fetchPosts({searchParams}) {
  const page = searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const limit = searchParams.limit === 'string' ? Number(searchParams.limit) : 10;
  const allPosts = await getPosts({page, limit,query:searchParams.search});
    if (!allPosts || allPosts.length === 0) {
    throw new Error("Posts not found");
  }
  return allPosts;

}

export async function generateMetadata() {
  const allPosts = await getPosts();
  if (!allPosts) {
    return;
  }
  var titleArray = [];
  allPosts.forEach(post => {
    titleArray.push(post.title);
  });

  var titles;
  for (var i = 0; i < 10; i++){
    titles = titleArray.join('-');
  };

  return (
    {
      title: titles,
      description:"Best food places and fun to try in Santa Monica and around the Santa Monica area. Best Santa Monica places to eat good food and snacks. Best Bars in Santa Monica to try.",
      openGraph: {
      title: titles,
      description:"Best food places and fun to try in Santa Monica and around the Santa Monica area. Best Santa Monica places to eat good food and snacks. Best Bars in Santa Monica to try.",
      type: "website",
      locale: "en_US",
      url: "https://norahbird.com",
      siteName: "Norah Bird"
      },
      alternates: {
        canonical:`/feed`
      }
    }  
  )
}

async function Feed( searchParams ) {
  const { page ,limit, search} = {searchParams};
  try {
  
    const data = await fetchPosts({ searchParams });
    var resultsTotal = data.length;
  
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
    <div className="bg-orange-100">
      <Hero/>
      <div className="relative container mx-auto px-14 pb-10 justify-center ">
        <section>
          {/* <div class="flex flex-col justify-center items-center max-w-sm mx-auto my-8"> */}

          <div className=" bg-white md:-mt-10 xs:mt-3 shadow-xl rounded-lg overflow-hidden z-8">
            <div className=" mx-8 overflow-hidden items-center justify-center">
              <div className="text-gray-800 mt-8 font-semibold text-2xl">
                <h1>Discover Local Spots Around Santa Monica.</h1>
              </div>
              {/* <p  >{currentDate}</p> */}
              <div className="text-gray-600 mt-3 text-xs md:text-base">
                <p>
                 It's fall here in Santa Monica, there are tons of cafes and local bakeries
                  that are great to enjoy a nice warm coffee or favorite fall flavors, but when you want something
                  authentic, you always ask the locals. I am here to provide you
                  some of the best spots to enjoy around Santa Monica.Take a
                  tour of my favorite places to eat and have fun. Check back for
                  more spots as I explore new places everyday.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end mr-5">
              <div className="my-3 mx-3">
                <Search className="w-1/3" search={search} />
              </div>
            </div>
            {searchParams.search && (
              <div className="flex mx-8 sm:justify-normal  justify-center">
                <div className="text-gray-800 mt-8 font-semibold text-2xl">
                  <h2 className="hidden md:block">
                    Search Results: {resultsTotal} total items.
                  </h2>
                  <div className="">
                    <Pagination search={search} page={page} />
                  </div>
                </div>
              </div>
            )}
            <div className="bg-white">
              <div className="max-w-5xl px-6 ">
                <div className="flex flex-col justify-between mx-auto mt-8 max-w-2xl grid-cols-1 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {postsArr?.map((post) => {
                    return (
                      <>
                        <div
                          key={post.id}
                          className="items-center group relative"
                        >
                          <div className="border-t-2 border-[#F6AF3B]">
                            <time
                              dateTime="2020-03-16"
                              className="bg-[#F6AF3B] p-1 text-slate-50"
                            >
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
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className=" mx-auto px-14 pb-5">
        {/* <div className="border-t-2 border-[#F6AF3B]"> */}
        <div className="flex-1 mt-8 sm:py-1 py-0  overflow-hidden  rounded-sm border-t-2 border-[#F6AF3B]">
          <p className="p-2 bg-[#F6AF3B] inline text-2xl text-slate-100">
            Check Out Other Spots to Visit
          </p>
        </div>
        <div className="mt-8 ">
          <FeaturedPlaces />
        </div>
      </div>
    </div>
  );
















}

export default Feed