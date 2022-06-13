import React from "react";
import Box from "@mui/material/Box";
import MovieCard from "./components/MovieCard";

const MovieList = ({movies}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexGrow: 1,
        margin: "0 auto",
      }}
    >
      {movies.map((movie, i) => {
        return (
          <MovieCard
            key={i}
            image={movie.poster_path}
            title={movie.title}
          />
        );
      })}
    </Box>
  );
};

export default MovieList;
