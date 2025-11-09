import express from "express";
import Faculty from "../models/Faculty.js";
const router = express.Router();
router.get("/", async (req, res) => {
  try { const list = await Faculty.find().limit(100); res.json(list); }
  catch (err) { res.status(500).json({ error: err.message }); }
});
router.post("/", async (req, res) => {
  try { const f = new Faculty(req.body); const saved = await f.save(); res.json(saved); }
  catch (err) { res.status(400).json({ error: err.message }); }
});
router.get("/:id", async (req, res) => {
  try { const f = await Faculty.findById(req.params.id); if(!f) return res.status(404).json({ error: "Not found" }); res.json(f); }
  catch (err) { res.status(400).json({ error: err.message }); }
});
export default router;
