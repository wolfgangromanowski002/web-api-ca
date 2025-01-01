import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: credits, isLoading, isError, error } = useQuery({
queryKey: ["credit Details", { id: movie.id }],
queryFn: () => getMovieCredits(movie.id),});

  const cast = credits?.cast || [];
  const crew = credits?.crew || [];
  
  return (
<>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres?.length > 0 ? (
        movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))) : null}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Typography variant="h5" component="h3">
        Cast
      </Typography>
      <Paper component="ul" sx={{ ...root }}>
        {cast.map((actor) => (
           <li key={actor.id}>
           <Link to={`/person/${actor.id}`} style={{ textDecoration: "none" }}>     
           <Chip
          label={`${actor.name} as ${actor.character}`}
          sx={{ ...chip }}
          clickable />
          </Link>
        </li>
      ))}
    </Paper>

      <Typography variant="h5" component="h3">
        Crew
      </Typography>
      <Paper component="ul" sx={{ ...root }}>
        {crew.map((member) => (
            <li key={member.id}>
            <Link to={`/person/${member.id}`} style={{ textDecoration: "none" }}>
              <Chip
                label={`${member.name} - ${member.job}`}
                sx={{ ...chip }}
                clickable/>
                </Link>
                </li>))}
          </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
