import React, { useEffect, useState } from "react";

const Choices = () => {
    const [choices, setChoices] = useState([]);
    const [correctSong, setCorrectSong] = useState("");
    const [outcome, setOutcome] = useState("");
    
    useEffect(() => {
        if (localStorage.hasOwnProperty(5)){
            console.log("getting choices");
            
            var temp = [];

            for (let i = 0; i < 6; i++) {
                var artist_info = JSON.parse(localStorage.getItem(i));
                var album = artist_info["album"]["name"];
                var song = artist_info["name"];
                console.log("song: "+ song)

                temp.push([song, album]);
            }

            setChoices(temp);
        }

        // Can just be its own variable?
        if (localStorage.hasOwnProperty("correct_song_id")){
            setCorrectSong(parseInt(localStorage.getItem("correct_song_id")));
        }
    });

    const buttonClick = (index) => {
        console.log("poadsfad");
        console.log(correctSong);

        if (index == correctSong){
            setOutcome("Correct!");
            console.log("adfas");
        }
        else{
            setOutcome("Incorrect :(");
        }

    }


    return (
        <>
        {choices.length == 6 ? (
            <div className = "choices">
                {/*<div className = "choices_row">*/}
                    <button onClick={() => buttonClick(0)}>{choices[0][0]} - <em>{choices[0][1]}</em></button>
                    <button onClick={() => buttonClick(1)}>{choices[1][0]} - <em>{choices[1][1]}</em></button> 
                {/*</div>*/}
                {/*<div className = "choices_row">*/}
                    <button onClick={() => buttonClick(2)}>{choices[2][0]} - <em>{choices[0][1]}</em></button>
                    <button onClick={() => buttonClick(3)}>{choices[3][0]} - <em>{choices[3][1]}</em></button>
                {/*</div>*/}
                {/*<div className = "choices_row">*/}
                    <button onClick={() => buttonClick(4)}>{choices[4][0]} - <em>{choices[4][1]}</em></button>
                    <button  onClick={() => buttonClick(5)}>{choices[5][0]} - <em>{choices[5][1]}</em></button>
                {/*</div>*/}

                {outcome.length > 0 ? (<div>{outcome}</div>) : (<></>)}
            </div>
        ) : (
            <>this shit hasn't arrived yet</>
        )}
        </>)
}

export default Choices;
