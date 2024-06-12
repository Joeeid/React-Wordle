import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keyboard from "./Keyboard";

export default function Wordle({ solution, allWords, newGame }) {
	const {
		turn,
		currentGuess,
		handleKeyup,
		handleKeyPress,
		guesses,
		usedKeys,
		pressedKey,
	} = useWordle(solution, allWords, newGame);

	useEffect(() => {
		window.addEventListener("keyup", handleKeyup);

		return () => window.removeEventListener("keyup", handleKeyup);
	}, [handleKeyup]);

	return (
		<div>
			<Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
			<Keyboard
				usedKeys={usedKeys}
				handleKeyPress={handleKeyPress}
				pressedKey={pressedKey}
			/>
		</div>
	);
}
