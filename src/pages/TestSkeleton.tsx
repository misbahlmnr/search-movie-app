import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LazyLoadImageTesting = () => {
  const [photo, setPhoto] = useState([]);

  const fethData = () =>
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((res) => console.log(setPhoto(res)));

  useEffect(() => {
    fethData();
  }, []);

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        photo.map((item: any) => (
          <LazyLoadImage
            key={item.id}
            src={item.url}
            alt=""
            height="500px"
            width="300px"
            loading="lazy"
          />
        ))
      }
    </div>
  );
};

export default LazyLoadImageTesting;
