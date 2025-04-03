const ImageWithFallback = ({ src, alt, fallbackSrc, ...props }) => {
  const handleError = (e) => {
    e.target.src = fallbackSrc; // Set fallback image when the original one fails to load
  };

  return <img src={src} alt={alt} onError={handleError} {...props} />;
};

export default ImageWithFallback;
