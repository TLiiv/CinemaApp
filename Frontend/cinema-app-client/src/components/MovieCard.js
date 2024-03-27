import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'; 
import './MovieCard.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../API/axiosConfig';




const MovieCard = ({ movie }) => {
    const [showtimes, setShowtimes] = useState([]);

    //Change it when i'm ready to structore the website same thing in CinemaHalls if filter is not needed here delete til stop
    const [cinemaHalls,setCinemaHalls] = useState([]);

    const getCinemaHalls = async () => {
        try{
            const response = await API.get("/api/v1/cinema-halls");
            //console.log(response.data);
            setCinemaHalls(response.data);

        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getCinemaHalls();
    },[])

    useEffect(() => {
        // Filter showtimes based on movieId
        const filteredShowtimes = cinemaHalls.reduce((acc, hall) => {
            const matchingShowtimes = hall.showTimes.filter(time => time.movieId?.$oid === movie._id?.$oid);
            return [...acc, ...matchingShowtimes];
        }, []);
        setShowtimes(filteredShowtimes);
    }, [movie]);

    //stop

    return (
        <div className="movie-card">
        <img src={movie.poster} className="movie-image" alt={movie.title} />
        <div className="movie-details">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">Description goes here...</p>
                    <Button variant="dark" href="#">Buy Tickets</Button>
        </div>
    </div>
    );
}


//<Container>
        //     <Row>
        //         <Col>
        //             <Card style={{ width: '18rem' }} className="movie-card">
        //                 <div className="card-content">
        //                     <Card.Img variant="left" src={movie.poster} className="movie-image" />
        //                     <Card.Body className="card-body">
        //                         <Card.Title>{movie.title}</Card.Title>
        //                         <Card.Text>
        //                             Algusaeg
        //                         </Card.Text>
        //                         <Button variant="primary">Go somewhere</Button>
        //                     </Card.Body>
        //                 </div>
        //             </Card>
        //         </Col>
        //     </Row> with bootrspt card
        // </Container>

export default MovieCard;