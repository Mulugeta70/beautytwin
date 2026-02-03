import { useEffect, useState, useRef } from "react";
import { analyze, getHistory, getHistoryItem, whatIf } from "./api";

export default function App() {
  const [image, setImage] = useState(null);
  const [selfieOpen, setSelfieOpen] = useState(false);
  const [skinGoal, setSkinGoal] = useState("hydrate");
  const [hairGoal, setHairGoal] = useState("repair");
  const [environment, setEnvironment] = useState("dry");
  const [sleep, setSleep] = useState(6);
  const [stress, setStress] = useState(5);
  const [hydration, setHydration] = useState(5);
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => { getHistory().then(setHistory); }, []);

  async function runAnalyze(){
    const res = await analyze({ image, skinGoal, hairGoal, environment, sleep, stress, hydration });
    setCurrent(res);
    setHistory(await getHistory());
  }

  return (
    <>
      <div className="header">GlowTech Labs — BeautyTwin AI</div>

      <div className="container">

        <div className="card">
          <h2>Create Your Digital Beauty Twin</h2>
          <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])}/>
          <button className="btn-primary" onClick={runAnalyze}>Generate BeautyTwin</button>
        </div>

        {current && (
          <div className="card">
            <h3>Predictive Dashboard (BSI {current.analysis.bsi})</h3>
            {Object.entries(current.analysis.risks).map(([k,v])=>(
              <div key={k}>
                <div>{k}</div>
                <div className="meter"><div className="meter-fill" style={{width:v+"%"}}/></div>
              </div>
            ))}
          </div>
        )}

        <div className="card">
          <h3>History</h3>
          {history.map(h=>(
            <div key={h.id} className="btn-secondary" onClick={()=>getHistoryItem(h.id).then(setCurrent)}>
              {new Date(h.createdAt).toLocaleString()}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}


