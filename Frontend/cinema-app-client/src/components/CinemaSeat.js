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
    // let isBooked=false;

    return  (<div className={`Seat ${isBooked ? 'Seat-occupied' : ''} ${selectSeat ? 'Seat-selected' : ''}`} onClick={cinemaSeatClickHandler}></div>)
}  

export default CinemaSeat;

//<div className="CinemaSeat">
//<div className={`Seat ${selectSeat ? 'Seat-selected' : ''}`} onClick={cinemaSeatClickHandler}></div>
//</div>