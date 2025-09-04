import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Filters from "./componets/Filters";
import CourseCard from "./componets/CourseCard";
import CourseForm from "./componets/CourseForm";
import { getCourses, deleteCourse } from "./services/api";
import CustomNavbar from "./componets/Navbar";

export default function App() {
  const [view, setView] = useState("card");
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Edit handler
  const handleEdit = (course) => {
    setEditCourse(course);
    setShowForm(true);
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (error) {
      console.error("❌ Failed to delete course:", error);
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <Button
          className="mb-3"
          onClick={() => {
            setEditCourse(null);
            setShowForm(true);
          }}
        >
          Add Course
        </Button>

        <Filters view={view} setView={setView} />

        <Row className={view === "card" ? "g-3" : "flex-column"}>
          {courses.map((course) => (
            <Col key={course.id} md={view === "card" ? 4 : 12}>
              <CourseCard
                {...course}
                course={course}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Col>
          ))}
        </Row>

        {showForm && (
          <CourseForm
            show={showForm}
            onClose={() => setShowForm(false)}
            course={editCourse}
            refreshCourses={fetchCourses}
          />
        )}
      </Container>
    </>
  );
}
