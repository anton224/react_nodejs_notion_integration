import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [name,setName] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [extraInfo,setExtraInfo] = useState("");
  const submitToNotion = () => {
    fetch("http://localhost:4000/submitFormToNotion",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phoneNumber,
        extraInfo
      })
    }).then( response => response.json()).then(data => {
      console.log('fetch Success', data);
    }).catch(err => {
      console.log('Error');
    })
  }

  return (
    <div className="App">
      <div style={{maxWidth: "500px", margin: "0 auto"}}>
        <h1>Enter you info below</h1>
        <p>Name</p>
        <input type="text" id="name" onChange={(e) => setName(e.target.value)}/>
        <p>Phone Number</p>
        <input type="text" id="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)}/>
        <p>Extra Info</p>
        <textarea onChange={(e) => setExtraInfo(e.target.value)} rows={10} cols={25}/>

        <div>
          <button onClick={submitToNotion}>Submit To Notion</button>
        </div>
      </div>
    </div>
  );
}

export default App;
