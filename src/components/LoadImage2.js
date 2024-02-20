import React, { useEffect, useState } from "react";
import OpenAI from "openai";

const open_ai_key = process.env.REACT_APP_OPENAI
const openai = new OpenAI({apiKey: open_ai_key, dangerouslyAllowBrowser: true});

const LoadImage2 = () => {
    const [token, setToken] = useState("");
    const [artist_info, setArtistInfo] = useState([]);
    const [result, setResult] = useState(0);

    useEffect(() => {
        async function generate() {
            const res = await openai.images.generate({
                model: "dall-e-3",
                style: "vivid",
                //prompt: 'Album cover as similar to the song: ' + song + ", by " + artist + "in the album " + album + " as possible.",
                prompt: 'Album cover as similar to the album ' + album + ', and the song ' + song + ", by "+ artist + "as possible. NO WORDS.",
                n: 1,
                size: "1024x1024"
            });
            setResult(res.data[0].url);
        }

        if (localStorage.hasOwnProperty(0)){

            console.log("getting sth");
            var artist_info = JSON.parse(localStorage.getItem(0));

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
        {result.length > 0 ? (<img className="result-image" src={result} alt="result" />) : (<>hi</>)}
        </>
      );
};

export default LoadImage2