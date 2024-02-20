import logo from './logo.svg';
import { useEffect, useState } from "react";
import LoadImage2 from "./components/LoadImage2";
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
    localStorage.clear();

    if(window.location.hash) {
      params = getAccessToken(window.location.hash);
    }
  });

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

  const [artists, setArtists] = useState([]);

  async function search() {

    // Search for top 50 songs
    var playlist = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + params.access_token
      }
    });

    const data = await playlist.json();
    setArtists(data.items);
    console.log("Data: ");
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
        console.log(localStorage.getItem(i));
    }

    //for (let i = 0; i < 6; i++){
    //  console.log(JSON.stringify(artists[rand[i]]));
    //  localStorage.setItem(String(i), JSON.stringify(artists[rand[i]]));
    //}

    //for (let i = 0; i < 6; i++){
    //  console.log(localStorage.getItem(String(i)));
    //}
  }

  //async function aiPicture() {
  //  // Get six unique random pictures; pick one (rand[0]) to make AI cover
  //  var rand = [];

  //  for (let i = 0; i < 6; i++){
  //    var curr = Math.floor(Math.random() * 50);

  //    while (rand.includes(curr)) {
  //      curr = Math.floor(Math.random() * 50);
  //    }

  //    rand.push(curr);
  //  }

  //  // Generate image
  //  var album = artists[rand[0]]["album"]["name"];
  //  var song = artists[rand[0]]["name"];
  //  var artist_arr = artists[rand[0]]["artists"];

  //  var artist = "";
  //  for (let i = 0; i < artist_arr.length; i++){
  //    artist += artist_arr[i]["name"] + ", ";
  //  }

  //  const res = await openai.images.generate({
  //    model: "dall-e-3",
  //    style: "vivid",
  //    //prompt: 'Album cover as similar to the song: ' + song + ", by " + artist + "in the album " + album + " as possible.",
  //    prompt: 'Album cover as similar to the album ' + album + ', and the song ' + song + ", by "+ artist + "as possible. NO WORDS.",
  //    n: 1,
  //    size: "1024x1024"
  //  });
  //  setResult(res.data[0].url);
  //  console.log("song: ", song) 
  //}

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
        {/*<LoadImage2 />*/}
        
      </header>
    </div>
  );
}

export default App;
