import React from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const PopularMoviesPage = () => {
    const { data, isLoading } = useQuery("popular", getPopularMovies);
    if (isLoading) return <Spinner />;
    const top5Movies = data.results.slice(0, 5);
    const shuffledMovies = top5Movies.sort(() => Math.random() - 0.5);
  
    return (
      <PageTemplate
        title="Popular Movies"
        movies={shuffledMovies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
    );
  };
  
  export default PopularMoviesPage;