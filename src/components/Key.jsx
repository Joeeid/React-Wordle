import React from "react";

export default function Key({ letter, color, handleClick, isPressed }) {
	return (
		<button
			className={`key ${color} ${isPressed && "pressed"} ${
				(letter === "Enter" || letter === "Backspace") && "double"
			}`}
			onClick={handleClick}
		>
			{letter === "Backspace" ? "⬅" : letter}
		</button>
	);
}
