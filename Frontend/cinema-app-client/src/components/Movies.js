import API from '../API/axiosConfig';
import{useState,useEffect} from 'react';
import MovieCard from './MovieCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//tegelikult hakkame datat cinema-hallsist või ei ? teha kõik movied ja siis kui
//movie-id vastab cinema-hall movie-id-ga siis genereerib sinna cinema halli nime
//et nagu need filmid on nendes cinema hallides. movied teeme cardist. ja kui
//peale vajutada siis viib sinna nii, et backdrop vastab filmile. Traileri link ka
//üles?
const Movies = () => {
  
        
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
      
          // Iterate over cinema halls
          cinemaHalls.forEach(cinemaHall => {
            // console.log(`data from cinema halls ${cinemaHall}`)
            // Iterate over showtimes of each cinema hall
            cinemaHall.showTimes.forEach(showtime => {
              // Find the movie associated with the showtime
              
              //const movie = movies.find(movie => movie._id?.$oid === showtime.movieId?.$oid);
              const movie = movies.find(movie => movie.movieId?.$oid === showtime.movieId?.$oid);
              if (movie?.movieId?.$oid !== undefined) {
                // The $oid property is not undefined
                
                console.log('hei')
                
              } else {
                // The $oid property is undefined
                // Handle the case where the property is undefined...
                console.log('ohno')
              }
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
      
          return moviesWithShowtimes;
        };

       
  
     return (<Container>
      {generateMoviesFromShowtimes().map(({ movie, cinemaHall, showtime }) => (
        <MovieCard key={showtime._id?.$oid} movie={movie} cinemaHall={cinemaHall} showtime={showtime} />
      ))}
    </Container>
  );
};
      
 




export default Movies;

// {/* <Container>
//             <Row>
//       {movies && movies.map(movie => (
//           <Col xl={12}>
//             {/* needs a key! but objectId.. */}
//               <MovieCard movie={movie} />
//           </Col>
//       ))}
//       </Row>
//         </Container>
//     ); */}