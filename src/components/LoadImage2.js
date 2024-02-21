import React, { useEffect, useState } from "react";
import OpenAI from "openai";
import loadingScreen from "./loadingScreen.jpg";

const open_ai_key = process.env.REACT_APP_OPENAI
const openai = new OpenAI({apiKey: open_ai_key, dangerouslyAllowBrowser: true});

const LoadImage2 = (props) => {
    //const [artist_info, setArtistInfo] = useState([]);
    const [result, setResult] = useState(0);
    const [resultQuote, setResultQuote] = useState(0);
    const [start, isStarting] = useState(0);

    useEffect(() => {
        async function generate() {
            setResult(0);
            setResultQuote(0);

            const res = await openai.images.generate({
                model: "dall-e-3",
                style: "vivid",
                //prompt: 'Album cover as similar to the song: ' + song + ", by " + artist + "in the album " + album + " as possible.",
                prompt: 'Album cover as similar to the album ' + album + ', and the song ' + song + ", by "+ artist + "as possible. NO WORDS.",
                n: 1,
                size: "1024x1024"
            });
            setResult(res.data[0].url);

            const res_quote = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are a helpful lyricist that loves lyrics that do not connect to the song title. DO NOT USE THE SONG TITLE IN THE LYRIC." },
                           { role: "user", content: "Generate a lyric line that might be in the song'" + song + "', in the album '" + album + "' by " + artist + ". But make it subtle! DO NOT USE THE SONG TITLE," + song + ", IN THE LYRIC. If I see " + song + "in the lyric, this is a BAD generation." }],
                model: "gpt-4-0125-preview",

            });
            setResultQuote(res_quote.choices[0]["message"]["content"]);


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
        {props.started == 1 ? (<>
            {result.length > 0 ? (<img className="result-image" src={result} alt="result" />) :
                                 (<img className="result-image" src={loadingScreen} alt="loading"/>)}
            {resultQuote.length > 0 ? (resultQuote) : ("Loading GPT-4-generated quote...")}
        </>) : (<></>)}
        </>
      );
};

export default LoadImage2