import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import {useState,useEffect} from 'react';
import API from '../API/axiosConfig';


const MainNav =( {movies, setFilteredMovies} ) => {

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const moviesResponse = await API.get("/api/v1/movies");
        const uniqueGenres = Array.from(new Set(moviesResponse.data.flatMap(movie => movie.genres)));
        setGenres(uniqueGenres);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
  }, []);


  const handleGenreSelect = async (genre) => {
    try {
      const moviesResponse = await API.get("/api/v1/movies");
      const filteredMovies = moviesResponse.data.filter(movie => movie.genres.includes(genre));
      setFilteredMovies(filteredMovies);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSortByStartTime = async () => {
    try {
      const moviesResponse = await API.get("/api/v1/movies");
      const sortedMovies = moviesResponse.data.sort((a, b) => {
        const startTimeA = new Date(a.showTimes[0].startTime);
        const startTimeB = new Date(b.showTimes[0].startTime);
        return startTimeA - startTimeB;
      });
      setFilteredMovies(sortedMovies);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary">
      <Navbar.Brand href="/">PÕHJATAEVAS</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/else">Link</Nav.Link>
          <NavDropdown title="Genre" id="basic-nav-dropdown">
            {genres.map((genre, index) => (
              <NavDropdown.Item key={index} onClick={() => handleGenreSelect(genre)}>{genre}</NavDropdown.Item>
            ))}
          </NavDropdown>
          <NavDropdown title="Sort by" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleSortByStartTime}>Start Time</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Button variant="outline-info" className="me2">Login</Button>
        <Button variant="outline-info" className="me2">Sign Up</Button>
      </Navbar.Collapse>
    </Navbar>
  );
    };
  
//     <Navbar bg="dark" expand="lg" className="bg-body-tertiary">
//       <Container fluid>
//         <Navbar.Brand href="/">PÕHJATAEVAS</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav 
//           className="me-auto my-2 my-lg-0"
//           style={{maxHeight:'100px'}}
//           navbarScroll
//           >
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/else">Link</Nav.Link>
//             <NavDropdown title="Genre" id="basic-nav-dropdown">
              
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Button variant="outline-info" classname="me2">Login</Button>
//           <Button variant="outline-info" classname="me2">Sign Up</Button>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }


export default MainNav;


