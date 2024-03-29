import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BookingContent from "../components/BookingContent";
import BookingModal from "../components/BookingModal";

const Booking = () => {
  const [ticketAmount, setTicketAmount] = useState(1);
  const location = useLocation();
  const cinemaHall = location.state?.cinemaHall;
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [allCinemaHalls, setAllCinemaHalls] = useState([]);

  // Function definitions for handling ticket amount changes
  const decreaseTicketAmount = () => {
    if (ticketAmount > 1) {
      setTicketAmount(ticketAmount - 1);
    }
  };

  const increaseTicketAmount = () => {
    setTicketAmount(ticketAmount + 1);
  };

  
    return (
        <div>
          {cinemaHall ? (
            <BookingContent
              cinemaHall={cinemaHall}
              cinemaHalls={allCinemaHalls}
              ticketAmount={ticketAmount}
              onDecreaseTicket={decreaseTicketAmount}
              onIncreaseTicket={increaseTicketAmount}
              showBookingModal={showBookingModal}
              setShowBookingModal={setShowBookingModal}
            />
          ) : (
            <p>Loading cinema hall information...</p>
          )}
          <BookingModal
            showModal={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            cinemaHall={cinemaHall}
          />
        </div>
      );
    };

export default Booking;

{/* <div> working return
{cinemaHall ? (
  <BookingContent
    cinemaHall={cinemaHall}
    ticketAmount={ticketAmount}
    onDecreaseTicket={decreaseTicketAmount}  // Pass functions as props
    onIncreaseTicket={increaseTicketAmount}
  />
) : (
  <p>Loading cinema hall information...</p>
)}
</div> */}

//rendering issuses had to refactor it to 2 pieces
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import BookingContent from "../components/BookingContent";


// const Booking = () => {
// const [ticketAmount, setTicketAmount] = useState(1);
// const [totalPrice, setTotalPrice] = useState(0);
//    const location = useLocation();
//    const cinemaHall = location.state?.cinemaHall;
   
//    if (cinemaHall) {
//     setTotalPrice(cinemaHall.price); // Set initial price if cinemaHall is available
//     //console.log(cinemaHall); // Log cinemaHall information
    
//   }


//   const decreaseTicketAmount = () => {
//     if (ticketAmount > 1) {
//       setTicketAmount(ticketAmount - 1);
//     }
//   };

//   const increaseTicketAmount = () => {
//     setTicketAmount(ticketAmount + 1);
//   };

//     return (
//     //     <div>
//     //         {cinemaHall && ( // Render only if cinemaHall exists
//     //         <>
//     //         <h2>Ticket Amount: {ticketAmount}</h2>
//     //         <h3>Ticket Price: ${totalPrice}</h3>
//     //         <button onClick={decreaseTicketAmount}>Decrease Ticket</button>
//     //         <button onClick={increaseTicketAmount}>Increase Ticket</button>
//     //         <button>Book Tickets</button>
//     //         </>
//     //         )}
//     //        {!cinemaHall && ( // Display loading message if not available
//     //     <p>Loading cinema hall information...</p>
//     //   )}
//     //     </div>
//     // );
//     <div>
//       {cinemaHall ? <BookingContent cinemaHall={cinemaHall} /> : (
//         <p>Loading cinema hall information...</p>
//       )}
//     </div>
//   );
// };

// export default Booking;


