import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


const MainNav =() => {
  return (
    <Navbar bg="dark" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">PÕHJATAEVAS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav 
          className="me-auto my-2 my-lg-0"
          style={{maxHeight:'100px'}}
          navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/else">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="outline-info" classname="me2">Login</Button>
          <Button variant="outline-info" classname="me2">Sign Up</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default MainNav;

// const MainNav =()  => {
//   const items = [
//     { path: '/', title: 'Home' },
//     { path: '/login', title: 'Login' },
//     { path: '/logout', title: 'Logout' },
//     { path: '/signup', title: 'Signup' },
//     { path: '/movies', title: 'Movies'}
//   ];

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container-fluid">
//         <a className="navbar-brand d-flex pt-2" href="/">
//           <img src={logo} alt="" className="navbar-logo" />React-Bootstrap
//         </a>
//         <button className="navbar-toggler collapsed"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#navbarMenu"
//                 aria-controls="navbarMenu"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"/>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarMenu">
//           <ul className="navbar-nav">
//             {
//               items.map((item, i) => (
//                 <li key={i} className="nav-item">
//                   <NavLink className="nav-link" to={item.path}>{item.title}</NavLink>
//                 </li>
//               ))
//             }
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

