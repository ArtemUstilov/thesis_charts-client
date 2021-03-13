import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RunForm from "./components/RunForm";
import RunInfo from "./components/RunInfo";
import {API_URL} from "./constants";

function App() {
  const [runInfoData, setRunInfoData] = useState([]);
  const [chart, setChart] = useState(null);

  const [archive, setArchive] = useState(false);

  const fetchRunInfoData = async ids => {
    const response = await fetch(`${API_URL}/info?run_id=${ids[0]}`);
    // const chartResponse = await fetch(`${API_URL}/chart?run_id=${ids[0]}`);
    const json = await response.json();
    setRunInfoData(json);
    // const chartJson = await chartResponse.json();
    // setChart(chartJson.data);
  };

  return (
    <div className="App">
      {archive ? (
        <RunInfo data={runInfoData} chart={chart} setRunInfoData={setRunInfoData} loadRun={fetchRunInfoData} close={() => setArchive(false)}/>
      ) : (
        <RunForm onFinish={fetchRunInfoData} openArchive={() => setArchive(true)}/>
      )}
    </div>
  );
}

export default App;
