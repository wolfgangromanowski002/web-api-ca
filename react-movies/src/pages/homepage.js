import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const { data, error, isLoading, isError } = useQuery(
    ["discover", auth.token],
    () => getMovies(auth.token),
    { enabled: !!auth.token, });
  if (isLoading) return <Spinner />;
  if (isError) {
    return (
      <div>
        <h1>{error.message}</h1>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div> );}

const movies = data.data ? data.data.results : data.results;
  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}/>
    );};

export default HomePage;