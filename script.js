var size = 3;
var board = [];
var cur = "X";

const grid = document.querySelector(".grid");
const title = document.querySelector("h1");
const slider = document.getElementById("slider");
const label = document.getElementById("label");
const restart = document.getElementById("restart");


function init() {
    grid.innerHTML = "";
    board = [];

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("button");
            grid.appendChild(cell);
            cell.classList.add("cell");
            cell.addEventListener("click", function() {
                move(i, j, cell);
            })
            board[i][j] = "";
        }
    }
    label.textContent = "Board Size: " + size;
    slider.disabled = false;
}

init();

function rowCheck() {
    for (var i = 0; i < size; i++) {
        var win = true;
        for (var j = 0; j < size; j++) {
            if (board[i][j] != cur) {
                win = false; break;
            }
        }
        if (win) {
            return true;
        }
    }
    return false;
}

function colCheck() {
    for (var j = 0; j < size; j++) {
        var win = true;
        for (var i = 0; i < size; i++) {
            if (board[i][j] != cur) {
                win = false; break;
            }
        }
        if (win) {
            return true;
        }
    }
    return false;
}

function diagCheck() {
    var win = true;
    for (var i = 0; i < size; i++) {
        if (board[i][i] != cur) {
            win = false; break;
        }
    }
    if (win) {
        return true;
    }

    win = true;
    for (var i = 0; i < size; i++) {
        if (board[i][size - i - 1] != cur) {
            win = false; break;
        }
    }
    if (win) {
        return true;
    }

    return false;
}

function checkWin() {
    return rowCheck() || colCheck() || diagCheck();
}

function checkTie() {
    var tie = true;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (board[i][j] == "") {
                tie = false;
            }
        }
    }
    return tie;
}

function move(row, col, cell) {
    if (board[row][col] == "") {
        cell.textContent = cur;
        board[row][col] = cur;

        if (checkWin()) {
            document.querySelectorAll(".cell").forEach(c => c.disabled = true);
            slider.disabled = true;
            title.textContent = cur + " Wins!";
            restart.style.display = "block";
        }

        else if (checkTie()) {
            document.querySelectorAll(".cell").forEach(c => c.disabled = true);
            slider.disabled = true;
            title.textContent = "It's a Draw!";
            restart.style.display = "block";
        }

        else {
            if (cur == "X") cur = "O";
            else cur = "X";
            title.textContent = cur + "'s Turn!";
        }
    }
}

slider.addEventListener("input", function() {
    size = parseInt(slider.value);
    init();
})

restart.addEventListener("click", function() {
    restart.style.display = "none";
    cur = "X";
    title.textContent = "X's Turn!";
    init();
})
