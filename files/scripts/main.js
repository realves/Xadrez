let canvas, render, pieces_img, board, tileSize, selected
let whites = [], blacks = []
//let piece = { name: "", xPos: 0, yPos: 0, xImg: 0, yImg: 0, alive: false }

const fps = 1000/30

//configuracao inicial do jogo
window.onload = function()
{
    canvas = document.getElementById("mycanvas")
    render = canvas.getContext("2d")
    canvas.width = 640
    canvas.height = 640
    
    tileSize = canvas.width / 8
    
    pieces_img = new Image()
    pieces_img.src = "img/pieces.png"

    pieces_img.onload = initGame
}

function initGame()
{
    selected = null

    clearBoard()
    drawBoard()
    createPieces()
    drawPieces()
    addEventListener("mouseup", mouse_click)
}

//configuracao do tabuleiro
function clearBoard()
{
    render.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBoard()
{
    let white
    
    for(let i = 0; i < 8; i++)
    {
        white = i % 2 === 0

        for(let j = 0; j < 8; j++)
        {
            render.fillStyle = white ? "#a68b67" : "#534437"
            render.fillRect(i * tileSize, j * tileSize, tileSize, tileSize)

            white = !white
        }
    }
}

function createPieces()
{
    //cria as pecas brancas
    whites.push({ name: "king", x: 4, y: 7, img_x: 0, img_y: 0 })
    whites.push({ name: "queen", x: 3, y: 7, img_x: 200, img_y: 0 })
    whites.push
    (
        { name: "knight", x: 1, y: 7, img_x: 600, img_y: 0 },
        { name: "knight", x: 6, y: 7, img_x: 600, img_y: 0 }
    )
    whites.push
    (
        { name: "bishop", x: 2, y: 7, img_x: 400, img_y: 0 },
        { name: "bishop", x: 5, y: 7, img_x: 400, img_y: 0 }
    )
    whites.push
    (
        { name: "rooks", x: 0, y: 7, img_x: 800, img_y: 0 },
        { name: "rooks", x: 7, y: 7, img_x: 800, img_y: 0 }
    )
    for(let i = 0; i < 8; i++)
        whites.push({ name: "pawn", x: i, y: 6, img_x: 1000, img_y: 0 })

    //cria as pecas pretas
    blacks.push({ name: "king", x: 4, y: 0, img_x: 0, img_y: 200 })
    blacks.push({ name: "queen", x: 3, y: 0, img_x: 200, img_y: 200 })
    blacks.push
    (
        { name: "knight", x: 1, y: 0, img_x: 600, img_y: 200 },
        { name: "knight", x: 6, y: 0, img_x: 600, img_y: 200 }
    )
    blacks.push
    (
        { name: "bishop", x: 2, y: 0, img_x: 400, img_y: 200 },
        { name: "bishop", x: 5, y: 0, img_x: 400, img_y: 200 }
    )
    blacks.push
    (
        { name: "rooks", x: 0, y: 0, img_x: 800, img_y: 200 },
        { name: "rooks", x: 7, y: 0, img_x: 800, img_y: 200 }
    )
    for(let i = 0; i < 8; i++)
        blacks.push({ name: "pawn", x: i, y: 1, img_x: 1000, img_y: 200 })
}

function drawPieces()
{
    whites.forEach( piece => render.drawImage(pieces_img, piece.img_x, piece.img_y, 200, 200, piece.x * 80, piece.y * 80, 80, 80))
    blacks.forEach( piece => render.drawImage(pieces_img, piece.img_x, piece.img_y, 200, 200, piece.x * 80, piece.y * 80, 80, 80))
}

//input do jogador
function mouse_click(info)
{
    if(selected === null) selected = tileContent(Math.floor(info.offsetX / 80), Math.floor(info.offsetY / 80))

    else moveSelected(selected, Math.floor(info.offsetX / 80), Math.floor(info.offsetY / 80))
}

function tileContent(x, y)
{
    for(let i = 0; i < 16; i++)
    {
        if(whites[i].x === x && whites[i].y === y) return i
    }

    return null
}

function moveSelected(index, x, y)
{
    for(let i = 0; i < 16; i++)
    {
        if(whites[i].x === x && whites[i].y === y)
        {
            selected = null
            return
        }
    }

    whites[index].x = x
    whites[index].y = y

    clearBoard()
    drawBoard()
    drawPieces()

    selected = null
}