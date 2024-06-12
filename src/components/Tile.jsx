import React from "react";

export default function Tile({ guessChar }) {
	return guessChar ? (
		<div className={`tile ${guessChar.color}`}>{guessChar.key}</div>
	) : (
		<div className="tile"></div>
	);
}
