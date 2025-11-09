# Faculty-Industry-Collaboration-System - Final Integrated Version

## Setup (backend + frontend)

1. Ensure MongoDB is running locally and Compass can connect to `mongodb://127.0.0.1:27017`.
2. From a terminal:
   ```bash
   cd /mnt/data/FICS-with-router/Faculty-Industry-Collaboration-System/server
   npm install
   npm run dev
   ```
3. Open your browser at: `http://localhost:5000`

## Notes
- Add data via MongoDB Compass (database: `faculty-industry-collaboration`, collections: `faculties`, `industries`, `matches`), or use the API endpoints:
  - `GET /api/faculty`
  - `POST /api/faculty`
  - `GET /api/industry`
  - `POST /api/industry`
  - `GET /api/matches`
  - `POST /api/matches/generate`

- Frontend will auto-fetch from backend when available; otherwise it uses static demo data.

