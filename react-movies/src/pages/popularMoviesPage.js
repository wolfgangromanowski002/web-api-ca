import React, { useContext } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getPopularMovies } from "../api/tmdb-api";
import { AuthContext } from "../contexts/AuthContext";

const PopularMoviesPage = () => {
  const { auth } = useContext(AuthContext);
  const { data, isLoading, isError, error } = useQuery(
    ["popular", auth.token],
    () => getPopularMovies(auth.token),
    {
      enabled: !!auth.token,});

  if (isLoading) return <Spinner/>;
  if (isError) {
    return (
      <div>
        <h1>{error.message}</h1>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );}

  const allMovies = data.data ? data.data.results : data.results;
  const top5Movies = allMovies.slice(0, 5);
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
