import Stack from 'react-bootstrap/Stack';
import API from '../API/axiosConfig';
import{useState,useEffect} from 'react';
import MovieCard from './MovieCard';


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

        const moviesList = movies?.map((movie) => (
            <Stack gap={3}>
            <div className='p-2'>{movie.title}</div>
            </Stack>
        ));
  
  
    return (
    <div>
        <MovieCard/>
      </div>
    
  );
}

export default Movies;