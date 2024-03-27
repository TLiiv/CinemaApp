import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const MainNav =() => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">PÕHJATAEVAS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
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

