import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';

import './MovieCard.css';
import API from '../API/axiosConfig';
import Trailer from './Trailer';

import { useNavigate } from 'react-router-dom';


const MovieCard = ({ movie, cinemaHall, showtime }) => {

   const navigate = useNavigate();
//    console.log(`is this the place?${cinemaHall.price}`);

    return (
        <div className="movie-card">
            <img src={movie.poster} className="movie-image" alt={movie.title} />
            <div className="movie-details">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-description">{movie.genres.join(', ')}</p>
                <p className="movie-description">{cinemaHall.hallName}</p>
                <p className="movie-description">Start Time: {showtime.startTime}</p>
                <Button variant="dark" onClick={() => navigate('/booking', { state: { cinemaHall } })}>Book Tickets</Button>
            </div>
        </div>
    );
};



export default MovieCard;