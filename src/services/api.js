import axios from "axios";

const API_URL = "http://localhost:8080/api/courses";

// Get all courses
export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error("❌ Error fetching courses:", error.response?.data || error.message);
    throw error;
  }
};

// Add new course
export const addCourse = async (course) => {
  try {
    const response = await axios.post(API_URL, course);
    console.log("✅ Course added:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error adding course:", error.response?.data || error.message);
    throw error;
  }
};

// Update course
export const updateCourse = async (id, course) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, course);
    console.log("✏️ Course updated:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error updating course:", error.response?.data || error.message);
    throw error;
  }
};

// Delete course
export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log("🗑️ Course deleted:", id);
    return response;
  } catch (error) {
    console.error("❌ Error deleting course:", error.response?.data || error.message);
    throw error;
  }
};
