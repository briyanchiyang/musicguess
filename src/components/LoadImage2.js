import React, { useEffect, useState } from "react";
import OpenAI from "openai";
import loadingScreen from "./loadingScreen.jpg";

const open_ai_key = process.env.REACT_APP_OPENAI
const openai = new OpenAI({apiKey: open_ai_key, dangerouslyAllowBrowser: true});

const LoadImage2 = () => {
    //const [artist_info, setArtistInfo] = useState([]);
    const [result, setResult] = useState(0);
    const [start, isStarting] = useState(0);

    useEffect(() => {
        async function generate() {
            isStarting(1); // 1: component has started but image has not generated yet

            const res = await openai.images.generate({
                model: "dall-e-3",
                style: "vivid",
                //prompt: 'Album cover as similar to the song: ' + song + ", by " + artist + "in the album " + album + " as possible.",
                prompt: 'Album cover as similar to the album ' + album + ', and the song ' + song + ", by "+ artist + "as possible. NO WORDS.",
                n: 1,
                size: "1024x1024"
            });
            setResult(res.data[0].url);
            console.log('Album cover as similar to the album ' + album + ', and the song ' + song + ", by "+ artist + "as possible. NO WORDS.",);
        }

        if (localStorage.hasOwnProperty("correct_song_id")){
            var correct_song_id = parseInt(localStorage.getItem("correct_song_id"));

            var artist_info = JSON.parse(localStorage.getItem(correct_song_id));

            var album = artist_info["album"]["name"];
            var song = artist_info["name"];
            var artist_arr = artist_info["artists"];

            var artist = "";
            for (let i = 0; i < artist_arr.length; i++){
                artist += artist_arr[i]["name"] + ", ";
            }

            generate();
        }
    });

    return (
        <>
        {start == 1 ? (<>
            {result.length > 0 ? (<img className="result-image" src={result} alt="result" />) :
                                  <img className="result-image" src={loadingScreen} alt="loading" />}
        </>) : (<>no</>)}

        {/*{isStarting == 1 ?
        ({result.length > 0 ? (<img className="result-image" src={result} alt="result" />) : (<img src={loadingScreen} alt="loading" />)}) : (<>Not yet</>)}*/}
        
        </>
        //<>
        //{result.length > 0 ? (
        //<div>
        //    <img className="result-image" src={result} alt="result" />
        //</div>) :
        //(<>
        //    <img src={loadingScreen} alt="loading" />
        //</>)}
        //</>
      );
};

export default LoadImage2