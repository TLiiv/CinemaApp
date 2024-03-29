import React from "react";

const BookingContent = ({ cinemaHall, ticketAmount, onDecreaseTicket, onIncreaseTicket, showBookingModal, setShowBookingModal }) => {
    // Props for data and event handlers
    const handleBookTickets = () => {
        setShowBookingModal(true); // Open the booking modal
      };
  
    return (
      <div>
        <h2>Ticket Amount: {ticketAmount}</h2>
        <h3>Ticket Price: ${cinemaHall.price * ticketAmount}</h3> 
        <button onClick={onDecreaseTicket}>Decrease Ticket</button>
        <button onClick={onIncreaseTicket}>Increase Ticket</button>
        <button onClick={handleBookTickets}>Book Tickets</button>
      </div>
    );
}

export default BookingContent;
