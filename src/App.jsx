import { useState, useEffect } from "react";

const App = () => {
  const images = [
    {
      imageurl: "https://picsum.photos/id/200/600/400",
      description: "lorem 1",
    },
    {
      imageurl: "https://picsum.photos/id/201/600/400",
      description: "lorem 2",
    },
    {
      imageurl: "https://picsum.photos/id/202/600/400",
      description: "lorem 3",
    },
    {
      imageurl: "https://picsum.photos/id/203/600/400",
      description: "lorem 4",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

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
  };

  useEffect(() => {
    let interval;

    if (autoplay) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [autoplay, images]);

  const handleKeyDown = (event) => {
    if (event.code === "ArrowLeft") {
      handlePrevClick();
    } else if (event.code === "ArrowRight") {
      handleNextClick();
    } else if (event.code === "Space") {
      handleAutoplayToggle();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center relative">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-100 bg-blue-500 text-white px-2 py-1 rounded w-20"
          onClick={handlePrevClick}
        >
          Previous
        </button>
        <img
          src={images[currentImageIndex].imageurl}
          alt={images[currentImageIndex].description}
          className="mb-4"
          style={{ width: "600px", height: "400px" }}
        />
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-100 bg-blue-500 text-white px-2 py-1 rounded w-20"
          onClick={handleNextClick}
        >
          Next
        </button>
        <div className="absolute top-5 w-full bg-gray-800 bg-opacity-50 p-4 text-white">
          <p>{images[currentImageIndex].description}</p>
        </div>
        <div className="flex items-center justify-center  space-x-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full hover:bg-blue-300 ${
                index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => handleBulletClick(index)}
            ></button>
          ))}
        </div>
        <div className="mt-4">
          <button
            className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-300"
            onClick={handleAutoplayToggle}
          >
            {autoplay ? "Stop Autoplay" : "Start Autoplay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
