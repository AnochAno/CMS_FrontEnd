import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { addCourse, updateCourse } from "../services/api";

export default function CourseForm({ show, onClose, course, refreshCourses }) {
  const [formData, setFormData] = useState({ badge: "", title: "", image: "", credits: "", description: "" });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if(course) {
      setFormData(course);
      setPreview(course.image || "");
    } else {
      setFormData({ badge: "", title: "", image: "", credits: "", description: "" });
      setPreview("");
    }
    setErrors({});
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    if(name==="image") setPreview(value);
  };

  const validate = () => {
    const newErrors = {};
    if(!formData.badge) newErrors.badge="Badge is required";
    if(!formData.title) newErrors.title="Title is required";
    if(!formData.credits) newErrors.credits="Credits are required";
    if(!formData.description) newErrors.description="Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length===0;
  };

  const handleSubmit = async () => {
    if(!validate()) return;
    try{
      if(course) await updateCourse(course.id, formData);
      else await addCourse(formData);
      refreshCourses();
      onClose();
    } catch(err) { console.error(err); }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{course?"Edit Course":"Add Course"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Badge</Form.Label>
                <Form.Control name="badge" value={formData.badge} onChange={handleChange} placeholder="Enter badge e.g. Workshop" isInvalid={!!errors.badge}/>
                <Form.Control.Feedback type="invalid">{errors.badge}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" value={formData.title} onChange={handleChange} placeholder="Enter course title" isInvalid={!!errors.title}/>
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control name="image" value={formData.image} onChange={handleChange} placeholder="Enter image URL"/>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center">
              {preview && <Image src={preview} thumbnail style={{height:"60px"}}/>}
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Credits</Form.Label>
                <Form.Control type="number" name="credits" value={formData.credits} onChange={handleChange} placeholder="Enter credits" isInvalid={!!errors.credits}/>
                <Form.Control.Feedback type="invalid">{errors.credits}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Enter course description" isInvalid={!!errors.description}/>
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>{course?"Update":"Add"}</Button>
      </Modal.Footer>
    </Modal>
  );
}
