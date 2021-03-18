import React, {useState} from "react";
import {API_URL, ESTIM_TYPES, INIT_TYPES, SEL_TYPES} from "../../constants";
import "./style.scss";

const makeHandler = setter => e => e.persist() || setter(e.target.value);

const RunForm = ({onFinish, openArchive}) => {
  const [l, setL] = useState(100);
  const [n, setN] = useState(100);
  const [title, setTitle] = useState('');
  const [params, setParams] = useState({});
  const [sigma, setSigma] = useState(2);
  const [const_1, setConst1] = useState(1);
  const [const_2, setConst2] = useState(2);
  const [stopConfluence, setStopConfluence] = useState(true);
  const [px, setPx] = useState(0.00001);
  const [selType, setSelType] = useState(SEL_TYPES[0].value);
  const [runs, setRuns] = useState(1);
  const [init, setInit] = useState("normal");
  const [useMutation, setUseMutation] = useState(false);
  const [estim, setEstim] = useState('hamming');
  const [maxN, setMaxN] = useState(100);
  const [progress, setProgress] = useState({});
  const [selParam1, setSelParam1] = useState(null);
  const [selParam2, setSelParam2] = useState(null);
  const [randomState, setRandomState] = useState(null);

  const checkRun = async (runIdIndex, runIds) => {
    const url = `${API_URL}/check?run_id=${runIds[runIdIndex]}`;
    const response = await fetch(url);

    const json = await response.json();

    if (json.finish) {
      if (runIdIndex >= runIds.length - 1) {
        setProgress({
          iteration: json.iter,
          run: runIdIndex,
          runs: runIds.length,
        });
        onFinish(runIds);
        return;
      }
      setTimeout(() => checkRun(runIdIndex + 1, runIds), 200);
    } else {
      setTimeout(() => checkRun(runIdIndex, runIds), 200);
    }

    setProgress({
      iteration: json.iter,
      run: runIdIndex,
      runs: runIds.length,
    });
  };

  const startRuns = async () => {
    const url = `${API_URL}/run?&l=${l}&init=${init}&stop_confluence=${stopConfluence}&runs=${runs
    }&sel_type=${selType}&estim=${estim
    }&n=${n}&title=${title}&px=${px}&random_state=${randomState || 0}&use_mutation=${+!!useMutation
    }&save_pair=${+!!params.pair}&sigma=${sigma}&const_1=${const_1}&const_2=${const_2}
    &sel_param1=${selParam1 || 0}&sel_param2=${selParam2 || 0}&maxN=${maxN}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!!json.length) {
      setTimeout(() => checkRun(0, json), 100);
    }
  };

  return (
    <div className="runForm">
      <h1>
        Налаштування запуску
      </h1>
      <div>
        <label>
          Назва прогону
        </label>
        <input type="text" value={title} onChange={value => {
          makeHandler(setTitle)(value);
        }} placeholder="Назва"/>
      </div>
      <div>
        <label>
          Довжина індивідума
        </label>
        <input type="number" value={l} onChange={value => {
          makeHandler(setL)(value);
        }} placeholder="Довжина"/>
      </div>
      <div>
        <label>
          Кількість особин
        </label>
        <input type="number" value={n} onChange={value => {
          makeHandler(setN)(value);
        }} placeholder="Кількість"/>
      </div>
      <div>
        <label>
          Ітерацій
        </label>
        <input type="number" value={maxN} onChange={value => {
          makeHandler(setMaxN)(value);
        }} placeholder="Ітерацій"/>
      </div>
      <div>
        <label>
          Псевдо-випадковий генератор
        </label>
        <input type="number" value={randomState} onChange={value => {
          makeHandler(setRandomState)(value);
        }} placeholder="Число"/>
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
      {estim === 'sigma' && (
        <div>
          <label>
            Дельта (сігма)
          </label>
          <input type="number" min={1} max={20} step={1} onChange={value => {
            makeHandler(setSigma)(value);
          }} value={sigma}/>
        </div>
      )}
      {estim === 'two_const' && (
        <>
          <div>
            <label>
              Константа 1
            </label>
            <input type="number" onChange={value => {
              makeHandler(setConst1)(value);
            }} value={const_1}/>
          </div>
          <div>
            <label>
              Константа 2
            </label>
            <input type="number" onChange={value => {
              makeHandler(setConst2)(value);
            }} value={const_2}/>
          </div>
        </>
      )}
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
      {(selType === 'tournament' || selType === 'tournament_without_return_gen') && (
        <div>
          <label>
            Параметр турніру
          </label>
          <input type="number" onChange={value => {
            makeHandler(setSelParam1)(value);
          }} value={selParam1} placeholder="2/4/8/12/16"/>
        </div>
      )}
      {selType === 'linear_rang' && (
        <div>
          <label>
            Параметр B
          </label>
          <input type="number" onChange={value => {
            makeHandler(setSelParam1)(value);
          }} value={selParam1} placeholder="1 < B < 2"/>
        </div>
      )}
      {selType === 'not_linear_rang' && (
        <>
          <div>
            <label>
              Параметр B
            </label>
            <input type="number" onChange={value => {
              makeHandler(setSelParam1)(value);
            }} value={selParam1} placeholder="0 < a < b"/>
          </div>
          <div>
            <label>
              Параметр a
            </label>
            <input type="number" onChange={value => {
              makeHandler(setSelParam2)(value);
            }} value={selParam2} placeholder="0 < a < b"/>
          </div>
        </>
      )}
      {selType === 'exp_rang' && (
        <div>
          <label>
            Параметр с
          </label>
          <input type="number" onChange={value => {
            makeHandler(setSelParam1)(value);
          }} value={selParam1} placeholder="0 < c < 1"/>
        </div>
      )}
      {selType === 'cutting_selection' && (
        <div>
          <label>
            Кількість тих хто проходить
          </label>
          <input type="number" onChange={value => {
            makeHandler(setSelParam1)(value);
          }} value={selParam1} placeholder="T"/>
        </div>
      )}
      {selType === 'roulette_linear' && (
        <div>
          <label>
            Параметр a
          </label>
          <input type="number" onChange={value => {
            makeHandler(setSelParam1)(value);
          }} value={selParam1} placeholder="a > 0"/>
        </div>
      )}
      {selType === 'roulette_power' && (
        <div>
          <label>
            Параметр k
          </label>
          <input type="number" onChange={value => {
            makeHandler(setSelParam1)(value);
          }} value={selParam1} placeholder="k приблизно 1"/>
        </div>
      )}
      {selType === 'roulette_sigma' && (
        <div>
          <label>
            Параметр c
          </label>
          <input type="number" onChange={value => {
            makeHandler(setSelParam1)(value);
          }} value={selParam1} placeholder="[1, 5]"/>
        </div>
      )}
      <div>
        <label>
          Зупинка після збіжності
        </label>
        <input type="checkbox" checked={stopConfluence} onChange={() => setStopConfluence(!stopConfluence)}/>
      </div>
      <div>
        <label>
          Застосувати мутацію
        </label>
        <input type="checkbox" checked={useMutation} onChange={() => setUseMutation(!useMutation)}/>
      </div>
      {useMutation && (
        <div>
          <label>
            Коеф мутації
          </label>
          <input type="number" placeholder="Number of runs" onChange={value => {
            makeHandler(setPx)(value);
          }} value={px}/>
        </div>
      )}
      <div>
        <label>
          Кількість прогонів
        </label>
        <input type="number" min={1} max={10} step={1} placeholder="Number of runs" onChange={value => {
          makeHandler(setRuns)(value);
        }} value={runs}/>
      </div>
      {/*<div>*/}
      {/*  -------------------------------------*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  Обрахування значень*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <label>*/}
      {/*    Попарні відстані між особинами (попарна, до ідеального, до дикого типу)*/}
      {/*  </label>*/}
      {/*  <input type="checkbox" value={params.pair} onChange={() => setParams({*/}
      {/*    ...params,*/}
      {/*    pair: !params.pair*/}
      {/*  })}/>*/}
      {/*</div>*/}
      <div className="bottomMenu">
        <div>
          <button onClick={startRuns}>
            Запустити прогони
          </button>
          <br/>
          <button onClick={openArchive}>
            Исторія прогонів
          </button>
        </div>
        <div className="progress-b">

          {progress.iteration ? (
            <>
              <div>
                Ітерація: {progress.iteration+1} з {maxN}
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
