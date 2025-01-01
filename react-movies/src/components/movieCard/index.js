import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/movieContext";
import IconButton from "@mui/material/IconButton";
import RecommendIcon from "@mui/icons-material/Recommend";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);

  const navigate = useNavigate();

  const navigateToRecommendations = (movieId) => {
    navigate(`/movies/${movieId}/recommended`);
  };

  const isFavorite = favorites.some((m) => m.id === movie.id);

  return (
    <Card>
      <CardHeader
        avatar={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isFavorite ? (
              <Avatar sx={{ backgroundColor: "red" }}>
                <FavoriteIcon />
              </Avatar>
            ) : null}
            <Tooltip title="View Recommendations">
              <IconButton
                aria-label="view recommendations"
                onClick={() => navigateToRecommendations(movie.id)}
              >
                <RecommendIcon sx={{ color: "blue" }} />
              </IconButton>
            </Tooltip>
          </div>
        }
        title={
          <Typography variant="h5" component="p" noWrap>
            {movie.title}
          </Typography>}/>
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img}
        alt={`${movie.title} poster`}/>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" /> {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );}