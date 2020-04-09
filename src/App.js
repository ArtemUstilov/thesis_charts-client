import React, {useEffect, useState} from 'react';
import {Bar} from "react-chartjs-2";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './App.css';

const SEL_TYPES = [
  {val: 'rws', label: 'Roulette'},
  {val: 'tournament_2', label: 'Tournament 2'},
  {val: 'tournament_4', label: 'TOurnament 4'},
];

const USERS = [
  {user: 'postgres', password: '123123Aa', table: 'task_2_variant_2', tableInfo: 'task_2_variant_2'},
  {user: 'misha', password: 'thesis_misha', table: 'task2_full_gcloud_v1', tableInfo: 'task2_v2_tmp'},
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


const VARIANTS = [{value: 1, label: 'static population size'}, {value: 2, label: 'dynamic population size'}];

const API_URL = 'https://thesis-charts-server.herokuapp.com/charts';
// const API_URL = 'http://localhost:3000/charts';

const MAP_VARIANT_USER = {
  1: USERS[1],
  2: USERS[0],
};

const format = val => (val || '').toString().replace(/\s/g, '');

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [n, setN] = useState(null);
  const [l, setL] = useState(10);
  const [selType, setSelType] = useState(SEL_TYPES[0].val);
  const [runId, setRunId] = useState(0);
  const [offset, setOffset] = useState(0);
  const [init, setInit] = useState("all_0");
  const [size, setSize] = useState(100);
  const [type, setType] = useState(null);
  const [estim, setEstim] = useState(null);
  const [variant, setVariant] = useState(2);
  const [variants, setVariants] = useState([]);
  const [line, setLine] = useState(null);
  const [isNew, setIsNew] = useState(null);
  const [chartLen, setChartLen] = useState(10);

  const [details, setDetails] = useState(null);

  async function fetchData(off) {
    try {
      const {user, password, table} = MAP_VARIANT_USER[variant];
      setLoading(true);
      const response = await fetch(
        `${API_URL}?${variant == 1 ? `n=${n}` : `type=${type}`}&l=${l}&user=${user}&init=${init}&password=${password}&table=${table}&run_id=${runId}&sel_type=${selType}&offset=${off === undefined ? offset : off}&limit=${size}
          `);
      const json = await response.json();
      const max = json.length && json.reduce((ac, el) => {
        let m;
        for (let i = el.ideal_hamming_distribution_p.length - 1; i >= 0; i--) {
          const we = el.ideal_hamming_distribution_p[i];
          if (we === 0) {
            continue;
          }

          m = i + 3;
        }

        return m > ac ? m : ac;
      }, 0);

      setChartLen(Math.max(max, 10));

      setData(json);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  async function fetchDetails() {
    try {
      const {user, password, table} = MAP_VARIANT_USER[variant];
      setLoading(true);
      const response = await fetch(
        `${API_URL}/run_details?${variant == 1 ? `n=${n}` : `type=${type}`}&l=${l}&user=${user}&init=${init}&password=${password}&table=${table}&run_id=${runId}&sel_type=${selType}&estim=${estim}`);
      const json = await response.json();
      console.log(json)
      setDetails(json[0].data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  async function info() {
    const {user, password, tableInfo} = MAP_VARIANT_USER[variant];
    const response = await fetch(`${API_URL}/available?user=${user}&password=${password}&table=${tableInfo}&variant=${variant}`);
    const json = await response.json();

    setVariants(json);
  }

  useEffect(() => {
    info()
  }, [variant]);
  const makeHandler = setter => e => e.persist() || setter(e.target.value);
  console.log(details)
  return (
    <div className="App">
      <h1>
        Tool to explore generated by genetic algorithm population models
      </h1>
      <div className="header_select form-group">
        <label htmlFor="variant">
          Variant
        </label>
        <select name="variant" id="variant_select" defaultValue="" value={variant} onChange={value => {
          makeHandler(setVariant)(value);
          setData([]);
          setVariants([]);
        }}>
          <option value="" disabled>Variant (static\dynamic L)</option>
          {VARIANTS.map(n => (
            <option value={n.value} key={n.value}>{n.label}</option>
          ))}
        </select>
      </div>
      <div className="container_form">
        <div className="table">
          <table>
            <thead>
            <tr>
              <th colSpan={7}>
                Available data (Click on any row, type offset and size and press Show to see this model)
              </th>
            </tr>
            <tr>
              <th>L</th>
              <th>N|Type</th>
              <th>RUN ID</th>
              <th>SEL TYPE</th>
              <th>INIT</th>
              <th>HEALTH FUNC</th>
              <th>IS NEW</th>
            </tr>
            </thead>
            <tbody>
            {variants.map((t, ind) => (
              <tr onClick={() => {
                setL(format(t.l));
                setN(format(t.n));
                setType(format(t.size_pop_type));
                setSelType(format(t.sel_type));
                setRunId(t.run_id);
                setInit(format(t.init));
                setEstim(format(t.estim));
                setLine(ind);
                setIsNew(t.is_new);
              }}
                  data-selected={ind === line}
              >
                <td>{t.l}</td>
                <td>{t.n || (DYNAMIC_L_TYPES.find(g => g.value === format(t.size_pop_type)) || {}).label}</td>
                <td>{t.run_id}</td>
                <td>{t.sel_type}</td>
                <td>{t.init}</td>
                <td>{t.estim}</td>
                <td>{t.is_new}</td>
              </tr>
            ))}
            {!variants.length && (
              <tr>
                <td colSpan={5} style={{textAlign: 'center'}}>
                  Loading...
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>

        <div className="form">
          <div>
            <label htmlFor="offset">
              Offset
            </label>
            <input type="text" name="offset" placeholder="offset" value={offset} onChange={makeHandler(setOffset)}/>
          </div>
          <div>
            <label htmlFor="size">
              Size
            </label>
            <input type="text" name="size" placeholder="size" value={size} onChange={makeHandler(setSize)}/>
          </div>
          <Button type="button" className="process" onClick={() => fetchData()} disabled={line === null}>
            Show
          </Button>
        </div>
        <Button
          type="button"
          className="process"
          onClick={fetchDetails}
          disabled={line === null}>
          Show Details
        </Button>
      </div>

      {details && (
        <div>
          <img src={'data:image/png;base64,'+details} alt=""/>
        </div>
      )}
      {data && data.length ? (
        <>
          <div className="arrows">
            <Button
              onClick={() => {
                const back = +offset - +size;
                setOffset(back < 0 ? 0 : back);
                fetchData(back);
              }}
            >
              {'<<<'}
            </Button>
            <Button
              onClick={() => {
                const next = +offset + +size
                setOffset(next);
                fetchData(next);
              }}
            >
              {'>>> '}
            </Button>
          </div>
          <div className="datatypes">
            <div className="datatype">
              <span className="green"/>
              <span>-----wild_type_hamming_distribution</span>
            </div>
            <div className="datatype">
              <span className="blue"/>
              <span>-----pairwise_hamming_distribution</span>
            </div>
            <div className="datatype">
              <span className="red"/>
              <span>-----ideal_hamming_distribution</span>
            </div>
          </div>
        </>
      ) : null
      }

      <div className="container">
        {loading && (
          <p style={{textAlign: 'center'}}>Loading...</p>
        )}
        {!loading && data.map((f) => {
          const data = {
            labels: Array(chartLen).fill(1).map((_, i) => i),
            datasets: [
              {
                label: 'pairwise_hamming_distribution_p',
                borderColor: '#00F',
                borderWidth: 1,
                data: f.pairwise_hamming_distribution_p
              },
              {
                label: 'ideal_hamming_distribution_p',
                borderColor: '#F00',
                borderWidth: 1,
                data: f.ideal_hamming_distribution_p
              },
              {
                label: 'wild_type_hamming_distribution_p',
                borderColor: '#0F0',
                borderWidth: 1,
                data: f.wild_type_hamming_distribution_p
              },
            ],
          };
          return (
            <div key={f.id} className="chart">
              <span className="iteration">
                {f.iteration}
              </span>
              {variant == '2' && (
                <span className="pop_size">
                  {f.n}
                </span>
              )}
              <Bar
                data={{
                  ...data,
                  datasets: [data.datasets[0]],
                }}
                legend={{
                  display: false,
                }}
                width={100}
                height={45}
              />
              <Bar
                data={{
                  ...data,
                  datasets: [data.datasets[1]],
                }}
                legend={{
                  display: false,
                }}
                width={100}
                height={45}
              />
              <Bar
                data={{
                  ...data,
                  datasets: [data.datasets[2]],
                }}
                legend={{
                  display: false,
                }}
                width={100}
                height={45}
              />
            </div>
          )
        })}
      </div>
      {
        data && data.length ? (
          <div className="arrows">
            <Button
              onClick={() => {
                const back = +offset - +size;
                setOffset(back < 0 ? 0 : back);
                fetchData(back);
              }}
            >
              {'<<<'}
            </Button>
            <Button
              onClick={() => {
                const next = +offset + +size
                setOffset(next);
                fetchData(next);
              }}
            >
              {'>>> '}
            </Button>
          </div>
        ) : null
      }
    </div>
  );
}

export default App;
