import React from "react";

const BookingContent = ({ cinemaHall, ticketAmount, onDecreaseTicket, onIncreaseTicket }) => {
    // Props for data and event handlers
  
    return (
      <div>
        <h2>Ticket Amount: {ticketAmount}</h2>
        <h3>Ticket Price: ${cinemaHall.price * ticketAmount}</h3> 
        <button onClick={onDecreaseTicket}>Decrease Ticket</button>
        <button onClick={onIncreaseTicket}>Increase Ticket</button>
        <button>Book Tickets</button>
      </div>
    );
}

export default BookingContent;
