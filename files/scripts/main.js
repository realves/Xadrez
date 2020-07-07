let canvas, render, pieces_img, tileSize, board = [], selected = []

let pieces = 
[
    { name: "w_queen", xImg: 200, yImg: 0, movement: queenMovement },
    { name: "w_king", xImg: 0, yImg: 0, movement: kingMovement },
    { name: "w_bishop", xImg: 400, yImg: 0, movement: bishopMovement },
    { name: "w_knight", xImg: 600, yImg: 0, movement: knightMovement },
    { name: "w_rook", xImg: 800, yImg: 0, movement: rookMovement },
    { name: "w_pawn", xImg: 1000, yImg: 0, movement: pawnMovement },

    { name: "b_queen", xImg: 200, yImg: 200, movement: queenMovement },
    { name: "b_king", xImg: 0, yImg: 200, movement: kingMovement },
    { name: "b_bishop", xImg: 400, yImg: 200, movement: bishopMovement },
    { name: "b_knight", xImg: 600, yImg: 200, movement: knightMovement },
    { name: "b_rook", xImg: 800, yImg: 200, movement: rookMovement },
    { name: "b_pawn", xImg: 1000, yImg: 200, movement: pawnMovement },
]

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
    selected.length = 0
    
    createPieces()
    drawBoard()
    addEventListener("mouseup", function(event)
    {
        let mouseX = event.clientX - canvas.offsetLeft
        let mouseY = event.clientY - canvas.offsetTop
        if(mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height) movePiece(mouseX, mouseY)
    })
}

//configuracao do tabuleiro
function createPieces()
{
    for(let i = 0; i < 8; i++) board[i] = new Array(7)

    for(let i = 0; i < 8; i++)
    {
        board[i][7] = (i < 3) ? (4 - i) : (i - 3)
        board[i][0] = (i < 3) ? (10 - i) : (i + 3)

        board[i][6] = 5
        board[i][1] = 11
    }
}

function drawBoard()
{
    render.clearRect(0, 0, canvas.width, canvas.height)

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

    drawPieces()
}

function drawPieces()
{
    for(let i = 0; i < 8; i++)
    {
        for(let j = 0; j < 8; j++)
        {
            if(board[i][j] !== undefined)
            {
                render.drawImage
                (
                    pieces_img, pieces[ board[i][j] ].xImg, pieces[ board[i][j] ].yImg, 200, 200,
                    i * tileSize, j * tileSize, tileSize, tileSize
                )
            }
        }
    }
}

//input do jogador
function movePiece(mouseX, mouseY)
{
    if(selected.length === 0)
    {
        let x = Math.floor(mouseX / tileSize)
        let y = Math.floor(mouseY / tileSize)
    
        if(board[x][y] !== undefined) selected = [x, y]
    }
    
    else
    {
        let x = Math.floor(mouseX / tileSize)
        let y = Math.floor(mouseY / tileSize)
    
        if(board[x][y] === undefined)
        {
            board[x][y] = board[ selected[0] ][ selected[1] ]
            board[ selected[0] ][ selected[1] ] = undefined
            drawBoard()
        }

        selected.length = 0
    }
}

function kingMovement(index)
{
    let tiles = {}

    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            //if()
        }
    }
}

function queenMovement(index)
{

}

function bishopMovement(index)
{

}

function knightMovement(index)
{
    console.log(
        whites[index].x + 1, whites[index].y - 2,
        whites[index].x - 1, whites[index].y - 2
    )
}

function rookMovement(index)
{

}

function pawnMovement(index)
{
    console.log(whites[index].x, whites[index].y -1)
}