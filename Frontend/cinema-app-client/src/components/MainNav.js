import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import API from '../API/axiosConfig';

const MainNav = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleShowSignupModal = () => setShowSignupModal(true);
    const handleCloseSignupModal = () => setShowSignupModal(false);

    const handleSignup = async () => { 
      try {
          const response = await API.post('/api/v1/signup', {
              userEmail: email,
              password: password
          });
          if (response.status === 200) {
              setIsLoggedIn(true);
              setShowSignupModal(false);
              
          }
      } catch (error) {
          console.error('Signup failed:', error);
      }
  };

    const handleLogin = async () => {
        try {
            const response = await API.post('/api/v1/auth/login', {
                userEmail: email,
                password: password
            });
            if (response.status === 200) {
                setIsLoggedIn(true);
                setShowLoginModal(false);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = async () => {
      try {
          // Send request to backend to logout user
          const response = await API.post('/api/v1/auth/logout', { userEmail: email });
          if (response.status === 200) {
              setIsLoggedIn(false); 
          } else {
              console.error('Logout failed:', response.data.error);
          }
      } catch (error) {
          console.error('Logout failed:', error);
      }
  };

    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleCloseLoginModal = () => setShowLoginModal(false);

    return (
        <Navbar bg="dark" expand="lg" className="bg-body-tertiary">
            <Navbar.Brand href="/">PÕHJATAEVAS</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/else">Link</Nav.Link>
                </Nav>
                {!isLoggedIn ? (
                    <Button variant="outline-info" className="me-2" onClick={handleShowLoginModal}>Login</Button>
                ) : (
                    <Button variant="outline-info" className="me-2" onClick={handleLogout}>Logout</Button>
                )}
                {!isLoggedIn && <Button onClick={handleShowSignupModal} variant="outline-info" className="me-2">Sign Up</Button>}
            </Navbar.Collapse>

            {/* Login */}
            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLoginModal}>Close</Button>
                    <Button variant="primary" onClick={handleLogin}>Login</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSignupModal} onHide={handleCloseSignupModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSignupModal}>Close</Button>
                    <Button onClick={handleShowSignupModal} variant="outline-info" className="me-2">Sign Up</Button>
                </Modal.Footer>
            </Modal>

        </Navbar>
    );
};

export default MainNav;
