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
            console.log(response.data);
            setCinemaHalls(response.data);

        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getCinemaHalls();
    },[])


// const hallNames = cinemaHalls.map(hall => hall.hallName);
// console.log(hallNames); // checkin how my backend works

// const firstHallName = hallNames[0];
// console.log(firstHallName); 




   

{/* need to check how to use mongo ObjectId as a key */}
    //Real code starts from here ObjectId.toString()?
 
    //   ));
      
    const cinemaHall = cinemaHalls.map(hall => {
        
        return (
            <div key={hall.id}>
                <h2>{hall.hallName}</h2>
                <div className="CinemaHallSeats">
                    {hall.seats.map((seat, index) => (
                        <>
                            <CinemaSeat seatName={seat} />
                        </>
                    ))}
                </div>
            </div>
        );
    });
   


    return (
            <>
            {/* <CinemaSeat  /> */}
            {cinemaHall}
            </>
           
    );
}

export default CinemaHalls;