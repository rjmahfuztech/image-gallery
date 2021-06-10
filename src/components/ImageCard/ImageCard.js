import React, {useEffect, useState} from "react";
import ImageCardInfo from "../ImageCardInfo/ImageCardInfo";
import SearchImage from "../SearchImage/SearchImage";

const ImageCard = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=20268533-b7beda407a68f98dd0a903a67&q=${
        search ? search : "laptop"
      }&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      });
  }, [search]);

  console.log(images);

  return (
    <div className="container mx-auto">
      <SearchImage searchByText={(text) => setSearch(text)}></SearchImage>

      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center text-yellow-400 mx-auto mt-32">
          Sorry, No Image Found!!
        </h1>
      )}
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="flex justify-center mx-3">
          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {images.map((image) => (
              <ImageCardInfo key={image.id} image={image}></ImageCardInfo>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
