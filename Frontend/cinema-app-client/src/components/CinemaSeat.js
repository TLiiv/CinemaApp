import React from 'react';
import './CinemaSeat.css'; 

import {useState} from 'react';


const CinemaSeat = ({ isBooked }) => {

    const [selectSeat,setSelectSeat] = useState(false);
   

const cinemaSeatClickHandler = (e) => {
        if(!isBooked){
            setSelectSeat(!selectSeat);
        }
    };
    

    return  (<div className={`Seat ${isBooked ? 'Seat-occupied' : ''} ${selectSeat ? 'Seat-selected' : ''}`} onClick={cinemaSeatClickHandler}></div>)
}  

export default CinemaSeat;

