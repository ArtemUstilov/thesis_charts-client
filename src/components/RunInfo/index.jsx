import React, {useEffect, useState} from "react";
import "./style.scss";
import {Bar} from "react-chartjs-2";
import {API_URL} from "../../constants";


const RunInfo = ({
                   data,
                   chart,
                   loadRun,
                 }) => {
  const [chartLen, setChartLen] = useState(null);
  const [available, setAvailable] = useState(null);
  useEffect(() => {
    if (!data || !data.length) {
      return;
    }

    setChartLen(data[0].ideal_hamming_distribution_p.length);
  }, [data]);
  console.log(chart)
  useEffect(() => {
    (async () => {
      const json = await fetch(`${API_URL}/available`);
      const data = await json.json();
      setAvailable(data);
    })();
  }, []);
  return (
    <div>
      <select name="available" placeholder="Вибрати існуючий" onClick={event => {
        console.log(event.target.value)
        loadRun([event.target.value])
      }}>
        {available && available.map(a => (
          <option value={a.id} key={a.id}>
            {a.id}
          </option>
        ))}
      </select>
      {chart && (
        <div>
          <img src={'data:image/png;base64,' + chart} alt=""/>
        </div>
      )}
      <div className="runInfo">
        {(data || []).map((f) => {
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
            <div key={f.iteration} className="chart">
              <span className="iteration">
                {f.iteration}
              </span>
              <span className="pop_size">
                  {f.n}
                </span>
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
};

export default RunInfo;
