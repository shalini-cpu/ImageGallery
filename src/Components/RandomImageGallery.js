// RandomImageGallery.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const RandomImageGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const apiKey = 'lLJ16MEkgvFyBHFA9mpBdYOM0Zbsm2Uv6ijl04C5-Tc';
    const endpoint = 'https://api.unsplash.com/photos/random';
    const params = {
      count: 10, // Number of images to fetch
      client_id: apiKey,
      page: page,
    };

    axios
      .get(endpoint, { params })
      .then((response) => {
        setImages((prevImages) => [...prevImages, ...response.data]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (isAtBottom && !isLoading) {
        setPage((prevPage) => prevPage + 1);
        setIsLoading(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Random Image Gallery</h1>
      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-md-4 mb-4">
            <img
              src={image.urls.regular}
              alt={image.description || 'Random Unsplash Image'}
              className="img-fluid rounded"
            />
          </div>
        ))}
        {isLoading && 
          (
            <center>
          <div className="loader-container ">
          <img src="/loader.gif" alt="Loading..." width="200px" height="200px" className="loader-gif" />
        </div>
        </center>)
}
      </div>
    </div>
  );
};

export default RandomImageGallery;
