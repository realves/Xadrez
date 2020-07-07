let canvas, render, pieces_img, tileSize, board, selected = []

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
    //garante que nenhuma peca esteja selecionada no comeco da partida
    selected.length = 0
    
    configBoard()
    drawBoard()
    addEventListener("mouseup", function(event)
    {
        let mouseX = event.clientX - canvas.offsetLeft
        let mouseY = event.clientY - canvas.offsetTop
        if(mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height) movePiece(mouseX, mouseY)
    })
}

//configuracao do tabuleiro
function configBoard()
{
    //cria as linhas e colunas do tabuleiro
    board = []
    for(let i = 0; i < 8; i++) board[i] = new Array(8)

    //board armazena um numero entre 0 e 11 que determina
    //o tipo da peca que esta contida na posicao (x, y)
    //com base no vetor pieces
    for(let i = 0; i < 8; i++)
    {
        //posiciona as pecas da retaguarda
        board[i][7] = (i < 3) ? (4 - i) : (i - 3)
        board[i][0] = (i < 3) ? (10 - i) : (i + 3)

        //posiciona os peoes
        board[i][6] = 5
        board[i][1] = 11
    }
}

function drawBoard()
{
    //limpa o canvas para nao haver sobreposicoes
    render.clearRect(0, 0, canvas.width, canvas.height)

    let white
    
    for(let i = 0; i < 8; i++)
    {
        //garante que as linhas sempre comecem alternando as cores
        white = i % 2 === 0

        for(let j = 0; j < 8; j++)
        {
            //desenha as casas do tabuleiro
            render.fillStyle = white ? "#a68b67" : "#534437"
            render.fillRect(i * tileSize, j * tileSize, tileSize, tileSize)

            white = !white

            //caso a posicao (i, j) no tabuleiro nao esteja vazia
            if(board[i][j] !== undefined) drawPiece(pieces[ board[i][j] ], i * tileSize, j * tileSize)
        }
    }
}

function drawPiece(piece, x, y)
{
    //desenha a peca pegando as informacoes do vetor pieces
    render.drawImage(pieces_img, piece.xImg, piece.yImg, 200, 200, x, y, tileSize, tileSize)
}

//input do jogador
function movePiece(mouseX, mouseY)
{
    //caso nenhuma peca tenha sido selecionada anteriormente
    if(selected.length === 0)
    {
        let x = Math.floor(mouseX / tileSize)
        let y = Math.floor(mouseY / tileSize)
    
        if(board[x][y] !== undefined)
        {
            //salva a posicao selecionada
            selected = [x, y]
            //procura os movimentos possiveis
            pieces[ board[x][y] ].movement(x, y)
        }
    }
    
    else
    {
        let x = Math.floor(mouseX / tileSize)
        let y = Math.floor(mouseY / tileSize)

        //caso a posicao esteja vazia
        if(board[x][y] === undefined)
        {
            //troca a posicao da peca para a nova posicao selecionada
            board[x][y] = board[ selected[0] ][ selected[1] ]
            board[ selected[0] ][ selected[1] ] = undefined
        }

        drawBoard()

        //tira a selecao
        selected.length = 0
    }
}

//procura os movimentos validos
function kingMovement()
{
    
}

function queenMovement()
{

}

function bishopMovement()
{

}

function knightMovement(index)
{
    console.log(
        whites[index].x + 1, whites[index].y - 2,
        whites[index].x - 1, whites[index].y - 2
    )
}

function rookMovement()
{

}

function pawnMovement(x, y)
{
    drawMovement(x, y - 1)
    drawMovement(x, y - 2)
}

//desenha os movimentos validos
function drawMovement(x, y)
{
    render.beginPath()
    render.arc(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, tileSize * .15, 0, 2 * Math.PI)
    render.fillStyle = "#fffc"
    render.fill()
}