import { useEffect, useState } from 'react';

import apiGateway from '../utils/apiGateway';
import Image from './Image';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(-1);

  const closeImageModal = () => {
    setIndex(-1);
  };

  const nextImage = () => {
    if (index + 1 < images.length) {
      setIndex(index + 1);
    }
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this image?'
    );
    if (!confirm) {
      return;
    }
    apiGateway(`/api/v1/image/delete/${images[index]}`, 'DELETE', undefined, undefined)
      .then((data) => {
        if (data.success) {
          setImages(images.filter((image) => image !== images[index]));
          setIndex(Math.min(index, images.length - 2));
        }
      });
  };

  const prevImage = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    apiGateway('/api/v1/image/get', 'GET', undefined, controller)
      .then((data) => {
        if (data.success) {
          setImages(data.data);
        }

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
      {index !== -1 && (
        <Image
          id={images[index]}
          close={closeImageModal}
          next={nextImage}
          prev={prevImage}
          handleDelete={handleDelete}
        />
      )}
      <div className='grid grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-5'>
        {images.map((image, index) => {
          return (
            <div
              className='dark:border-dark-border aspect-[3/2] hover:cursor-pointer dark:border'
              key={image}
              onClick={() => {
                setIndex(index);
              }}
            >
              <img
                src={`/api/v1/image/get/blob/${image}`}
                alt={image}
                loading='lazy'
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
