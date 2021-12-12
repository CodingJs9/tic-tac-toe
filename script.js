// Player factory function
const Player = (marker) => {
	const getMarker = () => marker;

	return { getMarker };
};

// gameBoard module
const gameBoard = (() => {
	let board = ['', '', '', '', '', '', '', '', ''];

	return { board };
})();

const gameController = (() => {
	const playerX = Player('X');
	const playerO = Player('O');

	let currentTurn = playerX.getMarker();

	const decideTurn = () => {
		currentTurn === playerX.getMarker()
			? (currentTurn = playerO.getMarker())
			: (currentTurn = playerX.getMarker());
	};

	const placeMarker = (tile) => {
		if (gameBoard.board[tile.dataset.id] !== '') return;
		gameBoard.board[tile.dataset.id] = currentTurn;
		decideTurn();
		displayController.clearAndRender();
	};

	return { placeMarker };
})();

const displayController = (() => {
	const grid = document.querySelector('.game-grid');
	let idCounter = 0;

	const createTile = (tileContent) => {
		const tile = document.createElement('div');
		tile.classList.add('tile');
		tile.dataset.id = idCounter;
		tile.innerText = tileContent;
		tile.addEventListener('click', () => {
			gameController.placeMarker(tile, idCounter);
		});
		grid.appendChild(tile);
		idCounter++;
	};

	const clearGrid = () => {
		while (grid.firstChild) {
			grid.removeChild(grid.firstChild);
		}
		idCounter = 0;
	};

	const render = () => {
		for (let i = 0; i < gameBoard.board.length; i++) {
			createTile(gameBoard.board[i]);
		}
	};

	const clearAndRender = () => {
		clearGrid();
		render();
	};

	return { clearAndRender, render };
})();

displayController.render();
