import React, { useContext } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getTrendingMovies } from "../api/tmdb-api";
import { AuthContext } from "../contexts/AuthContext";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TrendingMoviesPage = () => {
  const { auth } = useContext(AuthContext);
  const { data, error, isLoading, isError } = useQuery(
    ["trending", auth.token],
    () => getTrendingMovies(auth.token),
    {   enabled: !!auth.token,
    });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  const movies = data.data ? data.data.results : data.results;
  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}/>);};

export default TrendingMoviesPage;
