// import React, { useState } from 'react';
// import { Modal } from 'react-bootstrap'; 
// import axios from 'axios'; 
// import { useLocation } from 'react-router-dom'; 
// import { v4 as uuidv4 } from 'uuid';
// import CinemaHalls from './CinemaHalls';

// const BookingModal = ({ showModal, onClose, cinemaHall }) => {
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const location = useLocation();
//   const selectedShowTime = location.state?.showTime;
//   const movieId = location.state?.movieId;

  

//   const handleSeatSelection = (seat) => {
//     const newSelectedSeats = [...selectedSeats];
//     if (newSelectedSeats.includes(seat)) {
//       // Remove seat from selection
//       const index = newSelectedSeats.indexOf(seat);
//       newSelectedSeats.splice(index, 1);
//     } else {
//       // Add seat to selection
//       newSelectedSeats.push(seat);
//     }
//     setSelectedSeats(newSelectedSeats);
//   };

//   const handleBooking = async () => {
//     const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : uuidv4();
    
  
//     try {
//       const response = await axios.post('/api/v1/bookings/create', {
//         userId: userId,
//         hallId: cinemaHall.hallId,
//         movieId: movieId,
//         bookedSeats: selectedSeats,
//         bookedShowTimes: [selectedShowTime],
//       });
  
//       if (response.status === 201) { // Check for created status code (201)
//         console.log('Booking successful');
//         onClose(); // Close modal on successful booking
//         // Optionally, display a success message or redirect to another page
//       } else {
//         console.error('Booking failed:', response.data);
//         // Handle errors appropriately (display error message to user)
//       }
//     } catch (error) {
//       console.error('Booking error:', error);
//       // Handle other potential errors (e.g., network issues)
//     }
//   };
// //   const filteredHalls = cinemaHall.filter(hall => {
// //     // Check if hall ID matches selected cinemaHall ID
// //     return hall._id === cinemaHall._id;
// //   }); 


//   return (
//     <Modal show={showModal} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Booking Confirmation</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h2>Cinema Hall: {cinemaHall.hallName}</h2>
//         <h3>Show Time: {selectedShowTime}</h3>
//         <h4>Selected Seats: {selectedSeats.join(', ')}</h4>
        
//           <CinemaHalls
//              // Pass filtered array
//             selectedShowTime={selectedShowTime}
//             onSeatSelection={handleSeatSelection}
//           />
        
//       </Modal.Body>
//       <Modal.Footer>
//         <button variant="secondary" onClick={onClose}>
//           Close
//         </button>
//         <button variant="primary" disabled={!selectedSeats.length} onClick={handleBooking}>
//           Buy Tickets
//         </button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default BookingModal;
// BookingModal Component
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import axios from 'axios'; 
import { useLocation } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import CinemaHalls from './CinemaHalls';
import { useEffect } from 'react';

const BookingModal = ({ showModal, onClose,cinemaHall }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedCinemaHall, setSelectedCinemaHall] = useState(null);
    const [selectedShowTime, setSelectedShowTime] = useState(null);
    const [movieId, setMovieId] = useState(null);
    const location = useLocation();
   
  
   
    useEffect(() => {
        if (cinemaHall) {
          setSelectedShowTime(location.state?.showTime);
          setMovieId(location.state?.movieId);
          const showTime = cinemaHall.showTimes.find(showTime => showTime.movieId === location.state?.movieId && showTime.startTime === location.state?.showTime);
          setSelectedCinemaHall(cinemaHall);
          setSelectedShowTime(showTime);
        }
      }, [cinemaHall, location]);


    const handleSeatSelection = (seat) => {
        setSelectedSeats(prevSeats => {
            if (prevSeats.includes(seat)) {
                return prevSeats.filter(selectedSeat => selectedSeat !== seat);
            } else {
                return [...prevSeats, seat];
            }
        });
    };
  
    const handleBooking = async () => {
    const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : uuidv4();
    try {
      const response = await axios.post('/api/v1/bookings/create', {
        userId: userId,
        hallId: selectedCinemaHall.hallId,
        movieId: movieId,
        bookedSeats: selectedSeats,
        bookedShowTimes: [selectedShowTime],
      });
  
      if (response.status === 201) { // Check for created status code (201)
        console.log('Booking successful');
        onClose(); // Close modal on successful booking
        // Optionally, display a success message or redirect to another page
      } else {
        console.error('Booking failed:', response.data);
        // Handle errors appropriately (display error message to user)
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Handle other potential errors (e.g., network issues)
    }
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedCinemaHall && (
          <>
            <h2>Cinema Hall: {selectedCinemaHall.hallName}</h2>
            <h3>Show Time: {selectedShowTime}</h3>
            <h4>Selected Seats: {selectedSeats.join(', ')}</h4>
            <CinemaHalls cinemaHall={selectedCinemaHall} onSeatSelection={handleSeatSelection} />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button variant="secondary" onClick={onClose}>
          Close
        </button>
        <button variant="primary" disabled={!selectedSeats.length} onClick={handleBooking}>
          Buy Tickets
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
