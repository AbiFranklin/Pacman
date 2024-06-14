const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")
const pacmanFrames = document.getElementById("animations")
const ghostFrames = document.getElementById("ghosts")

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height)
}

let fsp = 30;
let oneBlockSize = 20
let wallColor = "#342DCA"
let wallInnerColor = "black"
let wallSpaceSize = oneBlockSize / 1.5
let wallOffset = (oneBlockSize - wallSpaceSize) / 2

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3
const DIRECTION_LEFT = 2
const DIRECTION_BOTTOM = 1

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let gameLoop = () => {
    update()
    draw()
}

let update = () => {
    pacman.moveProcess()
}

let draw = () => {
    //Write Code
    createRect(0, 0, canvas.width, canvas.height, "black")
    drawWalls()

    pacman.draw()
}

let gameInterval = setInterval(gameLoop, 1000 / fsp);

let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 1) {
                createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, wallColor)
                if (j > 0 && map[i][j - 1] == 1) {
                    createRect(j * oneBlockSize, i * oneBlockSize + wallOffset, wallSpaceSize + wallOffset, wallSpaceSize, wallInnerColor)
                }
                if (j < map[0].length - 1 && map[i][j + 1] === 1) {
                    createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceSize + wallOffset, wallSpaceSize, wallInnerColor)
                }
                if (i > 0 && map[i - 1][j] == 1) {
                    createRect(j * oneBlockSize + wallOffset, i * oneBlockSize, wallSpaceSize, wallSpaceSize + wallOffset, wallInnerColor)
                }
                if (i < map.length - 1 && map[i + 1][j] === 1) {
                    createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceSize, wallSpaceSize + wallOffset, wallInnerColor)
                }
            }
        }
    }
}

let createNewPacman = () => {
    pacman = new Pacman(oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize / 5)
}

createNewPacman()
gameLoop()

window.addEventListener("keydown", (event) => {
    let k = event.keyCode

    setTimeout(() => {
        if (k == 37 || k == 65) {
            //left
            pacman.nextDirection = DIRECTION_LEFT
        }
        else if (k == 38 || k == 87) {
            //up
            pacman.nextDirection = DIRECTION_UP
        }
        else if (k == 39 || k == 68) {
            //right
            pacman.nextDirection = DIRECTION_RIGHT
        }
        else if (k == 40 || k == 83) {
            //down
            pacman.nextDirection = DIRECTION_BOTTOM
        }
    }, 1)
})