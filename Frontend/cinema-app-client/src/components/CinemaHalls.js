import React from 'react';
import CinemaSeat from './CinemaSeat';
import './CinemaHalls.css';

const CinemaHalls = ({ cinemaHall, onSeatSelection }) => {
  return (
    <div key={cinemaHall.hallId}>
      <h2>{cinemaHall.hallName}</h2>
      {cinemaHall.showTimes.map((showTime, index) => (
        <div key={index}>
          <h3>Start Time: {showTime.startTime}</h3>
          <div className="CinemaHallSeats">
            {cinemaHall.seats.map(seat => (
              <CinemaSeat
                key={seat}
                seatName={seat}
                isBooked={showTime.bookedSeats.includes(seat)}
                onClick={() => onSeatSelection(seat)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CinemaHalls;
