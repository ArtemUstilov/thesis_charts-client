import React, {useEffect, useState} from "react";
import "./style.scss";
import {Bar} from "react-chartjs-2";
import {API_URL} from "../../constants";
import {getNamePyParams} from "../../utils";
import RunFullInfo from "../RunFullInfo";


const getChartLabel = (i, dataSliced) => {
  if (i === 0) {
    return 'До відбору';
  }
  const sameIterWithPrev = dataSliced[i - 1].iteration === dataSliced[i].iteration;
  if (!dataSliced[i].use_mutation) {
    if (i % 2 === 1) {
      return 'Після відбору';
    }
    return 'До відбору';
  }
  const sameIterWithNext = (dataSliced[i + 1] || {}).iteration === dataSliced[i].iteration;
  if (sameIterWithPrev && sameIterWithNext) {
    return 'Після мутації';
  }
  if (sameIterWithPrev) {
    return 'Після відбору';
  }
  return 'До відбору';
};

const RunInfo = ({
                   data,
                   loadRun,
                   close,
                   setRunInfoData,
                 }) => {
  const [pageSize, setPageSize] = useState(2);
  const [offset, setOffset] = useState(0);
  const [run, setRun] = useState("default");
  const [available, setAvailable] = useState(null);
  const [chartLen, setChartLen] = useState(0);
  const [chartLen2, setChartLen2] = useState(0);
  const [interval, setIntervalObj] = useState(null);
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  useEffect(() => {
    if (!data || !data.length) {
      return;
    }

    const d = data.slice(offset, 50 + offset);
    let max = 0;
    d.forEach(row => max = Math.max(max, ...row.health));

    let min = Infinity;
    d.forEach(row => min = Math.min(min, ...row.health));


    setChartLen({
      min: Math.max(0, min - 1),
      max: max + 1,
    });

    let max2 = 0;
    d.forEach(row => max2 = Math.max(max2, ...row.genotype));

    let min2 = Infinity;
    d.forEach(row => min2 = Math.min(min2, ...row.genotype));


    setChartLen2({
      min: Math.max(0, min2 - 1),
      max: max2 + 1,
    });
  }, [data, offset]);

  useEffect(() => {
    (async () => {
      const json = await fetch(`${API_URL}/available`);
      const data = await json.json();
      setAvailable(data);
    })();
    if (run !== 'default') {
      loadRun([run])
    }
  }, []);

  useEffect(() => {
    if (run !== 'default') {
      loadRun([run])
    }else{
      setRunInfoData([]);
    }
  }, [run]);

  useEffect(() => {
    if (data && data.length && data[0].use_mutation) {
      setPageSize(3);
    }
  }, [data]);

  const runAnimation = () => {
    setIntervalObj(setInterval(() => {
      setOffset(offset => offset + pageSize);
    }, 500));
  };

  const dataSliced = (data || []).slice(offset, offset + pageSize);

  return (
    <div className="runInfo">
      <div style={{display: 'flex', paddingTop: '10px'}}>
        <button onClick={close} style={{marginRight: '20px'}}>
          Назад
        </button>
        <button onClick={() => setOpenGeneralInfo(!openGeneralInfo)} style={{marginRight: '20px'}}>
          Загальная інформація
        </button>
        <select value={run} name="available" placeholder="Вибрати існуючий" onChange={event => {
          setRun(event.target.value);
        }}>
          <option value="default">прогони</option>
          {available && available.map(a => (
            <option value={a.id} key={a.id}>
              {getNamePyParams(a)}
            </option>
          ))}
        </select>
      </div>
      {openGeneralInfo ? (
        <RunFullInfo runInfo={data}/>
      ) : (
        <>
          {run !== 'default' && (
            <>
              <div style={{display: 'flex', paddingTop: '10px'}}>
                <div style={{margin: '15px', color: 'white'}}>
                  {offset + 1} - {offset + pageSize} графіки
                </div>
                <button onClick={() => offset - pageSize + 1 < 0 ? null : setOffset(offset - pageSize + 1)}>
                  попередня сторінка
                </button>
                <button onClick={() => setOffset(offset + pageSize - 1)}>
                  наступна сторінка
                </button>
                <div style={{marginLeft: '20px'}}>
                  <label htmlFor="size" style={{color: 'white', display: 'block'}}>Графіків на сторінці</label>
                  <input name="size" type="number" value={pageSize} onChange={e => {

                    setPageSize(+e.target.value);
                    setOffset(0);
                  }}/>
                </div>
                {!interval ? (
                  <button onClick={runAnimation}>
                    автоматично
                  </button>
                ) : (
                  <button onClick={() => {
                    clearInterval(interval);
                    setIntervalObj(null);
                  }} style={{backgroundColor: 'red'}}>
                    зупинити
                  </button>
                )}
              </div>
              <div className="runInfo_container">
                {dataSliced.map((f, i) => {
                  const {min = 0, max = 0} = chartLen || {};
                  const {min: min2 = 0, max: max2 = 0} = chartLen2 || {};

                  const dataset = new Array(max - min).fill(0);
                  f.health.forEach(h => {
                    dataset[h - min] += 1;
                  });
                  const dataset2 = new Array(max2 - min2).fill(0);
                  f.genotype.forEach(h => {
                    dataset2[h - min2] += 1;
                  });
                  const data = {
                    labels: Array(max - min + 1).fill(1).map((_, i) => i + min),
                    labels2: Array(max2 - min2 + 1).fill(1).map((_, i) => i + min2),
                    datasets: [
                      {
                        label: 'К-ть особин із таким здоров\'ям',
                        borderColor: '#68f056',
                        borderWidth: 1,
                        backgroundColor: '#008000',
                        data: dataset,
                      },
                      {
                        label: 'Розподіл',
                        borderColor: '#f07a57',
                        borderWidth: 1,
                        backgroundColor: '#80231c',
                        data: dataset2,
                      },
                    ],
                  };

                  return (
                    <div key={f.id} className="chart">
              <span className="label">
                {getChartLabel(i, dataSliced)}
              </span>
                      <span className="iteration">
                i: {f.iteration}
              </span>
                      <Bar
                        data={{
                          ...data,
                          datasets: [data.datasets[0]],
                        }}
                        legend={{
                          display: false,
                        }}
                        options={{
                          animation: false,
                          scales: {
                            yAxes: [{
                              display: true,
                              ticks: {
                                suggestedMin: 0,
                                suggestedMax: f.n/5,
                              }
                            }]
                          }
                        }}
                        width={100}
                        height={30}
                      />
                      <Bar
                        data={{
                          labels: data.labels2,
                          datasets: [data.datasets[1]],
                        }}
                        legend={{
                          display: false,
                        }}
                        options={{
                          animation: false,
                          scales: {
                            yAxes: [{
                              display: true,
                              ticks: {
                                suggestedMin: 0,
                                suggestedMax: f.n/5,
                              }
                            }]
                          }
                        }}
                        width={100}
                        height={30}
                      />
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RunInfo;
