import React from "react";
import { Line} from "react-chartjs-2";

const defaultOpt = {
  backgroundColor: 'transparent',
  borderWidth: 2,
  pointRadius: 2,
  pointBorderWidth: 3,
};

const RunFullInfo = ({ runInfo }) => {
  if(!runInfo){
    return;
  }

  const labels = new Array(runInfo.length).fill(0).map((_,i) => i);

  return(
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
      <div style={{background: 'white', marginTop: '20px'}}>
        <Line
          data={{
            labels,
            datasets: [{
              ...defaultOpt,
              label: 'Середнє здоров\'я',
              borderColor: '#7a0f0a',
              data: runInfo.map(run => run.mean_health)
            }, {
              ...defaultOpt,
              label: 'Найкраще здоров\'я',
              borderColor: '#a07e25',
              data: runInfo.map(run => run.best_health)
            }],
          }}
          options={{
            animations: {
              tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
              }
            },
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: (runInfo[0] || {}).l,
                }
              }]
            }
          }}
        />
      </div>
      <div style={{background: 'white', marginTop: '20px'}}>
        <Line
          data={{
            labels,
            datasets: [{
              ...defaultOpt,
              label: runInfo.estim === 'all_l' ? 'Кількість копій 0..0' : 'Кількість копій найкращого індивідуума',
              borderColor: '#03127a',
              data: runInfo.map(run => {
                if(run.estim === 'all_l'){
                  return run.genotype.filter(h => h !== 0).length;
                }else{
                  return run.amount_bests;
                }
              })
            }, {
              ...defaultOpt,
              label: 'Кількість особин які пройшли в батьківський пул',
              borderColor: '#00a01b',
              data: runInfo.map(run => run.taken_to_next)
            },
              {
                ...defaultOpt,
                label: 'Кількість особин які не пройшли в батьківський пул',
                borderColor: '#a00097',
                data: runInfo.map(run => run.n - run.taken_to_next)
              }],
          }}
          options={{
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: (runInfo[0] || {}).n,
                }
              }]
            }
          }}
        />
      </div>
      <div style={{background: 'white', marginTop: '20px'}}>
        <Line
          data={{
            labels,
            datasets: [{
              ...defaultOpt,
              label: 'Різниця середнього здоров\'я',
              borderColor: '#006b7a',
              data: runInfo.map(run => run.diff_prev)
            }, {
              ...defaultOpt,
              label: 'Інтенсивність росту',
              borderColor: '#7a751e',
              data: runInfo.map(run => run.intensity_prev)
            },
              {
                ...defaultOpt,
                label: 'Швидкість росту',
                borderColor: '#3d04a0',
                data: runInfo.map(run => run.diff_prev_amount_bests)
              }],
          }}
          options={{
            scales: {
              yAxes: [{
                display: true,
                ticks: {
                  suggestedMin: -2,
                  suggestedMax: 5,
                }
              }]
            }
          }}
        />
      </div>
      </div>
  )
};

export default RunFullInfo;
