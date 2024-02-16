import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import OpenAI from "openai";


function App() {
  console.log(process.env);

  // Image generation
  const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI, dangerouslyAllowBrowser: true});
  const [result, setResult] = useState(0);
  const generateImage = async () => {
    const res = await openai.images.generate({
      prompt: 'person',
      n: 1,
      size: "512x512",
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });
  
    setResult(res.data[0].url);
  };

  // Song generation
  const express = require('express')
  const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
  const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const port = 4000
  var app = express();

  useEffect(() => { // syntax for running only once
    // API access token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': "application/x-www-form-urlencoded"
      }
      body: 'grant_type'
    }
    fetch("https://accounts.spotify.com/api/token")


  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={generateImage}>Generate an Image</button>
        {result.length > 0 ? (
          <img className="result-image" src={result} alt="result" />
        ) : (
          <></>
        )}
        
      </header>
    </div>
  );
}

export default App;
