import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/movieContext";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites } = useContext(MoviesContext);

  if (favorites.length === 0) {
    return <h1>No favorite movies added yet!</h1>;}

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={favorites}
      action={(movie) => (
        <><RemoveFromFavorites movie={movie}/>
          <WriteReview movie={movie}/></>
      )}/>);};

export default FavoriteMoviesPage;
