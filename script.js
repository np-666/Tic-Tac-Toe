let board = ["", "", "", "", "", "", "", "", ""];
let human = "X";
let ai = "O";
let gameActive = true;

function makeMove(cell, index) {
    if (!gameActive || board[index] !== "") return;
    board[index] = human;
    cell.textContent = human;
    if (checker(human)) {
        document.getElementById("status").textContent = `You Win! 🎉`;
        gameActive = false;
        return;
    } else if (board.every(cell => cell !== "")) {
        document.getElementById("status").textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }
    setTimeout(aiMove, 500);
}

function aiMove() {
    let goodMove = minimax(board, ai).index;
    board[goodMove] = ai;
    document.querySelectorAll(".cell")[goodMove].textContent = ai;
    if (checker(ai)) {
        document.getElementById("status").textContent = `AI Wins! 😎`;
        gameActive = false;
    }
}

function checker(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        board[pattern[0]] === player && 
        board[pattern[1]] === player && 
        board[pattern[2]] === player
    );
}

function minimax(newBoard, player) {
    let leftOverMoves = newBoard.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    if (checker(human)) return { score: -10 };
    if (checker(ai)) return { score: 10 };
    if (leftOverMoves.length === 0) return { score: 0 };
    let moves = [];
    for (let i of leftOverMoves) {
        let move = {};
        move.index = i;
        newBoard[i] = player;
        if (player === ai) {
            let result = minimax(newBoard, human);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, ai);
            move.score = result.score;
        }
        newBoard[i] = "";
        moves.push(move);
    }
    let goodMove;
    if (player === ai) {
        let goodScore = -Infinity;
        for (let move of moves) {
            if (move.score > goodScore) {
                goodScore = move.score;
                goodMove = move;
            }
        }
    } else {
        let goodScore = Infinity;
        for (let move of moves) {
            if (move.score < goodScore) {
                goodScore = move.score;
                goodMove = move;
            }
        }
    }
    return goodMove;
}

function resetGame() {
    board.fill("");
    document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    document.getElementById("status").textContent = "";
    gameActive = true;
}
