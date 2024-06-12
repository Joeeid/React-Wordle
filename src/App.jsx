import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Wordle from "./components/Wordle";
import { ToastContainer } from "react-toastify";

export default function App() {
	const [allWords, setAllWords] = useState([]);
	const [solution, setSolution] = useState(null);

	useEffect(() => {
		fetch("http://192.168.12.148:3001/words")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}
				return res.json();
			})
			.then((data) => {
				setAllWords(data);
				const randomSolution = data[Math.floor(Math.random() * data.length)];
				setSolution(randomSolution);
			})
			.catch((error) => {
				console.error("Fetch error:", error);
			});
	}, []);

	function newGame() {
		const randomSolution =
			allWords[Math.floor(Math.random() * allWords.length)];
		setSolution(randomSolution);
	}

	return (
		<div className="App">
			<ToastContainer limit={2} />
			<h1>Wordle</h1>
			{solution && (
				<Wordle
					solution={solution.word.toUpperCase()}
					allWords={allWords}
					newGame={newGame}
				/>
			)}
		</div>
	);
}

/* 

data we need to track:
  -- solution
    -- 5 letter string, e.g. 'drain'
  -- past guesses
    -- an array of past guesses
    -- each past guess is an array of letter objects [{}, {}, {}, {}, {}]
    -- each object represents a letter in the guess word {letter: 'a', color: 'yellow'}
  -- current guess
    -- string 'hello'
  -- keypad letters
    -- array of letter objects [{key: 'a', color: 'green'}, {}, {} ...]
  -- number of turns
    -- an integer 0 - 6

game process:
  -- entering words:
    -- user enters a letter & a square is filled with that letter
    -- when a user hits delete it deletes the previous letter
    -- when a user hits enter it submits the word
      -- if all squares are not filled with letters then the word is not submitted
      -- if that word has already been used in a prev guess then the word is not submitted
  -- checking submitted words:
    -- each letter is checked to see if it matches to the solution
    -- each letter is assigned a color based on it's inclusion in the solution
      -- exact matches (correct position in the solution) are green
      -- partial matches (in the solution but not the correct position) are yellow
      -- none-matches (not in the solution at all) are grey
    -- the guess is added the grid with the correct colors
    -- the current guess moves to the next row
    -- the keypad letters are updated (colors)
  -- ending the game:
    -- when the guessed word fully matches the solution
      -- modal to say 'well done'
    -- when the user runs out of guesses
      -- modal to say 'unlucky'

*/
