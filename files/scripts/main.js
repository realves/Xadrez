let canvas, render, pieces_img
let whites = [], blacks = []

const fps = 1000/30

//configuracao inicial do jogo
window.onload = function()
{
    canvas = document.getElementById("mycanvas")
    render = canvas.getContext("2d")
    canvas.width = 640
    canvas.height = 640
    
    pieces_img = new Image()
    pieces_img.src = "img/pieces.png"

    pieces_img.onload = initGame
}

function initGame()
{
    clearBoard()
    drawBoard()
    createPieces()
    drawPieces()
}

function clearBoard()
{
    render.clearRect(0, 0, canvas.width, canvas.height)
}

function drawBoard()
{
    let white
    let tileSize = canvas.width / 8
    
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
    whites.push({ name: "king", x: 320, y: 560, img_x: 0, img_y: 0 })
    whites.push({ name: "queen", x: 240, y: 560, img_x: 200, img_y: 0})
    whites.push
    (
        { name: "knight", x: 80, y: 560, img_x: 600, img_y: 0 },
        { name: "knight", x: 480, y: 560, img_x: 600, img_y: 0 }
    )
    whites.push
    (
        { name: "bishop", x: 160, y: 560, img_x: 400, img_y: 0 },
        { name: "bishop", x: 400, y: 560, img_x: 400, img_y: 0 }
    )
    whites.push
    (
        { name: "rooks", x: 0, y: 560, img_x: 800, img_y: 0 },
        { name: "rooks", x: 560, y: 560, img_x: 800, img_y: 0 }
    )
    for(let i = 0; i < 8; i++)
        whites.push({ name: "pawn", x: i * 80, y: 480, img_x: 1000, img_y: 0 })

    //cria as pecas pretas
    blacks.push({ name: "king", x: 320, y: 0, img_x: 0, img_y: 200 })
    blacks.push({ name: "queen", x: 240, y: 0, img_x: 200, img_y: 200})
    blacks.push
    (
        { name: "knight", x: 80, y: 0, img_x: 600, img_y: 200 },
        { name: "knight", x: 480, y: 0, img_x: 600, img_y: 200 }
    )
    blacks.push
    (
        { name: "bishop", x: 160, y: 0, img_x: 400, img_y: 200 },
        { name: "bishop", x: 400, y: 0, img_x: 400, img_y: 200 }
    )
    blacks.push
    (
        { name: "rooks", x: 0, y: 0, img_x: 800, img_y: 200 },
        { name: "rooks", x: 560, y: 0, img_x: 800, img_y: 200 }
    )
    for(let i = 0; i < 8; i++)
        blacks.push({ name: "pawn", x: i * 80, y: 80, img_x: 1000, img_y: 200 })
}

function drawPieces(piece)
{
    whites.forEach( piece => render.drawImage(pieces_img, piece.img_x, piece.img_y, 200, 200, piece.x, piece.y, 80, 80))
    blacks.forEach( piece => render.drawImage(pieces_img, piece.img_x, piece.img_y, 200, 200, piece.x, piece.y, 80, 80))
}