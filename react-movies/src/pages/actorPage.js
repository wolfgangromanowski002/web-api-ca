import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const getPersonDetails = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  );
  return response.json();};

const ActorPage = () => {
  const { id } = useParams();
  const { data: person, isLoading } = useQuery(["person", id], () =>
    getPersonDetails(id));
  if (isLoading) {return <h1>loading</h1>;}
  return (
    <div>
      <h1>{person.name}</h1>
      <p>Biography: {person.biography}</p>
      <p>Birthday: {person.birthday}</p>
      {person.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          alt={person.name}
          style={{ width: "300px" }}/>
      )}
    </div>
  );};

export default ActorPage;
