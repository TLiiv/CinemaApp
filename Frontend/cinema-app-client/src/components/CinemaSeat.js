import React from 'react';
import './CinemaSeat.css'; 

import {useState} from 'react';


const CinemaSeat = () => {

    const [selectSeat,setSelectSeat] = useState(false);
   

const cinemaSeatClickHandler = (e) => {
        setSelectSeat(!selectSeat);
    };


    return <div className="CinemaSeat">
        <div className={`Seat ${selectSeat ? 'Seat-selected' : ''}`} onClick={cinemaSeatClickHandler}></div>
    </div>
}  

export default CinemaSeat;