import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import './MovieCard.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const MovieCard = ({ movie }) => {


    return (
        <div className="movie-card">
        <img src={movie.poster} className="movie-image" alt={movie.title} />
        <div className="movie-details">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">Description goes here...</p>
                    <Button variant="dark" href="#">Go somewhere</Button>
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