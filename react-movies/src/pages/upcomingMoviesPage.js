import React, { useContext } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getUpcomingMovies } from "../api/tmdb-api";
import { AuthContext } from "../contexts/AuthContext";

const UpcomingMoviesPage = () => {
  const { auth } = useContext(AuthContext);

  const { data, error, isLoading, isError } = useQuery(
    ["upcoming", auth.token],
    () => getUpcomingMovies(auth.token),
    {
      enabled: !!auth.token,
    });

  if (isLoading) return <Spinner />;
  if (isError) {
    return (
      <div>
        <h1>{error.message}</h1>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );}

  const movies = data.data ? data.data.results : data.results;
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
