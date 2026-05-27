const board = document.querySelector(".board")

const boxWidth = 50;
const boxheight = 50;

const cols = Math.floor(board.clientWidth / boxWidth)
const rows = Math.floor(board.clientHeight / boxheight)

let blocks = []
let snake = [{ x: 1, y: 3 }, { x: 1, y: 2 }, { x: 1, y: 1 }]
let direction = "right"

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
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })
}

setInterval(() => {
    let head = null;

    if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
        snake.unshift(head)
        snake.forEach(segment => {
            blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
        })
    }
    else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
        snake.unshift(head)
        snake.forEach(segment => {
            blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
        })
    }
    else if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
        snake.unshift(head)
        snake.forEach(segment => {
            blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
        })
    }
    else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
        snake.unshift(head)
        snake.forEach(segment => {
            blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
        })
    }
        snake.pop()


    render()
}, 400)