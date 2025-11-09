import mongoose from "mongoose";
const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
  expertise: [String],
  email: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);
