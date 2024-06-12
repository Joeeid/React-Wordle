import { useState } from "react";
import { Flip, toast } from "react-toastify";

function useWordle(solution, allWords, newGame) {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState("");
	const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
	const [history, setHistory] = useState([]); // each guess is a string
	const [isCorrect, setIsCorrect] = useState(false);
	const [usedKeys, setUsedKeys] = useState({}); // {a: "green", b: "yellow", c:"grey"}
	const [pressedKey, setPressedKey] = useState("");

	function formatGuess() {
		let solutionArray = solution.split("");

		// First pass to find letters in correct position
		let formattedGuess = currentGuess.split("").map((key, idx) => {
			if (solutionArray[idx] === key) {
				solutionArray[idx] = null; // Mark this letter as matched
				return { key, color: "green" };
			} else return { key, color: "grey" };
		});

		// Second pass to find misplaced letters
		formattedGuess.forEach((guess, idx) => {
			if (guess.color !== "green" && solutionArray.includes(guess.key)) {
				guess.color = "yellow";
				solutionArray[solutionArray.indexOf(guess.key)] = null; // Mark this letter as matched
			}
		});

		return formattedGuess;
	}

	function addNewGuess(formattedGuess) {
		setGuesses((prevGuesses) => {
			let newGuesses = [...prevGuesses];
			newGuesses[turn] = formattedGuess;
			return newGuesses;
		});
		setHistory((prevHistory) => [...prevHistory, currentGuess]);
		setTurn((prevturn) => prevturn + 1);
		setUsedKeys((prevUsedKeys) => {
			let newKeys = { ...prevUsedKeys };

			formattedGuess.forEach((l) => {
				const currentColor = newKeys[l.key];

				if (l.color === "green") {
					newKeys[l.key] = "green";
					return;
				}
				if (l.color === "yellow" && currentColor !== "green") {
					newKeys[l.key] = "yellow";
					return;
				}
				if (
					l.color === "grey" &&
					currentColor !== "green" &&
					currentColor !== "yellow"
				) {
					newKeys[l.key] = "grey";
					return;
				}
			});
			return newKeys;
		});
		if (currentGuess === solution) {
			setIsCorrect(true);
			toast.clearWaitingQueue();
		} else if (turn >= 5) {
			toast.clearWaitingQueue();
		}
		setCurrentGuess("");
	}

	function handleKeyPress(key) {
		return handleKeyup({ key: key });
	}

	function handleKeyup({ key }) {
		setPressedKey(key.toUpperCase());
		setTimeout(() => {
			setPressedKey("");
		}, 100);

		if (turn > 5 || isCorrect) {
			if (key === "Enter") resetGame();
			return;
		}

		toast.dismiss();
		if (key === "Backspace" && currentGuess.length > 0) {
			setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
			return;
		}

		if (key === "Enter" && currentGuess.length === 5) {
			if (history.includes(currentGuess)) {
				toast.clearWaitingQueue();
				toast.warn("You already tried that word!", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Flip,
				});
				return;
			}
			if (!isValidWord(currentGuess, allWords)) {
				toast.clearWaitingQueue();
				toast.warn("Hmm, is that even language?!", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Flip,
				});
				return;
			}
			const formattedGuess = formatGuess();
			addNewGuess(formattedGuess);
		}

		if (!/^[A-Za-z]$/.test(key)) return;
		if (currentGuess.length >= 5) return;
		setCurrentGuess((prevGuess) => prevGuess + key.toUpperCase());
	}

	function isValidWord(currentGuess, list) {
		let word = list.find((w) => w.word.toUpperCase() === currentGuess);

		return !!word;
	}

	function resetGame() {
		toast.dismiss();
		setTurn(0);
		setCurrentGuess("");
		setGuesses([...Array(6)]);
		setHistory([]);
		setIsCorrect(false);
		setUsedKeys({});
		newGame();
	}

	return {
		turn,
		currentGuess,
		guesses,
		isCorrect,
		usedKeys,
		pressedKey,
		handleKeyup,
		handleKeyPress,
		resetGame,
	};
}

export default useWordle;
