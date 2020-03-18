import React, {useEffect, useState} from 'react';
import './App.css';
import {Bar} from "react-chartjs-2";

const SEL_TYPES = [
  {val: 'rws', label: 'Roulette'},
  {val: 'tournament_2', label: 'Tournament 2'},
  {val: 'tournament_4', label: 'TOurnament 4'},
];

const USERS = [
  {user: 'postgres', password: '123123Aa', table: 'task_2_variant_2'},
  {user: 'misha', password: 'thesis_misha', table: 'task2_full_gcloud_v1'},
];

const DYNAMIC_L_TYPES = [
  {value: 'type_1', label: 'Type 1 (first 10 steps **2)'},
  {value: 'type_2', label: 'Type 2 (first 80 steps *1.1)'},
  {value: 'type_3', label: 'Type 3 (*1.005)'},
  {value: 'type_4', label: 'Type 4 (+1 by 2000)'},
  {value: 'type_3_init_200', label: 'Type 3 (*1.005), init size 200'},
];

const RUN_IDS = [0, 1, 2, 3, 4];

const NS = [10, 20, 80, 100, 200, 800, 1000];
const VARIANTS = [1, 2];
const LS = [10, 20, 80, 100, 200, 800, 1000];

const API_URL = 'https://thesis-charts-server.herokuapp.com/charts';
// const API_URL = 'http://localhost:3000/charts';

const MAP_VARIANT_USER = {
  1: USERS[1],
  2: USERS[0],
};


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
  const [variant, setVariant] = useState(2);
  const [variants, setVariants ] = useState([]);

  async function fetchData(off) {
    try {
      const { user, password, table } = MAP_VARIANT_USER[variant];
      setLoading(true);
      const response = await fetch(
        `${API_URL}?${variant == 1 ? `n=${n}` : `type=${type}`}&l=${l}&user=${user}&init=${init}&password=${password}&table=${table}&run_id=${runId}&sel_type=${selType}&offset=${off === undefined ? offset : off}&limit=${size}
          `);
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  async function info(){
    const { user, password, table } = MAP_VARIANT_USER[variant];
    const response = await fetch(`${API_URL}/available?user=${user}&password=${password}&table=${table}&variant=${variant}`);
    const json = await response.json();
    console.log(json);
    setVariants(json);
  }

  useEffect(() => {
    info()
  }, [variant]);
  const makeHandler = setter => e => e.persist() || setter(e.target.value);

  return (
    <div className="App">
      <h1>
        Tool to explore generated by genetic algorithm population models
      </h1>
      <table>
        <tr>
          <th colSpan={5}>
            Available data
          </th>
        </tr>
        <tr>
          <th>L</th>
          <th>N|Type</th>
          <th>RUN ID</th>
          <th>SEL TYPE</th>
          <th>INIT</th>
        </tr>
        {variants.map(t => (
          <tr>
            <td>{t.l}</td>
            <td>{t.n || t.size_pop_type}</td>
            <td>{t.run_id}</td>
            <td>{t.sel_type}</td>
            <td>{t.init}</td>
          </tr>
        ))}
      </table>
      <div className="form">
        <div className="cont">
          {/*<select name="db_user" id="db_user_select" defaultValue="" value={user} onChange={e => {*/}
          {/*  e.persist();*/}
          {/*  const us = e.target.value;*/}
          {/*  setUser(us);*/}
          {/*  setPassword(USERS.find(({user}) => user === us).password);*/}
          {/*}}>*/}
          {/*  <option value="" disabled>DB user</option>*/}
          {/*  {USERS.map(user => (*/}
          {/*    <option value={user.user} key={user.user}>{user.user}</option>*/}
          {/*  ))}*/}
          {/*</select>*/}

          {/*<input type="text" name="table" placeholder="table" value={table} onChange={makeHandler(setTable)}/>*/}

        </div>
        <div className="cont2">
          <div>
            <label htmlFor="rws">
              Selection type
            </label>
            <select name="rws" id="rws_select" defaultValue="" value={selType} onChange={makeHandler(setSelType)}>
              <option value="" disabled>Selection type</option>
              {SEL_TYPES.map(opt => (
                <option value={opt.val} key={opt.val}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ls">
              Indv length
            </label>
            <select name="ls" id="ls_select" defaultValue="" value={l} onChange={makeHandler(setL)}>
              <option value="" disabled>indv length (L)</option>
              {LS.map(n => (
                <option value={n} key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="variant">
              Variant (static / dynamic N)
            </label>
            <select name="variant" id="variant_select" defaultValue="" value={variant} onChange={makeHandler(setVariant)}>
              <option value="" disabled>Variant (static\dynamic L)</option>
              {VARIANTS.map(n => (
                <option value={n} key={n}>{n}</option>
              ))}
            </select>
          </div>
          {variant == 1 && (
            <div>
              <label htmlFor="ns">
                N (population size)
              </label>
              <select name="ns" id="ns_select" defaultValue="" value={n} onChange={makeHandler(setN)}>
                <option value="" disabled>pop size (N)</option>
                {NS.map(n => (
                  <option value={n} key={n}>{n}</option>
                ))}
              </select>
            </div>
          )}
          {variant == 2 && (
            <div>
              <label htmlFor="dynamicL">
                Type of L incrementing
              </label>
              <select name="dynamicL" id="dynamicL" defaultValue="" value={type} onChange={makeHandler(setType)}>
                <option value="" disabled>Type of dynamic N</option>
                {DYNAMIC_L_TYPES.map(n => (
                  <option value={n.value} key={n.value}>{n.label}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="run_id">Run id</label>
            <select name="run_id" id="run_id_select" value={runId} defaultValue={0} onChange={makeHandler(setRunId)}>
              {RUN_IDS.map(id => (
                <option value={id} key={id}>{id}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="init">Init type</label>
            <select name="init" id="init_select" value={init} defaultValue="all_0" onChange={makeHandler(setInit)}>
                <option value={'all_0'} >all 0</option>
                <option value={'normal'}>normal</option>
            </select>
          </div>
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
          <button type="button" onClick={() => fetchData()}>
            Process
          </button>
        </div>
      </div>
      <div className="arrows">
        <button
          onClick={() => {
            const back = +offset - +size;
            setOffset(back < 0 ? 0 : back);
            fetchData(back);
          }}
        >
          PREV
        </button>
        <button
          onClick={() => {
            const next = +offset + +size
            setOffset(next);
            fetchData(next);
          }}
        >
          NEXT
        </button>
      </div>
      <div>
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
      <div className="container">
        {loading && (
          <p>Loading...</p>
        )}
        {!loading && data.map((f) => {
          const data = {
            labels: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => i),
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
              {variant === '2' && (
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
    </div>
  );
}

export default App;
