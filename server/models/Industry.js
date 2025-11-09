import mongoose from "mongoose";
const industrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  needs: [String],
  contact: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Industry || mongoose.model("Industry", industrySchema);
