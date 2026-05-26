const board = document.querySelector(".board")

const boxWidth = 50;
const boxheight = 50;

const cols = Math.floor(board.clientWidth / boxWidth)
const rows = Math.floor(board.clientHeight / boxheight)

let blocks = []
let snake = [{ x: 1, y: 3 }, { x: 1, y: 2 }, { x: 1, y: 1 }]

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        block.textContent = `${row},${col}`
        blocks[`${row},${col}`] = block
    }
}

