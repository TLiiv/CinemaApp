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
  
    const [movies,setMovies] = useState();
        
        const getMovies = async () => { 
            try {
              const response = await API.get("/api/v1/movies");
              console.log(response.data);
              setMovies(response.data); // Set movies to response.data
            } catch (error) {
              console.log(error);
            }
          }
        
        
        useEffect(()=>{
          getMovies();
        },[])

  
  
     return (
      <Container>
            <Row>
      {movies && movies.map(movie => (
          <Col xl={12}>
            {/* needs a key! but objectId.. */}
              <MovieCard movie={movie} />
          </Col>
      ))}
      </Row>
        </Container>
    );

  
}



export default Movies;