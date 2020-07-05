var canvas, render, pieces_img, heart
/*var w_king, w_queen, b_king, b_queen
var w_bishops, w_knights, w_rooks, w_pawns
var b_bishops, b_knights, b_rooks, b_pawns*/
var w_king = { x: 320, y: 540, img_x: 0, img_y: 0 }

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

    pieces_img.onload = initGame()
}

function initGame()
{
    drawBoard()
    drawPieces()
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

function drawPieces()
{
    render.drawImage(pieces_img, 0, 0)
}

/*var king = function(white, x, y)
{
    let img_x = 0
    let img_y = white ? 0 : 200
    let pos_x = x
    let pos_y = y
}

var queen = function(white, x, y)
{
    let img_x = 200
    let img_y = white ? 0 : 200
    let pos_x = x
    let pos_y = y
}

var bishop = function(white)
{
    let img_x = 400
    let img_y = white ? 0 : 200
}

var knight = function(white)
{
    let img_x = 600
    let img_y = white ? 0 : 200
}

var rook = function(white)
{
    let img_x = 800
    let img_y = white ? 0 : 200
}

var pawn = function(white)
{
    let img_x = 1000
    let img_y = white ? 0 : 200
}*/