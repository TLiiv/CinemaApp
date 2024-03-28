import API from '../API/axiosConfig';
import{useState,useEffect} from 'react';
import MovieCard from './MovieCard';
import Container from 'react-bootstrap/Container';


import { v4 as uuidv4 } from 'uuid';

const Movies = () => {
   
    // const [movies, setMovies] = useState([]);
    // const [cinemaHalls, setCinemaHalls] = useState([]);
    const [movies, setMovies] = useState([]);
    const [cinemaHalls, setCinemaHalls] = useState([]);
   
    
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch backend data
          const moviesResponse = await API.get("/api/v1/movies");
          setMovies(moviesResponse.data);

          const cinemaHallsResponse = await API.get("/api/v1/cinema-halls");
          setCinemaHalls(cinemaHallsResponse.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);
   
  
//click events for movie filtering in Home Component
// const generateMoviesByHall = () => {
//   const filteredMovies = movies.filter(movie => {
//       const hallNames = movie.cinemaHalls.map(cinemaHall => cinemaHall.hallName);
//       return hallNames.includes(selectedHall);
//   });

//   return filteredMovies;
// };

// const filteredMovies = generateMoviesByHall();

        const generateMoviesFromShowtimes = () => { //VAJALIK! SELLE panin nimeks asemel 2 tükki
          const moviesWithShowtimes = [];
      
          // Iterate over cinema halls
          cinemaHalls.forEach(cinemaHall => {
            // console.log(`data from cinema halls ${cinemaHall}`)
            // Iterate over showtimes of each cinema hall
            cinemaHall.showTimes.forEach(showtime => {
              // Find the movie associated with the showtime

              const movie = movies.find(movie => movie.movieId === showtime.movieId);
              if (movie) {
                // Add movie to the list along with cinema hall and showtime details
                moviesWithShowtimes.push({
                  movie,
                  cinemaHall,
                  showtime
                });
              }
            });
          });
          moviesWithShowtimes.sort((a, b) => {
            // Extract start times from strings and convert to Date objects
            const startTimeA = new Date(`1970-01-01T${a.showtime.startTime}`);
            const startTimeB = new Date(`1970-01-01T${b.showtime.startTime}`);
            // Compare start times
            return startTimeA - startTimeB;
          });
        
      
          return moviesWithShowtimes.map(item => ({
            ...item,
            showtime: {
              ...item.showtime,
              startTime: new Date(`1970-01-01T${item.showtime.startTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          }));
        };

      


      //   return (
      //     <Container>
      //     {filteredMovies.map(({ movie, cinemaHall, showtime }) => (
      //         <MovieCard key={uuidv4()} movie={movie} cinemaHall={cinemaHall} showtime={showtime} />
      //     ))}
      // </Container>
      //   ) 
     return (<Container> 
      {generateMoviesFromShowtimes().map(({ movie, cinemaHall, showtime }) => (
        <MovieCard key={uuidv4()} movie={movie} cinemaHall={cinemaHall} showtime={showtime} />
      ))}
    </Container>
  );
};

 

export default Movies;

