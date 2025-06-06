import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useProducts } from "../ProductProvider";
import { useNavigate } from "react-router-dom";

const ImageCarousel = () => {
  const { products } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const slideImageItems = products.filter(
    (item) => item.category === "slideimages"
  );

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slideImageItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    console.log(interval, "interva;");

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slideImageItems.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slideImageItems.length - 1 : prevIndex - 1
    );
  };

  //   console.log(setCurrentIndex((prev) => console.log(prev, "previndex")));
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slideImageItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlesliderDetails = (category, id) => {
    console.log(category, id, "category and id");
    navigate(`/productdetails/${category}/${id}`);
  };

  return (
    <div className="mt-25 xl:ml-3 xl:mr-3 relative xl:h-[280px] lg:h-[200px] md:h-[150px] h-[80px] overflow-hidden shadow-md">
      {/* Single image display */}
      <img
        src={slideImageItems[currentIndex]?.image}
        alt="slide"
        className="w-full xl:h-[250px] object-fill cursor-pointer"
        onClick={() =>
          handlesliderDetails(
            slideImageItems[currentIndex]?.category,
            slideImageItems[currentIndex]?._id
          )
        }
      />

      {/* Navigation arrows */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 xl:flex xl:items-center xl:justify-center w-[60px] h-[100px] cursor-pointer hidden"
        onClick={handlePrev}
      >
        <MdKeyboardArrowLeft size={25} />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 xl:flex xl:items-center xl:justify-center w-[60px] h-[100px] cursor-pointer hidden"
        onClick={handleNext}
      >
        <MdKeyboardArrowRight size={25} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {slideImageItems.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-18 h-1 rounded-md cursor-pointer ${
              idx === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
