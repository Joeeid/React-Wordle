import React from "react";
import Tile from "./Tile";

export default function Row({ guess, currentGuess }) {
	return guess ? (
		<div className="row past">
			{guess.map((g, i) => (
				<Tile key={i} guessChar={g} />
			))}
		</div>
	) : currentGuess ? (
		<div className="row current">
			{currentGuess.split("").map((g, i) => {
				const gObj = { key: g, color: "filled" };
				return <Tile key={i} guessChar={gObj} />;
			})}
			{[...Array(5 - currentGuess.length)].map((_, i) => (
				<Tile key={i} />
			))}
		</div>
	) : (
		<div className="row">
			<Tile />
			<Tile />
			<Tile />
			<Tile />
			<Tile />
		</div>
	);
}
