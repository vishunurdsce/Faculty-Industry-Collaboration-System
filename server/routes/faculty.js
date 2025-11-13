import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define Faculty schema
const facultySchema = new mongoose.Schema({
  name: String,
  expertise: String,
  department: String
});

// Model
const Faculty = mongoose.model("Faculty", facultySchema, "faculties");

// GET all faculty
router.get("/", async (req, res) => {
  try {
    const data = await Faculty.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching faculty:", err);
    res.status(500).json({ error: "Failed to fetch faculty data" });
  }
});

// POST new faculty
router.post("/", async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.json({ message: "Faculty added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding faculty" });
  }
});

export default router;
