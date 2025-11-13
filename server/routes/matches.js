import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Prevent OverwriteModelError: use existing models if already defined
const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", new mongoose.Schema({
  name: String,
  expertise: String,
  department: String
}), "faculties");

const Industry = mongoose.models.Industry || mongoose.model("Industry", new mongoose.Schema({
  name: String,
  needs: String,
  contact: String
}), "industries");

const Match = mongoose.models.Match || mongoose.model("Match", new mongoose.Schema({
  faculty: String,
  industry: String,
  score: Number,
  reason: String
}), "matches");

// 🧠 GET all matches
router.get("/", async (req, res) => {
  try {
    const data = await Match.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// 🤖 GENERATE AI matches
router.get("/generate", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    const industries = await Industry.find();

    if (!faculties.length || !industries.length) {
      return res.json({ message: "No faculty or industry data found to match.", matches: [] });
    }

    const matches = [];

    for (const f of faculties) {
      for (const i of industries) {
        const fExp = (f.expertise || "").toLowerCase();
        const iNeed = (i.needs || "").toLowerCase();

        if (!fExp || !iNeed) continue;

        const overlap = fExp.split(/[, ]+/).some(term => iNeed.includes(term));

        if (overlap) {
          const score = Math.floor(Math.random() * 20) + 80;
          matches.push({
            faculty: f.name,
            industry: i.name,
            score,
            reason: `Shared topic found between "${f.expertise}" and "${i.needs}".`
          });
        }
      }
    }

    await Match.deleteMany({});
    if (matches.length > 0) await Match.insertMany(matches);

    console.log(`✅ Generated ${matches.length} matches.`);
    res.json({ message: `Generated ${matches.length} matches successfully.`, matches });

  } catch (err) {
    console.error("Error generating matches:", err);
    res.status(500).json({ error: "Error generating matches" });
  }
});

// CLEAR all matches
router.delete("/clear", async (req, res) => {
  try {
    await Match.deleteMany({});
    res.json({ message: "All matches cleared successfully" });
  } catch (e) {
    console.error("Error clearing matches:", e);
    res.status(500).json({ error: "Failed to clear matches" });
  }
});

export default router;
