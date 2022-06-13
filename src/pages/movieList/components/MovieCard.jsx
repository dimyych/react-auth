import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const MovieCard = ({ image, title }) => {
  return (
    <Card sx={{ width: "200px", m: "20px", cursor:'pointer', bgcolor:'rgb(30, 35, 80)', '&:hover':{transform: 'scale(1.1)'}}}>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w185${image}`}
        sx={{ height: "285.2px" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color='white'>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
