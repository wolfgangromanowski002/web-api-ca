import React, { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/AuthContext";
import { getActors } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const ActorsPage = () => {
const { auth } = useContext(AuthContext);
const { data, error, isLoading, isError } = useQuery(

    ["actors", auth.token],
    () => getActors(auth.token),
    { enabled: !!auth.token });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  const actors = data.data || [];

  return (
    <div>
      <h2>Actors from Mongo</h2>
      <ul>
        {actors.map((actor) => (
          <li key={actor._id}>
            {actor.name} (ID: {actor._id})
          </li>))}
      </ul>
    </div>
    );};

export default ActorsPage;
