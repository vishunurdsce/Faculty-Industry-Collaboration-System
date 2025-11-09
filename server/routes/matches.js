import express from "express";
import Match from "../models/Match.js";
import Faculty from "../models/Faculty.js";
import Industry from "../models/Industry.js";
const router = express.Router();
router.post("/", async (req, res) => {
  try { const m = new Match(req.body); const saved = await m.save(); res.json(saved); }
  catch (err) { res.status(400).json({ error: err.message }); }
});
router.post("/generate", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    const industries = await Industry.find();
    const matches = [];
    faculties.forEach(f => {
      industries.forEach(ind => {
        const facExp = Array.isArray(f.expertise) ? f.expertise.map(x=>x.toLowerCase()) : [];
        const indNeeds = Array.isArray(ind.needs) ? ind.needs.map(x=>x.toLowerCase()) : [];
        const intersection = facExp.filter(x => indNeeds.includes(x));
        const score = Math.min(100, intersection.length * 50 + Math.floor(Math.random()*20));
        const reason = intersection.length ? `Shared topics: ${intersection.join(", ")}` : `No direct overlap`;
        matches.push({ faculty: f._id, industry: ind._id, score, reason });
      });
    });
    const saved = await Match.insertMany(matches.slice(0,50));
    res.json(saved);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get("/", async (req, res) => {
  try { const list = await Match.find().limit(200).populate('faculty').populate('industry'); res.json(list); }
  catch (err) { res.status(500).json({ error: err.message }); }
});
export default router;
