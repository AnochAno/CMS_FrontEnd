import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addCourse, updateCourse } from "../services/api";

export default function CourseForm({ show, onClose, course, refreshCourses }) {
  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    image: "",
    credits: "",
    description: "",
  });

  useEffect(() => {
    if (course) {
      setFormData(course);
    } else {
      setFormData({
        badge: "",
        title: "",
        image: "",
        credits: "",
        description: "",
      });
    }
  }, [course]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (course) {
        await updateCourse(course.id, formData);
      } else {
        await addCourse(formData);
      }
      refreshCourses();
      onClose();
    } catch (error) {
      console.error("❌ Failed to save course:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{course ? "Edit Course" : "Add Course"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Badge</Form.Label>
            <Form.Control
              name="badge"
              value={formData.badge}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Credits</Form.Label>
            <Form.Control
              type="number"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {course ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
