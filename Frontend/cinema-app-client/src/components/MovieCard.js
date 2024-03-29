import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'; 
import './MovieCard.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../API/axiosConfig';
import Trailer from './Trailer';
import Booking from '../pages/Booking';




const MovieCard = ({ movie, cinemaHall, showtime }) => {
    return (
        <div className="movie-card">
            <img src={movie.poster} className="movie-image" alt={movie.title} />
            <div className="movie-details">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-description">{movie.genres.join(', ')}</p>
                <p className="movie-description">{cinemaHall.hallName}</p>
                <p className="movie-description">Start Time: {showtime.startTime}</p>
                <Button variant="dark" href="/Booking">Info</Button>
            </div>
        </div>
    );
};



export default MovieCard;