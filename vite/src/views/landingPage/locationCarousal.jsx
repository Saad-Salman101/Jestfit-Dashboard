import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import LocationCard from "components/fieldCard";

const Carousel = ({ children, itemsToShow = 5 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locations, setLocation] = useState([]);

  const totalItems = React.Children.count(children);
  const maxIndex = Math.ceil(totalItems / itemsToShow) - 1;

  const handleSwipe = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    } else if (direction === "right") {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });
  const fetchData = async () => {
    const fields = await axios.get("/location", {
      params: {
        limit: 10,
      },
    });
    setLocation(fields.data.result.results);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
      {...swipeHandlers}
    >
      {/* Navigation Buttons */}
      <IconButton
        onClick={() => handleSwipe("right")}
        disabled={currentIndex === 0}
        sx={{
          position: "absolute",
          top: "50%",
          left: 8,
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:disabled": { visibility: "hidden" },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={() => handleSwipe("left")}
        disabled={currentIndex === maxIndex}
        sx={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:disabled": { visibility: "hidden" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Cards Wrapper */}
      <Box
        sx={{
          display: "flex",
          transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
          transition: "transform 0.5s ease-in-out",
          width: `${(totalItems / itemsToShow) * 100}%`,
        }}
      >
        {locations?.map((child, index) => (
          <LocationCard key={index} pitch={child} />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
