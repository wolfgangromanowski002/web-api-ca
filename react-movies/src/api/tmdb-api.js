export const getMovies = async (token) => {
  const response = await fetch("/api/movies/tmdb/discover", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, },});
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Failed to fetch discover movies.");}
  return response.json();};
  
  export const getMovie = (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getUpcomingMovies = async (token) => {
    const response = await fetch("/api/movies/tmdb/upcoming", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Failed to fetch upcoming movies.");
    }
    return response.json();
  };
  
  export const getPopularMovies = async (token) => {
      const response = await fetch("/api/movies/tmdb/popular", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
               },
            });
            
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Failed to fetch popular movies.");
    }
    return response.json();
  };

  export const getMovieRecommendations = ({ queryKey }) => {
    const [, { id }] = queryKey;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.status_message || "Failed to fetch recommendations.");
          });
        }
        return response.json();
      })
      .then((json) => json.results)
      .catch((error) => {
        throw error;
      });
  };


  export const getMovieCredits = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.status_message || "Failed to fetch credits.");
          });
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };
  

  export const registerUser = async (username, password) => {
    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg || 'Registration failed.');
    }
    return data;
};

export const loginUser = async (username, password) => {
  const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
      throw new Error(data.msg || 'Login failed.');
  }
  return data;
};

export const searchMovies = async (query, token) => {
  const response = await fetch(`/api/movies/tmdb/search?query=${encodeURIComponent(query)}`, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    Authorization: token,
      },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Failed to search movies.");
  }
  return response.json();
};

export const getTopRatedMovies = async (token) => {
  const response = await fetch("/api/movies/tmdb/top_rated", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.msg || "Failed to fetch top-rated movies.");
  }
  return response.json();
};

export const getTrendingMovies = async (token) => {
  const response = await fetch("/api/movies/tmdb/trending", {
    method: "GET",
    headers: {
          "Content-Type": "application/json",
          Authorization: token,},});
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Failed to fetch trending movies.");}
    return response.json(); 
};
