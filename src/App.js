import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "7efe9897f73c8f4672c77477a4dd8140";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      fetchMovies(searchTerm);
    } else {
      const fetchAllMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie`,
            {
              params: {
                api_key: apiKey,
              },
            }
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchAllMovies();
    }
  }, [searchTerm]);

  return (
    <div className="App">
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
      </div>
    </div>
  );
}

export default App;
