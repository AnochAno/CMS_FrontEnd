import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomNavbar from "./componets/Navbar";
import Filters from "./componets/Filters";
import CourseCard from "./componets/CourseCard";
import CourseForm from "./componets/CourseForm";
import { getCourses } from "./services/api";
import Login from "./componets/Login"; // ✅ Import login

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Track login
  const [view, setView] = useState("card");
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data || []);
    } catch (err) {
      console.error(err);
      setCourses([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCourses();
    }
  }, [isLoggedIn]);

  // ✅ If not logged in, show Login page
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // ✅ If logged in, show dashboard
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
          {courses?.map((course) => (
            <Col key={course.id} md={view === "card" ? 4 : 12}>
              <CourseCard
                {...course}
                view={view}
                onEdit={() => {
                  setEditCourse(course);
                  setShowForm(true);
                }}
                onDelete={fetchCourses}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <CourseForm
        show={showForm}
        onClose={() => setShowForm(false)}
        course={editCourse}
        refreshCourses={fetchCourses}
      />
    </>
  );
}
