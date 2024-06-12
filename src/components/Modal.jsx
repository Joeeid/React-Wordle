import React from "react";

export default function Modal({ turn, isCorrect, solution, resetGame }) {
	/* 
    toast.success("Congratulations, you won!\nPress Enter to restart game.", {
				position: "top-center",
				autoClose: false,
				hideProgressBar: true,
				closeOnClick: false,
				closeButton: false,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: "colored",
				transition: Flip,
			});
    toast.error(
				<div>
					Better luck next time, the word was: {solution}.<br />
					Click{" "}
					<a
						href={`https://www.dictionary.com/browse/${solution.toLowerCase()}`}
						target="_blank"
						rel="noreferrer"
					>
						here
					</a>{" "}
					to view definition.
					<br />
					Press Enter to restart game.
				</div>,
				{
					position: "top-center",
					autoClose: false,
					hideProgressBar: true,
					closeOnClick: false,
					closeButton: false,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
					theme: "colored",
					transition: Flip,
				}
			);
    */
	return (
		<div className="modal">
			<div>
				{isCorrect ? (
					<>
						<h1>Congratulations, you won!</h1>
						<p>You found the word in {turn} guesses😍</p>
					</>
				) : (
					<>
						<h1>Nevermind!</h1>
						<p>Better luck next time, the word was: {solution}.</p>
						<p>
							Click{" "}
							<a
								href={`https://www.dictionary.com/browse/${solution.toLowerCase()}`}
								target="_blank"
								rel="noreferrer"
							>
								here
							</a>{" "}
							to view definition.
						</p>
					</>
				)}
				<button onClick={resetGame} className={isCorrect ? "win" : "lose"}>
					Restart Game
				</button>
			</div>
		</div>
	);
}
