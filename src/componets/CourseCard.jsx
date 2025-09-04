// src/componets/CourseCard.jsx
import { Card, Dropdown, Row, Col } from "react-bootstrap";
import { ThreeDotsVertical, Pencil, Trash } from "react-bootstrap-icons";
import "./Course.css";
import { deleteCourse } from "../services/api";

export default function CourseCard({ id, badge, title, image, credits, description, view, onEdit, onDelete }) {

  const handleDelete = async () => {
    await deleteCourse(id);
    onDelete();
  };

  if (view === "list") {
    return (
      <Card className="course-card-list shadow-sm mb-3">
        <Row className="g-0 align-items-center">
          <Col md={3}>
            <Card.Img src={image} className="course-card-img-list" />
          </Col>
          <Col md={9}>
            <Card.Body className="py-2">
              <Card.Title className="fs-6 fw-bold">{title}</Card.Title>
              <Card.Subtitle className="text-muted mb-2">Credits: {credits}</Card.Subtitle>
              <Card.Text className="small text-secondary">{description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }

  return (
    <Card className="course-card shadow-sm h-100">
      <div className="position-relative">
        <Card.Img variant="top" src={image} className="course-card-img" />
        <span className="badge bg-primary position-absolute top-0 start-0 m-2">{badge}</span>

        <Dropdown className="position-absolute bottom-0 end-0 m-2">
          <Dropdown.Toggle variant="light" size="sm" className="shadow-sm">
            <ThreeDotsVertical />
          </Dropdown.Toggle>
          <Dropdown.Menu className="custom-dropdown-menu">
            <Dropdown.Item onClick={onEdit}><Pencil className="me-2" /> Edit</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}><Trash className="me-2" /> Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Card.Body>
        <Card.Title className="fs-6 fw-bold">{title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">Credits: {credits}</Card.Subtitle>
        <Card.Text className="small text-secondary">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
