let canvas, render, pieces_img, tileSize, board = [], selected, moves = [], captures = [], windowSize, turn

let pieces = 
[
    { name: "w_queen", xImg: 200, yImg: 0, movement: move_queen },
    { name: "w_king", xImg: 0, yImg: 0, movement: move_king },
    { name: "w_bishop", xImg: 400, yImg: 0, movement: move_bishop },
    { name: "w_knight", xImg: 600, yImg: 0, movement: move_knight },
    { name: "w_rook", xImg: 800, yImg: 0, movement: move_rook },
    { name: "w_pawn", xImg: 1000, yImg: 0, movement: move_pawn },

    { name: "b_queen", xImg: 200, yImg: 200, movement: move_queen },
    { name: "b_king", xImg: 0, yImg: 200, movement: move_king },
    { name: "b_bishop", xImg: 400, yImg: 200, movement: move_bishop },
    { name: "b_knight", xImg: 600, yImg: 200, movement: move_knight },
    { name: "b_rook", xImg: 800, yImg: 200, movement: move_rook },
    { name: "b_pawn", xImg: 1000, yImg: 200, movement: move_pawn },
]

//configuracao inicial do jogo
window.onload = function()
{
    canvas = document.getElementById("mycanvas")
    render = canvas.getContext("2d")

    //garante que o canvas caiba na janela
    windowSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight
    canvas.width = windowSize * .9
    canvas.height = windowSize * .9
    
    tileSize = canvas.width / 8
    
    pieces_img = new Image()
    pieces_img.src = "img/pieces.png"

    pieces_img.onload = initGame
}

//inicia o jogo
function initGame()
{
    //reseta as variaveis
    selected = -1
    board.length = 0
    moves.length = 0
    captures.length = 0
    //0 = turno das brancas, 200 = turno das pretas
    turn = 0
    
    configBoard()
    canvas_config()
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
    //cria o vetor do tabuleiro
    board.length = 64

    //board armazena um numero entre 0 e 11 que determina
    //o tipo da peca que esta contida na posicao (x, y)
    //com base no vetor pieces
    //sendo x = index % 8, y = index / 8, index = x + y * 8
    for(let i = 0; i < 8; i++)
    {
        //posiciona as pecas da retaguarda
        board[i + 7 * 8] = (i < 3) ? (4 - i) : (i - 3)
        board[i] = (i < 3) ? (10 - i) : (i + 3)

        //posiciona os peoes
        board[i + 6 * 8] = 5
        board[i + 8] = 11
    }
}

//input do jogador
function movePiece(mouseX, mouseY)
{
    //caso nenhuma peca tenha sido selecionada anteriormente
    if(selected === -1)
    {
        let x = Math.floor(mouseX / tileSize)
        let y = Math.floor(mouseY / tileSize)
    
        if(board[x + y * 8] !== undefined)
        {
            //salva a posicao selecionada
            selected = x + y * 8

            //caso a cor da peca selecionada seja a mesma do turno, procura os movimentos possiveis
            if(pieces[ board[selected] ].yImg === turn) pieces[ board[selected] ].movement(x, y)

            else selected = -1
        }
    }
    
    else
    {
        let x = Math.floor(mouseX / tileSize)
        let y = Math.floor(mouseY / tileSize)

        //caso a posicao esteja vazia
        if(moves.includes(x + y * 8) || captures.includes(x + y * 8))
        {
            //troca a posicao da peca para a nova posicao selecionada
            board[x + y * 8] = board[selected]
            board[selected] = undefined

            //troca o turno
            turn = turn === 0 ? 200 : 0
        }

        canvas_board()

        //remove a selecao
        selected = -1
        moves.length = 0
        captures.length = 0
    }
}