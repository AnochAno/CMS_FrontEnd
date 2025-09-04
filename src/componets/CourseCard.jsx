import { Card, Dropdown, Badge } from "react-bootstrap";
import { ThreeDotsVertical, Pencil, Trash } from "react-bootstrap-icons";

export default function CourseCard({ badge, title, image, credits, description, course, onEdit, onDelete }) {
  return (
    <Card className="shadow-sm h-100 position-relative">
      {/* Badge at top-left corner */}
      {badge && (
        <Badge
          bg="primary"
          className="position-absolute top-0 start-0 m-2"
          style={{ fontSize: "0.8rem" }}
        >
          {badge}
        </Badge>
      )}

      <Card.Img variant="top" src={image} style={{ height: "150px", objectFit: "cover" }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">Credits: {credits}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>

        <Dropdown className="position-absolute top-0 end-0 m-2">
          <Dropdown.Toggle variant="light" size="sm">
            <ThreeDotsVertical />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onEdit(course)}>
              <Pencil className="me-2" /> Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onDelete(course.id)}>
              <Trash className="me-2" /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
}
