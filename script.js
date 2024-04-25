document.addEventListener("DOMContentLoaded", function () {
    const tiles = document.querySelectorAll('.tile');
    let emptyTile; // Updated later after randomization

    // Call randomizePuzzle to start with a random configuration
    randomizePuzzle();

    tiles.forEach(tile => {
        tile.addEventListener('click', function () {
            if (isAdjacent(tile, emptyTile)) {
                swapTiles(tile, emptyTile);
                emptyTile = tile;
                if (checkWin()) {
                    displayWin(); // Call the function to display win state
                }
            }
        });
    });

    function isAdjacent(tile1, tile2) {
        // Get the indices of the tiles
        const index1 = Array.from(tiles).indexOf(tile1);
        const index2 = Array.from(tiles).indexOf(tile2);

        // Get the row and column of each tile
        const row1 = Math.floor(index1 / 3);
        const col1 = index1 % 3;
        const row2 = Math.floor(index2 / 3);
        const col2 = index2 % 3;

        // Check if tiles are adjacent
        return (Math.abs(row1 - row2) === 1 && col1 === col2) ||
            (Math.abs(col1 - col2) === 1 && row1 === row2);
    }

    function swapTiles(tile1, tile2) {
        // Swap the inner HTML of the tiles
        const temp = tile1.innerHTML;
        tile1.innerHTML = tile2.innerHTML;
        tile2.innerHTML = temp;
    }

    function randomizePuzzle() {
        const buttonValues = ['1', '2', '3', '4', '5', '6', '7', '8', '']; // Leave the last button empty

        for (let i = buttonValues.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [buttonValues[i], buttonValues[j]] = [buttonValues[j], buttonValues[i]];
        }

        tiles.forEach((tile, index) => {
            tile.querySelector('button').innerText = buttonValues[index];
            if (buttonValues[index] === '') {
                emptyTile = tile;
            }
        });
    }



    function checkWin() {
        const solution = ['1', '2', '3', '4', '5', '6', '7', '8']; // Updated solution array
        const currentLayout = Array.from(tiles).map(tile => tile.querySelector('button').innerText);
        return currentLayout.join('') === solution.join('');
    }


    function displayWin() {
        tiles.forEach(tile => {
            tile.querySelector('button').classList.add('solved');
        });
    }
});
