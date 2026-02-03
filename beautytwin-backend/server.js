import express from "express";
import cors from "cors";
import multer from "multer";
import sqlite3 from "sqlite3";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });
const db = new sqlite3.Database("beauty.db");

db.run(`
CREATE TABLE IF NOT EXISTS scans(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt TEXT,
  bsi INTEGER,
  risks TEXT,
  routine TEXT
)`);

// --- BSI CALC ---
function computeBSI({ sleep, stress, hydration }) {
  let score = 50 + sleep*2 - stress*3 + hydration*2;
  return Math.max(0, Math.min(100, score));
}

function computeRisks(bsi){
  return {
    breakoutRisk: 80 - bsi,
    barrierRisk: 70 - bsi,
    irritationRisk: 65 - bsi
  };
}

app.post("/api/analyze", upload.single("image"), (req,res)=>{
  const { sleep, stress, hydration } = req.body;
  const bsi = computeBSI({ sleep:+sleep, stress:+stress, hydration:+hydration });
  const risks = computeRisks(bsi);
  const routine = { morning:["Cleanser","Serum","Moisturizer","SPF"] };

  db.run(`INSERT INTO scans VALUES(NULL,?,?,?,?)`,
    [new Date().toISOString(), bsi, JSON.stringify(risks), JSON.stringify(routine)],
    ()=> res.json({analysis:{bsi,risks}, routine})
  );
});

app.get("/api/history",(req,res)=>{
  db.all(`SELECT * FROM scans ORDER BY id DESC`,[],(e,r)=>res.json(r));
});

app.listen(3002,()=>console.log("Backend running on 3002"));



