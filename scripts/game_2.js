let board = []
let score = 20
let ROWS = 20
let COLS = 30
let FPS = 4
let player = []
let movement = [-1, 0]
let SNAKE = 1
let FOOD = -1
let game

window.onload = function() {
    setGame()
    game = setInterval(gameplayLoop, 1000 / FPS)
}

function setGame() {
    docBoard = document.getElementById("board");
    for (let r = 0; r < ROWS; r++) {
        let row = []
        for (let c = 0; c < COLS; c++) {
            row.push(0)
            let tile = document.createElement("div")
            tile.id = r.toString() + "," + c.toString()
            tile.classList.value = "tile"
            docBoard.append(tile)
        }
        board.push(row)
    }
    setPlayer()
    setFood()
    
    
}

function resetGame() {
    if (!confirm("Reset Game?"))
        return
    docBoard = document.getElementById("board");
    player = []
    movement = [-1, 0]
    for (let r = 0; r < ROWS; r++) {
        let row = board[r]
        for (let c = 0; c < COLS; c++) {
            row[c] = 0
            let tile = document.getElementById(r.toString() + "," + c.toString())
            updateTile(tile, 0)
        }
        board[r] = row
    }
    setPlayer()
    setFood()
    
    game = setInterval(gameplayLoop, 1000 / FPS)
}

function setFood() {
    if (!hasEmptyTile())
        return

    let found = false
    while (!found) {
        let r = Math.floor(Math.random() * ROWS)
        let c = Math.floor(Math.random() * COLS)
        if (board[r][c] == 0) {
            board[r][c] = FOOD
            let tile = document.getElementById(r.toString() + "," + c.toString())
            updateTile(tile, FOOD)
            found = true
        }
    }
}

function setPlayer() {
    let r = Math.floor(ROWS / 2)
    let c = Math.floor(COLS / 2)
    board[r][c] = SNAKE
    let tile = document.getElementById(r.toString() + "," + c.toString())
    updateTile(tile, SNAKE + 1)
    player.push([r, c])
}

function hasEmptyTile() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c] == 0) { return true }
        }
    }
    return false
}

function updateTile(tile, num) {
    tile.classList.value = "tile"
    if (num == SNAKE + 1)
        tile.classList.add("snake", "head")
    else if (num ==  SNAKE)
        tile.classList.add("snake")
    else if (num == FOOD)
        tile.classList.add("food")
}

function gameplayLoop() {
    let curLoc = player[0]
    let newLoc = [curLoc[0] + movement[0], curLoc[1] + movement[1]]
    if (0 > newLoc[0] || newLoc[0] >= ROWS || 0 > newLoc[1] || newLoc[1] >= COLS || board[newLoc[0]][newLoc[1]] == SNAKE) {
        endGame()
        return
    }

    if (board[newLoc[0]][newLoc[1]] == FOOD) {
        score += 1
        document.getElementById("score").innerText = score
        board[newLoc[0]][newLoc[1]] = 0
        setFood()
    }

    let newTile = document.getElementById(newLoc[0].toString() + "," + newLoc[1].toString())
    board[newLoc[0]][newLoc[1]] = SNAKE
    updateTile(newTile, SNAKE + 1)
    player.unshift(newLoc)
    let tile = document.getElementById(curLoc[0].toString() + "," + curLoc[1].toString())
    updateTile(tile, SNAKE)
    while (player.length > score + 1) {
        let oldLoc = player.pop()
        board[oldLoc[0]][oldLoc[1]] = 0
        tile = document.getElementById(oldLoc[0].toString() + "," + oldLoc[1].toString())
        updateTile(tile, 0)
    }
}

function endGame() {
    clearInterval(game)
    alert("Game Over")
    resetGame()
}

function moveUp() {
    if (movement[0] == 0)
        movement = [-1, 0]
}

function moveDown() {
    if (movement[0] == 0)
        movement = [1, 0]
}

function moveLeft() {
    if (movement[1] == 0)
        movement = [0, -1]
}

function moveRight() {
    if (movement[1] == 0)
        movement = [0, 1]
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
        moveUp()
    if (e.code == "ArrowDown" ||
        e.code == "KeyS")
        moveDown()
    if (e.code == "ArrowLeft" ||
        e.code == "KeyA")
        moveLeft()
    if (e.code == "ArrowRight" ||
        e.code == "KeyD")
        moveRight()
})