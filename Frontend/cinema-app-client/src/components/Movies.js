import API from '../API/axiosConfig';
import{useState,useEffect} from 'react';
import MovieCard from './MovieCard';
import Container from 'react-bootstrap/Container';


import { v4 as uuidv4 } from 'uuid';

const Movies = ({sortBy}) => {
   
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
   
  



const generateMoviesFromShowtimes = () => {
  const moviesWithShowtimes = [];

  cinemaHalls.forEach(cinemaHall => {
    cinemaHall.showTimes.forEach(showtime => {
      const movie = movies.find(movie => movie.movieId === showtime.movieId);
      if (movie) {
        moviesWithShowtimes.push({
          movie,
          cinemaHall,
          showtime
        });
      }
    });
  });



  // Apply sorting based on sortBy value
  switch (sortBy) {
    case "earliest":
      moviesWithShowtimes.sort((a, b) => {
        const startTimeA = new Date(`1970-01-01T${a.showtime.startTime}`);
        const startTimeB = new Date(`1970-01-01T${b.showtime.startTime}`);
        return startTimeA - startTimeB;
      });
      break;
    case "latest":
      moviesWithShowtimes.sort((a, b) => {
        const startTimeA = new Date(`1970-01-01T${a.showtime.startTime}`);
        const startTimeB = new Date(`1970-01-01T${b.showtime.startTime}`);
        return startTimeB - startTimeA; // Descending order
      });
      break;
    case "hall":
      moviesWithShowtimes.sort((a, b) => {
        
        return a.cinemaHall.hallName.localeCompare(b.cinemaHall.hallName);
      });
      break;
    default:
      // Handle default sorting or no sorting if needed
      break;
  }
//

        // const generateMoviesFromShowtimes = () => { töötav
        //   const moviesWithShowtimes = [];
      
        //   // Iterate over cinema halls
        //   cinemaHalls.forEach(cinemaHall => {
        //     // console.log(`data from cinema halls ${cinemaHall}`)
        //     // Iterate over showtimes of each cinema hall
        //     cinemaHall.showTimes.forEach(showtime => {
        //       // Find the movie associated with the showtime

        //       const movie = movies.find(movie => movie.movieId === showtime.movieId);
        //       if (movie) {
        //         // Add movie to the list along with cinema hall and showtime details
        //         moviesWithShowtimes.push({
        //           movie,
        //           cinemaHall,
        //           showtime
        //         });
        //       }
        //     });
        //   });
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
        <MovieCard 
        key={uuidv4()} 
        movie={movie} 
        cinemaHall={cinemaHall} 
        showtime={showtime} 
        cinemaHalls={cinemaHalls}
        />
      ))}
    </Container>
  );
};

 

export default Movies;

