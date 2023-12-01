import { useState, useRef } from "react";

const App = () => {
  const images = [
    {
      imageurl: "https://picsum.photos/seed/picsum/200/300",
      description: "lorem 1",
    },
    {
      imageurl: "https://picsum.photos/seed/picsum/200/300",
      description: "lorem 2",
    },
    {
      imageurl: "https://picsum.photos/seed/picsum/200/300",
      description: "lorem 3",
    },
    {
      imageurl: "https://picsum.photos/seed/picsum/200/300",
      description: "lorem 4",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const intervalRef = useRef(null);

  const handleBulletClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleAutoplayToggle = () => {
    setAutoplay((prevAutoplay) => !prevAutoplay);
    if (!autoplay) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="container">
      <img
        src={images[currentImageIndex].imageurl}
        alt={images[currentImageIndex].description}
        style={{ width: "600px", height: "400px" }}
      />
      <p>{images[currentImageIndex].description}</p>
      <div className="bullets">
        {images.map((image, index) => (
          <button
            key={index}
            className={index === currentImageIndex ? "active" : ""}
            onClick={() => handleBulletClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={handlePrevClick}>Previous</button>
      <button onClick={handleNextClick}>Next</button>
      <button onClick={handleAutoplayToggle}>
        {autoplay ? "Stop Autoplay" : "Start Autoplay"}
      </button>
    </div>
  );
};

export default App;
