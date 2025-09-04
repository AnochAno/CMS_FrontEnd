// src/services/api.js
import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const coursesCollection = collection(db, "courses");

// Add a course
export const addCourse = async (course) => {
  await addDoc(coursesCollection, course);
};

// Get all courses
export const getCourses = async () => {
  const snapshot = await getDocs(coursesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update course
export const updateCourse = async (id, updatedCourse) => {
  const courseDoc = doc(db, "courses", id);
  await updateDoc(courseDoc, updatedCourse);
};

// Delete course
export const deleteCourse = async (id) => {
  const courseDoc = doc(db, "courses", id);
  await deleteDoc(courseDoc);
};
