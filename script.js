const board = document.querySelector(".board")
const modal = document.querySelector(".modal")
const startBtn = document.querySelector(".start-btn")
const resetBtn = document.querySelector(".reset-btn")
const startGame = document.querySelector(".startgame")
const gameover = document.querySelector(".gameover")


startBtn.addEventListener("click", () => {
    modal.style.display = "none"
    moving = setInterval(() => {
        render()
    }, 400)
})

const boxWidth = 50;
const boxheight = 50;

const cols = Math.floor(board.clientWidth / boxWidth)
const rows = Math.floor(board.clientHeight / boxheight)

let moving = false
let head = null;
let blocks = []
let snake = [{ x: 1, y: 3 }]
let direction = "right"
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }


/* block loop */


for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        block.textContent = `${row}-${col}`
        blocks[`${row}-${col}`] = block
    }
}

function render() {
    /* logic for controlling the snake */
    if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    }
    else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }
    else if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    }
    else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }

    if (snake[0].x === 0 || snake[0].x >= rows || snake[0].y === 0 || snake[0].y >= cols) {

        clearInterval(moving)
        resetGame()
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })
    snake.unshift(head)
    snake.pop()


    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })


    /* Food */


    blocks[`${food.x}-${food.y}`].classList.add("food")

    if (snake[0].x === food.x && snake[0].y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${food.x}-${food.y}`].classList.add("food")
        snake.unshift(head)

    }



}

function resetGame() {
    modal.style.display = "flex"
    startGame.style.display = "none"
    gameover.style.display = "flex"

    resetBtn.addEventListener("click", () => {
        modal.style.display = "none"
        snake = [{ x: 1, y: 3 }]
        direction = "right"
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        moving = setInterval(() => {
            render()
        }, 400)
        
    })
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "d") {
        direction = "right"
    }
    else if (e.key === "ArrowDown" || e.key === "s") {
        direction = "down"
    }
    else if (e.key === "ArrowLeft" || e.key === "a") {
        direction = "left"
    }
    else if (e.key === "ArrowUp" || e.key === "w") {
        direction = "up"
    }
})