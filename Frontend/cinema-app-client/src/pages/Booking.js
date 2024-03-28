import React, { useState } from "react";

const Booking = () => {
    const [ticketAmount, setTicketAmount] = useState(1);

    const increaseTicketAmount = () => {
        setTicketAmount(ticketAmount + 1);
    };

    const decreaseTicketAmount = () => {
        if (ticketAmount > 1) {
            setTicketAmount(ticketAmount - 1);
        }
    };

    return (
        <div>
            <h2>Ticket Amount: {ticketAmount}</h2>
            <button onClick={decreaseTicketAmount}>Decrease Ticket</button>
            <button onClick={increaseTicketAmount}>Increase Ticket</button>
            
            <button>Book Tickets</button>
        </div>
    );
};

export default Booking;
