let board = []
let prevBoard
let score = 0
let ROWS = COLS = 4
let MAXVAL = 8192

window.onload = function() {
    setGame()
}

function setGame() {
    docBoard = document.getElementById("board")
    for (let r = 0; r < ROWS; r++) {
        let row = []
        for (let c = 0; c < COLS; c++) {
            row.push(0)
            let tile = document.createElement("div")
            tile.id = r.toString() + "," + c.toString()
            updateTile(tile, 0)
            docBoard.append(tile)
        }
        board.push(row)
    }
    setTwo()
    setTwo()
}

function updateTile(tile, num) {
    tile.classList.value = "tile"
    if (num > 0) {
        tile.innerText = num
        if (num <= MAXVAL) {
            tile.classList.add("--" + num.toString())
        }
        else { tile.classList.add("--8192") }
    }
    else
        tile.innerText = ""
}

function setTwo() {
    if (!hasEmptyTile())
        return

    let found = false
    while (!found) {
        let r = Math.floor(Math.random() * ROWS)
        let c = Math.floor(Math.random() * COLS)
        if (board[r][c] == 0) {
            board[r][c] = 2
            let tile = document.getElementById(r.toString() + "," + c.toString())
            tile.innerText = "2"
            tile.classList.add("--2","new")
            found = true
        }
    }
}

function hasEmptyTile() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c] == 0) { return true }
        }
    }
    return false
}

function resetGame() {
    if (!confirm("Reset Game?"))
        return
    for (let r = 0; r < ROWS; r++) {
        let row = board[r]
        for (let c = 0; c < COLS; c++) {
            row[c] = 0
            let tile = document.getElementById(r.toString() + "," + c.toString())
            let num = 0
            updateTile(tile, num)
        }
        board[r] = row
    }
    setTwo()
}

function slide(row) {
    row = row.filter(num => num != 0)
    for (let i = 0; i < row.length - 1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2
            row.splice(i+1,1)
            score += row[i]
        }
    }
    while (row.length < COLS) { row.push(0) }
    return row
}

function updateHorizontal(r) {
    for (let c = 0; c < COLS; c++) {
        let tile = document.getElementById(r.toString() + "," + c.toString())
        let num = board[r][c]
        updateTile(tile, num)
    }
}

function getColumn(c) {
    let row = []
    for (let r = 0; r < ROWS; r++) { row.push(board[r][c]) }
    return row
}

function updateVertical(c, col) {
    for (let r = 0; r < ROWS; r++) {
        board[r][c] = col[r]
        let tile = document.getElementById(r.toString() + "," + c.toString())
        let num = board[r][c]
        updateTile(tile, num)
    }
}

function slideLeft() {
    for (let r = 0; r < ROWS; r++) {
        let row = board[r]
        board[r] = slide(row)
        updateHorizontal(r)
    }
}

function slideRight() {
    for (let r = 0; r < ROWS; r++) {
        let row = board[r].reverse()
        board[r] = slide(row).reverse()
        updateHorizontal(r)
    }
}

function slideUp() {
    for (let c = 0; c < COLS; c++) {
        let col = getColumn(c)
        col = slide(col)
        updateVertical(c, col)
    }
}

function slideDown() {
    for (let c = 0; c < COLS; c++) {
        let col = getColumn(c)
        col = slide(col.reverse()).reverse()
        updateVertical(c, col)
    }
}

function validMove() {
    if (prevBoard != board.toString())
        setTwo()
    else if (!hasEmptyTile()) {
        alert("Game Over")
        resetGame()
    }
}

document.addEventListener("keydown", (e) => {
    prevBoard = board.toString()
    if(e.code == "ArrowUp" || 
       e.code == "ArrowDown" || 
       e.code == "ArrowLeft" || 
       e.code == "ArrowRight")
        e.preventDefault()

    if (e.code == "ArrowUp" ||
        e.code == "KeyW")
        slideUp()
    if (e.code == "ArrowDown" ||
        e.code == "KeyS")
        slideDown()
    if (e.code == "ArrowLeft" ||
        e.code == "KeyA")
        slideLeft()
    if (e.code == "ArrowRight" ||
        e.code == "KeyD")
        slideRight()
    validMove()
    document.getElementById("score").innerText = score
})