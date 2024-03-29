import React, { useState, useEffect } from 'react';
import Movies from '../components/Movies';
import Dropdown from 'react-bootstrap/Dropdown';
import API from '../API/axiosConfig';
import CinemaHalls from '../components/CinemaHalls';

const Home = () => {

    const [sortBy, setSortBy] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genres, setGenres] = useState([]);

    const handleSortBy = (option) => {
        setSortBy(option);

       
    };

    const handleGenreSelect = (genre) => {
        setSelectedGenre(genre);
    };

 

 //probably need to refactor because its in child component already
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const moviesResponse = await API.get("/api/v1/movies");
                const uniqueGenres = Array.from(new Set(moviesResponse.data.flatMap(movie => movie.genres)));
                setGenres(uniqueGenres);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sort By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSortBy("earliest")}>Earliest Start Time</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortBy("latest")}>Latest Start Time</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortBy("hall")}>Hall</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic-genre">
                            Genre
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {genres.map((genre, index) => (
                                <Dropdown.Item key={index} onClick={() => handleGenreSelect(genre)}>
                                    {genre}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Dropdown.Menu>
            </Dropdown>
            <Movies sortBy={sortBy} selectedGenre={selectedGenre} />
        </div>
    );
};

export default Home;
