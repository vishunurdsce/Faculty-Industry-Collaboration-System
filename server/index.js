import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import facultyRoutes from "./routes/faculty.js";
import industryRoutes from "./routes/industry.js";
import matchesRoutes from "./routes/matches.js";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/faculty-industry-collaboration";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log("✅ Connected to MongoDB"))
  .catch(e=>console.error("MongoDB connection error",e));

app.use("/api/faculty", facultyRoutes);
app.use("/api/industry", industryRoutes);
app.use("/api/matches", matchesRoutes);

// Serve frontend in development from ../src for convenience, or ../build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "build")));
} else {
  app.use(express.static(path.join(__dirname, "..", "src")));
}

app.get("*", (req, res) => {
  const indexPath = process.env.NODE_ENV === "production"
    ? path.join(__dirname, "..", "build", "index.html")
    : path.join(__dirname, "..", "src", "index.html");
  res.sendFile(indexPath);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`🚀 Server running on port ${PORT}`));
