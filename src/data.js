/*
data.js - browser/global version (patched)
Tries to fetch faculty and industry lists from backend /api/*. If backend isn't running, falls back to static local data.
Exposes:
 - window.facultyData, window.industryData, window.matchesData
 - window.loadDataFromBackend() -> returns a Promise
 - window.__dataReady -> Promise that resolves when initial load finishes
*/
(function(){
  const staticFaculty = [
      { id: 1, name: "Dr. Smith", expertise: "AI", department: "Computer Science" },
      { id: 2, name: "Dr. Johnson", expertise: "Data Science", department: "Statistics" },
      { id: 3, name: "Dr. Brown", expertise: "Robotics", department: "Engineering" }
  ];

  const staticIndustry = [
      { id: 1, name: "Tech Corp", needs: "AI Research", contact: "hr@techcorp.com" },
      { id: 2, name: "Data Solutions", needs: "Data Analysis", contact: "careers@datasol.com" },
      { id: 3, name: "Auto Industries", needs: "Robotics Automation", contact: "info@autoind.com" }
  ];

  window.facultyData = staticFaculty.slice();
  window.industryData = staticIndustry.slice();
  window.matchesData = [];

  // loadFromBackend returns a promise that resolves when fetch attempts finish
  async function loadFromBackend(){
      try {
          const [fRes, iRes, mRes] = await Promise.allSettled([
              fetch("/api/faculty").then(r=>r.ok? r.json() : Promise.reject("no-faculty")),
              fetch("/api/industry").then(r=>r.ok? r.json() : Promise.reject("no-industry")),
              fetch("/api/matches").then(r=>r.ok? r.json() : Promise.reject("no-matches"))
          ]);

          if(fRes.status === "fulfilled"){
              const json = fRes.value;
              window.facultyData = json.map((d, i) => ({
                  id: d._id || i+1,
                  name: d.name || "Unknown",
                  expertise: Array.isArray(d.expertise) ? d.expertise.join(", ") : d.expertise || "",
                  department: d.department || ""
              }));
          }

          if(iRes.status === "fulfilled"){
              const json = iRes.value;
              window.industryData = json.map((d,i) => ({
                  id: d._id || i+1,
                  name: d.name || "Unknown",
                  needs: Array.isArray(d.needs) ? d.needs.join(", ") : d.needs || "",
                  contact: d.contact || ""
              }));
          }

          if(mRes.status === "fulfilled"){
              const jm = mRes.value;
              window.matchesData = jm.map(it => ({
                  id: it._id,
                  score: it.score,
                  reason: it.reason,
                  faculty: it.faculty && (it.faculty.name || it.faculty),
                  industry: it.industry && (it.industry.name || it.industry)
              }));
          }

          console.log("Loaded backend data:", window.facultyData.length, "faculty,", window.industryData.length, "industry, matches:", (window.matchesData||[]).length);
      } catch (err) {
          console.warn("Could not fetch backend APIs:", err && err.message ? err.message : err);
      }
  }

  // expose and create a Promise that resolves when first load completes (or after timeout)
  let _resolve;
  window.__dataReady = new Promise((resolve) => { _resolve = resolve; });

  // call but don't block - when done resolve __dataReady
  (async function init(){
      try {
          await loadFromBackend();
      } catch(e){
          // ignore
      } finally {
          // small defer to allow scripts execution order
          setTimeout(()=> {
            _resolve(true);
          }, 50);
      }
  })();

  // expose loader
  window.loadDataFromBackend = loadFromBackend;
})();