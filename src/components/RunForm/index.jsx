import React, {useState} from "react";
import {API_URL, DYNAMIC_L_TYPES, ESTIM_TYPES, SEL_TYPES, INIT_TYPES} from "../../constants";
import "./style.scss";

const makeHandler = setter => e => e.persist() || setter(e.target.value);

const RunForm = ({ onFinish }) => {
  const [l, setL] = useState(10);
  const [selType, setSelType] = useState(SEL_TYPES[0].value);
  const [runs, setRuns] = useState(1);
  const [init, setInit] = useState("all_0");
  const [type, setType] = useState(DYNAMIC_L_TYPES[0].value);
  const [estim, setEstim] = useState(ESTIM_TYPES[0].value);

  const [progress, setProgress] = useState({});

  const checkRun = async (runIdIndex, runIds) => {
    const url = `${API_URL}/check?run_id=${runIds[runIdIndex]}`;
    const response = await fetch(url);

    const json = await response.json();

    if (json.finish) {
      if (runIdIndex >= runIds.length - 1) {
        onFinish(runIds);
        return;
      }
      setTimeout(() => checkRun(runIdIndex + 1, runIds), 1000);
    } else {
      setTimeout(() => checkRun(runIdIndex, runIds), 1000);
    }

    setProgress({
      iteration: json.iter,
      run: runIdIndex,
      runs: runIds.length,
    });
  };

  const startRuns = async () => {
    const url = `${API_URL}/run?&l=${l}&init=${init}&runs=${runs}&sel_type=${selType}&estim=${estim}&size_pop_type=${type}&px=0.1`;
    const response = await fetch(url);
    const json = await response.json();
    if (!!json.length) {
      setTimeout(()=>checkRun(0, json), 100);
    }
  };

  return (
    <div className="runForm">
      <h1>
        Налаштування запуску
      </h1>
      <div>
        <label>
          Довжина індивідума
        </label>
        <select value={l} onChange={value => {
          makeHandler(setL)(value);
        }}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div>
        <label>
          Функція ініціалізації популяції
        </label>
        <select value={init} onChange={value => {
          makeHandler(setInit)(value);
        }}>
          {INIT_TYPES.map(n => (
            <option value={n.value} key={n.value}>{n.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Функція оцінювання</label>
        <select value={estim} onChange={value => {
          makeHandler(setEstim)(value);
        }}>
          {ESTIM_TYPES.map(n => (
            <option value={n.value} key={n.value}>{n.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>
          Функція відбору
        </label>
        <select value={selType} onChange={value => {
          makeHandler(setSelType)(value);
        }}>
          {SEL_TYPES.map(n => (
            <option value={n.value} key={n.value}>{n.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>
          Функція зростання популяції
        </label>
        <select value={type} onChange={value => {
          makeHandler(setType)(value);
        }}>
          {DYNAMIC_L_TYPES.map(n => (
            <option value={n.value} key={n.value}>{n.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>
          Кількість прогонів
        </label>
        <input type="number" min={1} max={10} step={1} placeholder="Number of runs" onChange={value => {
          makeHandler(setRuns)(value);
        }} value={runs}/>
      </div>

      <div className="bottomMenu">
        <button onClick={startRuns}>
          Запустити прогони
        </button>
        <div className="progress-b">

          {progress.iteration ? (
            <>
              <div>
                Ітерація: {progress.iteration} з 20 000
              </div>
              <div>
                Номер прогону: {progress.run + 1}/{progress.runs}
              </div>
            </>
          ) : "..."}
        </div>
      </div>
    </div>
  );
};

export default RunForm;
