import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import Modal from "./Modal";

export default function Wordle({ solution, allWords, newGame }) {
	const {
		isCorrect,
		turn,
		currentGuess,
		handleKeyup,
		handleKeyPress,
		guesses,
		usedKeys,
		pressedKey,
		resetGame,
	} = useWordle(solution, allWords, newGame);

	useEffect(() => {
		window.addEventListener("keyup", handleKeyup);

		return () => window.removeEventListener("keyup", handleKeyup);
	}, [handleKeyup]);
	console.log(solution);
	return (
		<div>
			<Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
			<Keyboard
				usedKeys={usedKeys}
				handleKeyPress={handleKeyPress}
				pressedKey={pressedKey}
			/>
			{(turn > 5 || isCorrect) && (
				<Modal
					turn={turn}
					isCorrect={isCorrect}
					solution={solution}
					resetGame={resetGame}
				/>
			)}
		</div>
	);
}
