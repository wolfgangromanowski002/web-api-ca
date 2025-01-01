import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getMovieRecommendations } from "../api/tmdb-api";
import MovieIcon from "@mui/icons-material/Movie";

const MovieRecommendationsPage = () => {
  const { id } = useParams();
  const { data: recommendations, error, isLoading } = useQuery(
    ["recommendations", { id }],
    () => getMovieRecommendations({ queryKey: ["recommendations", { id }] }),
    { enabled: !!id }
  );

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (!recommendations || recommendations.length === 0) {
    return <p>No recommendations available for this movie.</p>;
  }
  const topRecommendations = recommendations.slice(0, 3);

  return (
    <PageTemplate
      title="Recommended Movies"
      movies={topRecommendations}
      action={(movie) => (
        <MovieIcon color="primary" fontSize="large" aria-label="recommended movie" />
      )}
    />
  );
};

export default MovieRecommendationsPage;
