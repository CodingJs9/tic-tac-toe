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

// gameController module
const gameController = (() => {
	let turns = 1;
	const playerX = Player('X');
	const playerO = Player('O');
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	let currentTurn = playerX.getMarker();

	const changeTurn = () => {
		currentTurn === playerX.getMarker()
			? (currentTurn = playerO.getMarker())
			: (currentTurn = playerX.getMarker());
	};

	const placeMarker = (tile, messageBox) => {
		if (gameBoard.board[tile.dataset.id] !== '') return;
		gameBoard.board[tile.dataset.id] = currentTurn;
		checkWinner(messageBox);
		changeTurn();
		displayController.clearAndRender();
		turns++;
	};

	const checkWin = (currentTurn) => {
		return winningCombinations.some((combination) => {
			return combination.every((index) => {
				return gameBoard.board[index] === currentTurn;
			});
		});
	};

	const checkWinner = (messageBox) => {
		if (checkWin(currentTurn)) {
			messageBox.innerText = `Player ${currentTurn} has won!`;
		} else if (turns === 9) {
			messageBox.innerText = `That was a tie. Wanna play again?`;
		}
	};

	return { placeMarker };
})();

// displayController module
const displayController = (() => {
	const grid = document.querySelector('.game-grid');
	const messageBox = document.querySelector('.message');
	const restartBtn = document.querySelector('.restart');
	let idCounter = 0;

	restartBtn.addEventListener('click', () => {
		gameBoard.board = ['', '', '', '', '', '', '', '', ''];
		messageBox.innerText = '';
		clearAndRender();
	});

	const createTile = (tileContent) => {
		const tile = document.createElement('div');
		tile.classList.add('tile');
		tile.dataset.id = idCounter;
		tile.innerText = tileContent;
		tile.addEventListener('click', () => {
			gameController.placeMarker(tile, messageBox);
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

	return { clearAndRender };
})();

displayController.clearAndRender();
