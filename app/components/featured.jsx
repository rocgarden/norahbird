export default function Featured() {
    const places = [
        {
        id: 1,
        img_url: "https://a.mktgcdn.com/p/udzwzhmgwMF3oMoBSbz81Twhc5JGqRK7upEYsqNNT6U/1024x550.jpg",
        card_title: "Buca di Beppo Universal Citywalk",
        card_content: "1000 Universal Studios Blvd, Universal City, CA, 91608.",
        directions: "https://maps.app.goo.gl/CPj2VVMt4Y98H5QK7"
        },
        {
        id: 2,
        img_url: "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/universal-studio-tour-explosion-802x535.jpg?imwidth=738",
        card_title: "Universal Studios Hollywood",
        card_content: "1000 Universal Studios Blvd, Universal City, CA, 91608.",
        directions: "https://maps.app.goo.gl/CPj2VVMt4Y98H5QK7"
        },
        {
        id: 1,
        img_url: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1300/544/75/vision-dam/digital/parks-platform/parks-global-assets/disneyland/experience/homepage/Halloween-Pumpkin-2x1.jpg?2024-06-26T18:22:01+00:00",
        card_title: "Disneyland Resort",
        card_content: "1313 Disneyland Dr Anaheim, CA 92802.",
        directions: "https://maps.app.goo.gl/uw1vMMRFmrCRMyVB7"
        },
    ]
return(
<div className="container  mx-auto my-5 transition ease-in-out delay-150 lg:bg-white ">
<div>
  <div className="relative items-center justify-center">
    <div className="lg:flex items-center container mx-auto my-auto">
    {
        places.map((place) =>(
        <div className="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 hover:-translate-y-1 hover:scale-110 hover:opacity-100 duration-300 ...">
         <img src={place.img_url} alt={place.card_title } className="overflow-hidden"/>
        <div className="p-4">
            <h3 className="font-medium text-gray-800 text-lg my-2 uppercase">{ place.card_title}</h3>
            <p className="text-justify text-gray-600">{ place.card_content}</p>
          <div className="mt-5">
            <a href={place.directions} className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600">Google Maps</a>
          </div>
        </div>
      </div>
        ))
    }
    </div>
  </div>
</div>  
</div>
)
}