// Player factory function
const Player = (marker) => {
	return { marker };
};

// gameBoard module
const gameBoard = (() => {
	let board = ['', '', '', '', '', '', '', '', ''];

	return { board };
})();

const gameController = (() => {
	const placeMarker = (tile) => {
		gameBoard.board[tile.dataset.id] = 'X';
		displayController.clearAndRender();
	};

	return { placeMarker };
})();

const displayController = (() => {
	const grid = document.querySelector('.game-grid');
	let idCounter = 0;

	const createGrid = (tileContent) => {
		const tile = document.createElement('div');
		tile.classList.add('tile');
		tile.dataset.id = idCounter;
		tile.innerText = tileContent;
		tile.addEventListener('click', () => {
			gameController.placeMarker(tile);
		});
		grid.appendChild(tile);
		idCounter++;
	};

	const clearAndRender = () => {
		while (grid.firstChild) {
			grid.removeChild(grid.firstChild);
		}
		idCounter = 0;

		for (let i = 0; i < gameBoard.board.length; i++) {
			createGrid(gameBoard.board[i]);
		}
	};

	return { clearAndRender };
})();

displayController.clearAndRender();
