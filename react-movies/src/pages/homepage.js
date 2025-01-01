import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => {
  const { data, error, isLoading, isError } = useQuery("discover", getMovies);

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <div>
        <h1>{error.message}</h1>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default HomePage;
