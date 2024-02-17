import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import OpenAI from "openai";

const open_ai_key = process.env.REACT_APP_OPENAI
const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
const redirect_uri = "http://localhost:3000/auth/callback"

const openai = new OpenAI({apiKey: open_ai_key, dangerouslyAllowBrowser: true});

// Get response query params for subsequent calls
// http://localhost:3000/auth/callback#access_token=BQDKGqrNHIbFuKM7DFKAl-gpAHNuqD5qjSgmKSqZdjEubk_84XwkQIT6FSkggfCUxk2t8lAyVKKEO9lAtoZwR8kSYIrbBus0QpByv81kcZxzfZcPn7w9zJJR_zBjmZ5QKlQ2D1LES4qRuuAH0UaJF4lrDD0XKdjxDubWGfMXrA&token_type=Bearer&expires_in=3600

const getAccessToken = (hash) => {
  const param_string = hash.substring(1).split("&");
  const params = new Map();

  for (let i = 0; i < param_string.length; i++){
    const [key, val] = param_string[i].split("=");
    params[key] = val;
  }
  return params;
}


function App() {
  var params = [];
  useEffect(() => {
    if(window.location.hash) {
      params = getAccessToken(window.location.hash);
      console.log("Params2" + params);
    }
  });
  console.log("Params" + params);

  const [result, setResult] = useState(0);

  // Image generation
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
    url += '&scope=' + encodeURIComponent(["user-top-read"]);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    //url += '&state=' + encodeURIComponent(state);
    window.location = url;

  }

  async function search() {
    console.log("Searching", params.access_token);

    var playlist = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + params.access_token
      }
    });

    const data = await playlist.json();
    console.log(data);
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
        <button onClick={search}>Playlist retrieval</button>
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
