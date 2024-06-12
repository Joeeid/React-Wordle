import React from "react";
import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn }) {
	return (
		<div className="grid">
			{guesses.map((guess, idx) => {
				return turn === idx ? (
					<Row key={idx} currentGuess={currentGuess} />
				) : (
					<Row key={idx} guess={guess} />
				);
			})}
		</div>
	);
}
