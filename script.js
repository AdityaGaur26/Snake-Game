const board = document.querySelector(".board")
const modal = document.querySelector(".modal")
const startBtn = document.querySelector(".start-btn")
const resetBtn = document.querySelector(".reset-btn")
const startGame = document.querySelector(".startgame")
const gameover = document.querySelector(".gameover")

const high = document.querySelector("#highscore")
const currentScore = document.querySelector("#score")
const currentTime = document.querySelector("#time")

let score = 0
let time = `00-00`
let highScore = localStorage.getItem("highscore") || 0
high.textContent = `${highScore}`
currentScore.textContent = `${score}`
currentTime.textContent = `${time}`

let timer = null

timer = setInterval(() => {
    let [minutes, seconds] = time.split("-").map(Number)
    seconds++
    if (seconds === 60) {
        minutes++
        seconds = 0
    }
    time = `${minutes}-${seconds}`
    currentTime.textContent = `${time}`
}, 1000)

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

    if (
        head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols
    ){
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
    snake.push(head)

    score += 10
    currentScore.textContent = `${score}`

    if (score > highScore) {
        highScore = score
        localStorage.setItem("highscore", highScore)

    }

}



}
function resetGame() {
    modal.style.display = "flex"
    gameover.style.display = "flex"
    startGame.style.display = "none"
    if (score > highScore) {
        highScore = score
        localStorage.setItem("highscore", highScore)
        high.textContent = `${highScore}`
    }
}
resetBtn.addEventListener("click", () => {

    clearInterval(moving);

    modal.style.display = "none"

    snake = [{ x: 1, y: 3 }]

    direction = "down"

    blocks[`${food.x}-${food.y}`].classList.remove("food")

    food = {

        x: Math.floor(Math.random() * rows),

        y: Math.floor(Math.random() * cols)

    }

    moving = setInterval(() => {

        render()

    }, 400)

    score = 0

    time = `00-00`

    currentScore.textContent = `${score}`

    currentTime.textContent = `${time}`

    high.textContent = `${highScore}`

})

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