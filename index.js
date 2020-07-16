const gameBoard = (() => {
    const gameArray = ["", "", "", "", "", "", "", "", ""];
    return { gameArray };
})();

const Player = (name, letter) => {
    return { name, letter };
};

const begin = (() => {
    const create = () => {
        for (let i = 0, nSquares = 9; i < nSquares; i++) {
            const gboard = document.querySelector("#gboard");
            let square = document.createElement("div");
            gboard.appendChild(square);
            square.className = `item`;
        }
    };

    return {
        Output: () => {
            create();
        }
    }
})();
begin.Output();

const gameplay = (() => {
    const items = document.querySelectorAll(".item");
    const bgmodel = document.querySelector(".bg-modal");
    const resutmessage = document.querySelector("#result");
    const changeName = document.querySelector("#changeName");
    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");
    const restartButton = document.querySelector("#restartButton");

    const Player1 = Player("PLAYER 1", "✕");
    const Player2 = Player("PLAYER 2", "○");

    let symbol = "✕";
    let turn = 0;
    let winner = false;

    const clickboard = () => {
        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener("click", () => {
                if (items[i].textContent === "" && winner === false) {
                    if (symbol === "✕") {
                        // Replace element's empty string with symbol in gameArray
                        gameBoard.gameArray[i] = symbol;
                        // Add symbol to HTML grid and style it
                        items[i].textContent = symbol;
                        items[i].style.color = "#545454"; // Black cross
                        items[i].style.fontSize = "55px";
                        findWinningSequence();
                        symbol = "○";
                        console.log(gameBoard.gameArray);
                        turn++;
                    } else {
                        // Replace element's empty string with symbol in gameArray
                        gameBoard.gameArray[i] = symbol;
                        // Add symbol to HTML grid and style it
                        items[i].textContent = symbol;
                        items[i].style.color = "#f2ebd4"; // White circle
                        items[i].style.fontSize = "100px";
                        findWinningSequence();
                        symbol = "✕";
                        console.log(gameBoard.gameArray);
                        turn++;
                    }
                }
            });
        }
    };

    const findWinningSequence = () => {
        if (symbol === gameBoard.gameArray[0]) {
            if (symbol === gameBoard.gameArray[1] && symbol === gameBoard.gameArray[2] ||
                symbol === gameBoard.gameArray[3] && symbol === gameBoard.gameArray[6] ||
                symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[8]) {
                getWinner();
            }
        }
        if (symbol === gameBoard.gameArray[2]) {
            if (symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[6] ||
                symbol === gameBoard.gameArray[5] && symbol === gameBoard.gameArray[8]) {
                getWinner();
            }
        }
        if (symbol === gameBoard.gameArray[1] && symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[7]) {
            getWinner();
        }
        if (symbol === gameBoard.gameArray[3] && symbol === gameBoard.gameArray[4] && symbol === gameBoard.gameArray[5]) {
            getWinner();
        }
        if (symbol === gameBoard.gameArray[6] && symbol === gameBoard.gameArray[7] && symbol === gameBoard.gameArray[8]) {
            getWinner();
        }
        // Tie game
        if (turn === 8 && winner === false) {
            resutmessage.textContent = 'Tie!';
            bgmodel.style.display = 'flex';
            bgmodel.addEventListener('click', (e) => {
                bgmodel.style.display = "none";
            });
        }
    };

    const getWinner = () => {
        winner = true;
        bgmodel.style.display = 'flex';
        if (symbol === Player1.letter) {
            resutmessage.textContent = `Winner: ${Player1.name}  CONGRATULATIONS👏👏`;
        } else {
            resutmessage.textContent = `Winner: ${Player2.name}   CONGRATULATIONS👏👏`;
        }
        // Click anywhere to remove Winner Screen
        bgmodel.addEventListener('click', (e) => {
            bgmodel.style.display = "none";
        });
    };

    const changename = () => {
        changeName.addEventListener('click', (e) => {
            // `Do While Loop` repeats prompt if user does not enter PlayerX.length < 12
            do {
                Player1.name = prompt("Player1 plase Enter your name:", "PLAYER 1");
                if (Player1.name === null) {
                    Player1.name = "PLAYER 1"; // Set default name if user cancels
                }
            } while (Player1.name.length >= 12);
            player1.innerHTML = Player1.name;

            do {
                Player2.name = prompt("Player2 plase Enter your name:", "PLAYER 2");
                if (Player2.name === null) {
                    Player2.name = "PLAYER 2";
                }
            } while (Player2.name.length >= 12);
            player2.innerHTML = Player2.name;
        });
    };

    const clearboard = () => {
        restartButton.addEventListener("click", (e) => {
            items.forEach((element) => {
                element.textContent = "";
            });
            gameBoard.gameArray = ["", "", "", "", "", "", "", "", ""];
            symbol = "✕";
            turn = 0;
            winner = false;
        });
    };

    return {
        gameplayOutput: () => {
            changename();
            clickboard();
            clearboard();
        }
    }
})();
gameplay.gameplayOutput();
