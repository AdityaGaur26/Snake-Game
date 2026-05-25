const board = document.querySelector(".board")

const boxWidth = 30;
const boxheight = 30;

const cols = Math.floor(board.clientWidth/boxWidth)
const rows = Math.floor(board.clientHeight/boxheight)


for(let i = 0; i < cols*rows; i++){
    let block = document.createElement("div")
    block.classList.add("block")
    board.appendChild(block)
}