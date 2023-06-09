// import { useEffect } from "react";
// import "./App.css";

// const apiKey = "7efe9897f73c8f4672c77477a4dd8140";
// const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

// import { useState, useEffect } from "react";
// import axios from "axios";

//const apiKey = "7efe9897f73c8f4672c77477a4dd8140";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchMovies = async (query) => {
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/search/movie`,
//         {
//           params: {
//             api_key: apiKey,
//             query: query,
//           },
//         }
//       );
//       setMovies(response.data.results);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchMovies(searchTerm);
//   };

//   useEffect(() => {
//     if (searchTerm !== "") {
//       fetchMovies(searchTerm);
//     } else {
//       const fetchAllMovies = async () => {
//         try {
//           const response = await axios.get(
//             `https://api.themoviedb.org/3/discover/movie`,
//             {
//               params: {
//                 api_key: apiKey,
//               },
//             }
//           );
//           setMovies(response.data.results);
//         } catch (error) {
//           console.error("Error fetching movies:", error);
//         }
//       };

//       fetchAllMovies();
//     }
//   }, [searchTerm]);

//   return (
//     <div className="App">
//       <div className="container">
//         <h1>Movie Search</h1>
//         <form onSubmit={handleSearch}>
//           <div className="input-group mb-3">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="form-control"
//               placeholder="Search movies..."
//             />
//             <button type="submit" className="btn btn-primary">
//               Search
//             </button>
//           </div>
//         </form>
//         <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
//           {movies.length > 0 ? (
//             movies.map((movie) => (
//               <div key={movie.id} className="col">
//                 <div className="card h-100">
//                   <img
//                     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                     className="card-img-top"
//                     alt={movie.title}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{movie.title}</h5>
//                     <p className="card-text">{movie.release_date}</p>
//                     <p className="card-text">{movie.overview}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col">
//               <p>No movies found.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

//import React from "react";

import React, { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "7efe9897f73c8f4672c77477a4dd8140";

const MovieListByGenre = () => {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              api_key: apiKey,
              language: "en",
            },
          }
        );
        const genresData = response.data.genres;
        setGenres(genresData);
        console.log("Fetched genres:", genresData);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: apiKey,
            with_genres: genreId,
          },
        }
      );
      const movies = response.data.results;
      console.log(`Fetched movies for genreId=${genreId}:`, movies);

      return movies;
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      return [];
    }
  };

  const fetchMoviesByAllGenres = async () => {
    try {
      const moviesByGenreData = {};
      for (const genre of genres) {
        const movies = await fetchMoviesByGenre(genre.id);
        moviesByGenreData[genre.id] = movies;
      }
      setMoviesByGenre(moviesByGenreData);
      console.log("Movies by genre:", moviesByGenreData);
    } catch (error) {
      console.error("Error fetching movies by genres:", error);
    }
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchMoviesByAllGenres();
    }
  }, [genres]);

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: apiKey,
            query: query,
          },
        }
      );
      const movies = response.data.results;
      setMovies(movies);
      console.log(`Fetched movies for query=${query}:`, movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    const fetchMovies = async (query) => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: apiKey,
              query: query,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (searchTerm !== "") {
      fetchMovies(searchTerm);
    } else {
      fetchMoviesByAllGenres();
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>

      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            placeholder="Search movies..."
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      {searchTerm !== "" ? (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="col">
                <div className="card h-100">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.release_date}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col">
              <p>No movies found.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {genres.map((genre) => (
            <div key={genre.id} className="mb-5">
              <h2>{genre.name}</h2>
              <div className="card-deck">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                  {moviesByGenre[genre.id] &&
                    moviesByGenre[genre.id].map((movie) => (
                      <div key={movie.id} className="col">
                        <div className="card h-100">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p className="card-text">{movie.overview}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieListByGenre;
