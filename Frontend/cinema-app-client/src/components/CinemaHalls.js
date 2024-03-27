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
 
   
      //refactor this if time
    const cinemaHall = cinemaHalls.map((hall,index) => {
        // const hallId = hall._id ? hall._id.toString() : index;
      
        return (
            <div key={hall._id?.$oid || index}>
                {/* "key solution too hacky" */}
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
        );
    });
   


    return (
            <>
            {cinemaHall}
            </>
           
    );
}




export default CinemaHalls;