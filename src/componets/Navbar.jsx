import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css';

export default function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
       <Navbar.Brand href="#" className="navbar-brand-ucms text-center">
  <div className="ucms-logo">UCMS</div>
  <div className="ucms-full">University Course Management System</div>
</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Dashboard</Nav.Link>
            <Nav.Link href="#" className="fw-bold text-danger">
              Courses
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
