import { useEffect, useState } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/v1/image/get', {
      method: 'GET',
      credentials: 'include',
      signal: controller.signal,
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success) {
            console.log(data);
            setImages(data.data);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (images.length === 0) {
    return <div className='text-center'>No images</div>;
  }

  return (
    <div>
      <div className='grid grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-5'>
        {images.map((image) => {
          return (
            <div
              className='dark:border-dark-border aspect-[3/2] dark:border'
              key={image}
            >
              <img
                src={`/api/v1/image/get/${image}`}
                alt={image}
                className='h-full w-full object-cover'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
