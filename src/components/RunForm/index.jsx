import React, {useState} from "react";
import "./style.scss";

const API_URL = 'http://127.0.0.1:8000';

const SEL_TYPES = [
  {value: 'rws', label: 'Рулетка'},
  {value: 'tournament_2', label: 'Турнір 2'},
  {value: 'tournament_4', label: 'Турнір 4'},
];

const INIT_TYPES = [
  {value: 'all_0', label: 'Всі нулі'},
  {value: 'normal', label: 'Нормальний розподіл (Гауса)'},
];

const ESTIM_TYPES = [
  {value: 'all_l', label: 'Статична функція здоров\'я'},
  {value: 'on_split_locuses', label: 'Змінна функція здоров\'я'},
];

const DYNAMIC_L_TYPES = [
  {value: 'type_1', label: 'Type 1 (first 10 steps **2)'},
  {value: 'type_2', label: 'Type 2 (first 80 steps *1.1)'},
  {value: 'type_3', label: 'Type 3 (*1.005)'},
  {value: 'type_4', label: 'Type 4 (+1 by 2000)'},
  {value: 'type_3_init_200', label: 'Type 3 (*1.005), init size 200'},
  {value: 'type_3_i_200_px10', label: 'Type 3 (*1.005), init size 200 px*10'},
  {value: 'type_3_i_200_px0_1', label: 'Type 3 (*1.005), init size 200 px/10'},
  {value: 'type_3_i_200_if_500', label: 'Type 3 (*1.005), init size 200, static size first 500 iter'},
];


// const VARIANTS = [{value: 1, label: 'static population size'}, {value: 2, label: 'dynamic population size'}];

const makeHandler = setter => e => e.persist() || setter(e.target.value);

const RunForm = () => {
  // const [n, setN] = useState(null);
  const [l, setL] = useState(10);
  const [selType, setSelType] = useState(SEL_TYPES[0].value);
  const [runs, setRuns] = useState(1);
  const [init, setInit] = useState("all_0");
  const [type, setType] = useState(DYNAMIC_L_TYPES[0].value);
  const [estim, setEstim] = useState(ESTIM_TYPES[0].value);

  const [progress, setProgress] = useState({});

  const checkRun = async (runIdIndex, prevProgress, runIds) => {
    const url = `${API_URL}/check?run_id=${runIds[runIdIndex]}`;
    const response = await fetch(url);

    const json = await response.json();

    if (prevProgress === json) {
      if (runIdIndex >= runIds.length - 1) {
        return;
      }
      setTimeout(() => checkRun(runIdIndex + 1, json, runIds), 1000);
    } else {
      setTimeout(() => checkRun(runIdIndex, json, runIds), 1000);
    }

    setProgress({
      iteration: json,
      run: runIdIndex,
      runs: runIds.length,
    });
  };

  const startRuns = async () => {
    const url = `${API_URL}/run?&l=${l}&init=${init}&runs=${runs}&sel_type=${selType}&estim=${estim}&size_pop_type=${type}&px=0.1`;
    const response = await fetch(url);
    const json = await response.json();
    if (!!json.length) {
      await checkRun(0, null, json);
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
