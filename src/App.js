import logo from './logo.svg';
import { useEffect, useState } from "react";
import LoadImage2 from "./components/LoadImage2";
import Choices from "./components/Choices";
import './App.css';
import OpenAI from "openai";

const open_ai_key = process.env.REACT_APP_OPENAI
const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
const redirect_uri = "http://localhost:3000/auth/callback"

const openai = new OpenAI({apiKey: open_ai_key, dangerouslyAllowBrowser: true});


// Get response query params for subsequent calls
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
  // Spotify authentication request
  const [access, getAccess] = useState(false);
  useEffect(() => {
    localStorage.clear();

    if(window.location.hash) {
      // Get token for API call
      params = getAccessToken(window.location.hash);
      getAccess(true);
    }
  });

  const login = () => {
    // Auth request
    var url = "https://accounts.spotify.com/authorize"; // Base url
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(spotify_client_id);
    url += '&scope=' + encodeURIComponent(["user-top-read"]);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    window.location = url;
  }

const [started, startGame] = useState(false);
const [gameCounter, setGameCounter] = useState(0);

async function search() {
  // Search for top 50 songs
  console.log("adfadsf");
  var playlist = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + params.access_token
    }
  });

  const data = await playlist.json();
  console.log(data);

  // Get six unique random pictures, store for component usage
  var rand = [];

  for (let i = 0; i < 6; i++){
      var curr = Math.floor(Math.random() * 50);

      while (rand.includes(curr)) {
        curr = Math.floor(Math.random() * 50);
      }

      rand.push(curr);
      localStorage.setItem(i, JSON.stringify(data.items[curr]));
  }

  // Out of the six, pick one that is the correct image
  var correct_song_id = Math.floor(Math.random() * 6);
  localStorage.setItem("correct_song_id", correct_song_id);

  startGame(true);
  setGameCounter(gameCounter + 1);
}


  return (
    <div className="App">
      <header className="App-header">
        {started == false ? (
          <>
          <h1>Music Musings</h1>
          <div className="desc">
            <p>I love listening to music, and thought it'd be interesting to share my music tastes through a game. There will be six songs that I listen to to choose from. A DALL-E generated image and a GPT-4-generated clue will appear that is inspired by one of the six songs. Guess which one is correct!</p>
            <p>Disclaimer: the quotes aren't really representative of the actual lyrics since they're AI-generated.</p>
          </div>
          <button className= "btn" onClick={login}>Login to (my) Spotify! {access == true ? (<>(done!)</>) : (<></>)}</button>
          </>) : (<></>)}

        <button className= "btn" id="start" onClick={search}>
            {started == false ? (<>Start game!</>) : (<>Next round <span>&#8680;</span> </>) }
        </button>
        <LoadImage2 started={started}/>
        <Choices started={started}/>
      </header>
    </div>
  );
}

export default App;
