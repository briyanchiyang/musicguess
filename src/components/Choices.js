import React, { useEffect, useState } from "react";
import '../App.css';

const Choices = (props) => {
    const [choices, setChoices] = useState([]);
    const [correctSongId, setCorrectSongId] = useState("");
    const [correctSong, setCorrectSong] = useState("");
    const [outcome, setOutcome] = useState("");

    var clicked = false;
    var correct_name = "";

    var temp = [];
    
    useEffect(() => {
        if (localStorage.hasOwnProperty(5)){
            console.log("getting choices");
            for (let i = 0; i < 6; i++) {
                var artist_info = JSON.parse(localStorage.getItem(i));
                var album = artist_info["album"]["name"];
                var song = artist_info["name"];
                console.log("song: "+ song)

                temp.push([song, album]);
            }

            setChoices(temp);
            setOutcome("");
        }

        // Can just be its own variable?
        if (localStorage.hasOwnProperty("correct_song_id")){
            console.log("Begin");

            setCorrectSongId(parseInt(localStorage.getItem("correct_song_id")));

            var correct_id = parseInt(localStorage.getItem("correct_song_id"));
            console.log("Correct id: ", correct_id)
            setCorrectSong(temp[correct_id][0]);
        }
    });

    const buttonClick = (index) => {
        console.log("Here: " + correctSongId);
        console.log("Here 2:" + correctSong);

        if (clicked == false){
            clicked = true;
            console.log("Correct song id here is: " + correctSong);

            if (index == correctSongId){
                setOutcome("Correct!");
            }

            else{
                setOutcome("Incorrect :( The correct answer is: " + correctSong);
            }
        }
    }


    return (
        <>
        {choices.length == 6 ? (
            <>
            {outcome.length > 0 ? (<h3>{outcome}</h3>) : (<h3>Which song is this referring to?</h3>)}
            <div className = "choices">

                    <button className="btn" onClick={() => buttonClick(0)}>{choices[0][0]} - <em>{choices[0][1]}</em></button>
                    <button className="btn" onClick={() => buttonClick(1)}>{choices[1][0]} - <em>{choices[1][1]}</em></button> 

                    <button className="btn" onClick={() => buttonClick(2)}>{choices[2][0]} - <em>{choices[0][1]}</em></button>
                    <button className="btn" onClick={() => buttonClick(3)}>{choices[3][0]} - <em>{choices[3][1]}</em></button>

                    <button className="btn" onClick={() => buttonClick(4)}>{choices[4][0]} - <em>{choices[4][1]}</em></button>
                    <button className="btn" onClick={() => buttonClick(5)}>{choices[5][0]} - <em>{choices[5][1]}</em></button>
            </div>
            </>
        ) : (
            <></>
        )}
        </>)
}

export default Choices;
