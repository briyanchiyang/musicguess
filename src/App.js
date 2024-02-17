import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import OpenAI from "openai";

const open_ai_key = process.env.REACT_APP_OPENAI
const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
const redirect_uri = "http://localhost:3000/auth/callback"

function App() {
  console.log(process.env);
  console.log(spotify_client_id)

  // Image generation
  const openai = new OpenAI({apiKey: open_ai_key});
  const [result, setResult] = useState(0);

  const generateImage = async () => {
    const res = await openai.images.generate({
      prompt: 'person',
      n: 1,
      size: "512x512",
    });

    setResult(res.data[0].url);
  };


  // Song generation
  const [accessToken, setAccessToken] = useState("");

  const login = () => {
    // Auth request
    var url = "https://accounts.spotify.com/authorize"; // Base url
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(spotify_client_id);
    //url += '&scope=' + encodeURIComponent(["user-top-read"]);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    //url += '&state=' + encodeURIComponent(state);
    window.location = url;

  }

  //useEffect(() => { // syntax for running only once
  //  // API access token
  //  var authParameters = {
  //    method: 'POST',
  //    headers: {
  //      'Content-Type': "application/x-www-form-urlencoded"
  //    },

  //    // Boilerplate for passing client id and secret
  //    body: 'grant_type=client_credentials&client_id=' + spotify_client_id + '&client_secret=' + spotify_client_secret
  //  }
  //  fetch("https://accounts.spotify.com/api/token", authParameters)
  //    .then(result => result.json())
  //    .then(data => setAccessToken(data.access_token)) // !!error handling!!
  //}, [])


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
        <button>Generate an Image</button>
        <button onClick={login}>Login to Spotify!</button>
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
