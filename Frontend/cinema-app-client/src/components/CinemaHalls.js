import React from 'react';

import {useState,useEffect} from 'react';
import CinemaSeat from './CinemaSeat';
import API from '../API/axiosConfig';
import './CinemaHalls.css';



const CinemaHalls = () => {

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
 
    return (
        <>
            {cinemaHalls.map((hall) => (
                <div key={hall.hallId}>
                    <h2>{hall.hallName}</h2>
                    {hall.showTimes.map((showTime, index) => (
                        <div key={index}>
                            <h3>Start Time: {showTime.startTime}</h3>
                            <div className="CinemaHallSeats">
                                {hall.seats.map(seat => (
                                    <CinemaSeat
                                        key={seat}
                                        seatName={seat}
                                        isBooked={showTime.bookedSeats.includes(seat)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}




export default CinemaHalls;