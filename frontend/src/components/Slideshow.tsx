import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/images/slider1.jpg",
    title: "Style Beyond Trends",
    description: `Discover fashion that speaks confidence, creativity, 
      and modern taste—from street style to timeless elegance.`,
  },
  {
    id: 2,
    image: "/images/slider2.jpg",
    title: "Stories That Move You",
    description:
      "Fashion, cars, and travel—where style meets speed and adventure has no borders.",
  },
  {
    id: 3,
    image: "/images/slider3.jpeg",
    title: "Explore Without Limits",
    description:
      "Journeys, cultures, and hidden places—stories that turn destinations into unforgettable experiences.",
  },
];

const SlideShow = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="slideshow">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="overlay">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide}>
        ❮
      </button>
      <button className="arrow right" onClick={nextSlide}>
        ❯
      </button>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
