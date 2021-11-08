import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";

function App() {

  const [username, setUsername] = useState("");
  const [gameDataList, setGameDataList] = useState([])

  useEffect(() => {
    Axios.get("https://aeroplay.herokuapp.com/api/get").then((response) => {
      setGameDataList(response.data);
    });
  });

  const submitUsername = () => {
    Axios.post("https://aeroplay.herokuapp.com/api/user", {
      username: username
    }).then(() => {
      alert("successful insert")
    })
  };

  function getGlobalStats(data) {
    let total_score = 0;
    let total_balloons_popped = 0;
    let total_accuracy = 0;
    let total_boosts = 0;
    let max_score = 0;
    let max_balloons_popped = 0;
    let max_accuracy = 0;
    for (let item in data) {
      total_score += data[item].score;
      total_balloons_popped += data[item].balloons_popped;
      total_accuracy += data[item].shot_accuracy;
      total_boosts += data[item].boosts_used;
      if (data[item].score > max_score) {
        max_score = data[item].score; 
      }
      if (data[item].balloons_popped > max_balloons_popped) {
        max_balloons_popped = data[item].balloons_popped;
      }
      if (data[item].shot_accuracy > max_accuracy) {
        max_accuracy = data[item].shot_accuracy;
      }
    }
    return [`Maximum Score: ${max_score}`,`Average Score: ${(total_score/data.length).toFixed(2)}`,`Maximum Balloons Popped: ${max_balloons_popped}`,`Total Balloons Popped: ${total_balloons_popped}`,`Average Balloons Popped: ${(total_balloons_popped/data.length).toFixed(2)}`,`Maximum Shot Accuracy: ${max_accuracy.toFixed(2)}`,`Average Shot Accuracy: ${(total_accuracy/data.length).toFixed(2)}`,`Total Boosts: ${total_boosts}`]
  }
/*
<label>Search Name</label>
<input type="text" name="usernameSearch" onChange = {(e) => {
  setUsername(e.target.value)
}}/>
*/
<button onClick={ submitUsername }></button>
  return (
    <div className="App">
      <div className="aeroplayHeader">
        <h1>Aeroplay</h1>
      </div>
      <div className="searchPlayer">
        <label>Search Player:</label>
        <input type="text" placeholder="Player Name"></input>
      </div>
      <div className="dataSection">
        <div className="globalData">
          <h3>Global Statistics</h3>
          {getGlobalStats(gameDataList).map((value) => {
            return (
              <table>
                <tr>
                  <td>{value}</td>
                </tr>
              </table>
            )
          })}
        </div>
        <div className="dataTable">
          <table>
            <tr>
                <th>Username</th>
                <th>Score</th>
                <th>Balloons Popped</th>
                <th>Shot Accuracy</th>
                <th>Boosts Used</th>
            </tr>
          {gameDataList.map((value) => {
            return (
            <tr>
              <td>{value.username}</td>
              <td>{value.score}</td>
              <td>{value.balloons_popped}</td>
              <td>{value.shot_accuracy}</td>
              <td>{value.boosts_used}</td>
            </tr>
            )
          })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
