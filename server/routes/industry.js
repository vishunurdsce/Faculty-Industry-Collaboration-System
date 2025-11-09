import express from "express";
import Industry from "../models/Industry.js";
const router = express.Router();
router.get("/", async (req, res) => {
  try { const list = await Industry.find().limit(100); res.json(list); }
  catch (err) { res.status(500).json({ error: err.message }); }
});
router.post("/", async (req, res) => {
  try { const i = new Industry(req.body); const saved = await i.save(); res.json(saved); }
  catch (err) { res.status(400).json({ error: err.message }); }
});
router.get("/:id", async (req, res) => {
  try { const i = await Industry.findById(req.params.id); if(!i) return res.status(404).json({ error: "Not found" }); res.json(i); }
  catch (err) { res.status(400).json({ error: err.message }); }
});
export default router;
