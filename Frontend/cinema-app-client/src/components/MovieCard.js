import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import testImage from './testimage.jpg'; 
import './MovieCard.css';



const MovieCard =()=> {
  
  
  return (
    <Card style={{ width: '50rem' }} className="movie-card">
    <div className="card-content">
      <Card.Img variant="top" src={testImage} className="movie-image" /> 
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </div>
  </Card>
  );
    
}

export default MovieCard;