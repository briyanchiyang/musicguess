import React, { useEffect, useState } from "react";

const Choices = () => {
    const [choices, setChoices] = useState([]);
    
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
            console.log(choices);
       }
    });


    return (
        <>
        {choices.length === 6 ? (
            <div>
                <button type="button">{choices[0][0]} - {choices[0][1]}</button>
                <button type="button">{choices[1][0]} - {choices[1][1]}</button>
                <button type="button">{choices[2][0]} - {choices[0][1]}</button>
                <button type="button">{choices[3][0]} - {choices[3][1]}</button>
                <button type="button">{choices[4][0]} - {choices[4][1]}</button>
                <button type="button">{choices[5][0]} - {choices[5][1]}</button>
            </div>
        ) : (
            <>this shit hasn't arrived yet</>
        )}
        </>)
}

export default Choices;
