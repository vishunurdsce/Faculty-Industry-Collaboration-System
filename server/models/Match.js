import mongoose from "mongoose";
const matchSchema = new mongoose.Schema({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
  score: Number,
  reason: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Match || mongoose.model("Match", matchSchema);
