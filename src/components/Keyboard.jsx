import React, { useState, useEffect } from "react";
import Key from "./Key";

export default function Keyboard({ usedKeys, handleKeyPress, pressedKey }) {
	const [letters, setLetters] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3001/letters")
			.then((res) => res.json())
			.then((json) => setLetters(json));
	}, []);

	return (
		<div className="keyboard">
			{letters &&
				letters.map((l) => (
					<Key
						key={l.key}
						letter={l.key}
						color={usedKeys[l.key.toUpperCase()]}
						handleClick={() => handleKeyPress(l.key)}
						isPressed={pressedKey === l.key.toUpperCase()}
					/>
				))}
		</div>
	);
}
