import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define Industry schema
const industrySchema = new mongoose.Schema({
  name: String,
  needs: String,
  contact: String
});

// Model
const Industry = mongoose.model("Industry", industrySchema, "industries");

// GET all industries
router.get("/", async (req, res) => {
  try {
    const data = await Industry.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching industries:", err);
    res.status(500).json({ error: "Failed to fetch industry data" });
  }
});

// POST new industry
router.post("/", async (req, res) => {
  try {
    const newIndustry = new Industry(req.body);
    await newIndustry.save();
    res.json({ message: "Industry added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding industry" });
  }
});

export default router;
