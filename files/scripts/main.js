let canvas, render, pieces_img, tileSize, board = [], selected, moves = [], captures = [], windowSize, turn

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
    drawBoard()
    addEventListener("mouseup", function(event)
    {
        let mouseX = event.clientX - canvas.offsetLeft
        let mouseY = event.clientY - canvas.offsetTop
        if(mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height) movePiece(mouseX, mouseY)
    })

    setInterval(canvasSize, 1000)
}

//garante que o tamanho do canvas se adapte a janela
function canvasSize()
{
    let newSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight
    if(newSize !== windowSize)
    {
        windowSize = newSize

        canvas.width = windowSize * .9
        canvas.height = windowSize * .9
    
        tileSize = canvas.width / 8

        drawBoard()
    }
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
            render.fillStyle = white ? "#a68b67" : "#5f5043"
            render.fillRect(i * tileSize, j * tileSize, tileSize, tileSize)

            white = !white

            //caso a posicao (i, j) no tabuleiro nao esteja vazia
            if(board[i + j * 8] !== undefined) drawPiece(pieces[ board[i + j * 8] ], i * tileSize, j * tileSize)
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

        drawBoard()

        //remove a selecao
        selected = -1
        moves.length = 0
        captures.length = 0
    }
}

//movimento das pecas
function kingMovement(x, y)
{
    //para as casas no eixo x
    for(let i = -1; i < 2; i++)
    {
        //para as casas no eixo y
        for(let j = -1; j < 2; j++)
        {
            //caso a casa em questao seja valida
            if(x + i >= 0 && x + i <= 7 && y + j >= 0 && y + j <= 7)
            {
                let pos = (x + i) + (y + j) * 8
                //checa se o movimento e possivel
                if(board[pos] === undefined) moves.push(pos)
                
                //checa se a captura e possivel
                else if(pieces[ board[selected] ].yImg === 0 && pieces[ board[pos] ].yImg === 200
                    || pieces[ board[selected] ].yImg === 200 && pieces[ board[pos] ].yImg === 0) captures.push(pos)
            }
        }
    }

    if(moves.length > 0 || captures.length > 0) drawMovement()
    else selected = -1
}

function queenMovement(x, y)
{
    diagMovement(x, y)
    vertHorMovement(x, y)

    if(moves.length > 0 || captures.length > 0) drawMovement()
    else selected = -1
}

function bishopMovement(x, y)
{
    diagMovement(x, y)

    if(moves.length > 0 || captures.length > 0) drawMovement()
    else selected = -1
}

function knightMovement(x, y)
{
    for(let i = -2; i <= 2; i += 4)
    {
        //primeira iteracao = (x-2, y-1), (x-2, y+1)
        //segunda iteracao = (x+2, y+1), (x+2, y-1)
        let j = i / 2
        do
        {
            //caso esteja dentro do tabuleiro
            if(x + i >= 0 && x + i <= 7 && y + j >= 0 && y + j <= 7)
            {
                let pos = (x + i) + (y + j) * 8
                //checa se o movimento e possivel
                if(board[pos] === undefined) moves.push(pos)
                
                //checa se a captura e possivel
                else if(pieces[ board[selected] ].yImg === 0 && pieces[ board[pos] ].yImg === 200
                    || pieces[ board[selected] ].yImg === 200 && pieces[ board[pos] ].yImg === 0) captures.push(pos)
            }

            j -= i
        } while(j !== -6 / i)
    }

    for(let i = -1; i <= 1; i += 2)
    {
        //primeira iteracao = (x-1, y+2), (x-1, y-2)
        //segunda iteracao = (x+1, y-2), (x+1, y+2)
        let j = i * 2
        do
        {
            //caso esteja dentro do tabuleiro
            if(x + i >= 0 && x + i <= 7 && y + j >= 0 && y + j <= 7)
            {
                let pos = (x + i) + (y + j) * 8
                //checa se o movimento e possivel
                if(board[pos] === undefined) moves.push(pos)
                
                //checa se a captura e possivel
                else if(pieces[ board[selected] ].yImg === 0 && pieces[ board[pos] ].yImg === 200
                    || pieces[ board[selected] ].yImg === 200 && pieces[ board[pos] ].yImg === 0) captures.push(pos)
            }

            j -= i * 4
        } while(j !== -6 / i)
    }

    if(moves.length > 0 || captures.length > 0) drawMovement()
    else selected = -1
}

function rookMovement(x, y)
{
    vertHorMovement(x, y)

    if(moves.length > 0 || captures.length > 0) drawMovement()
    else selected = -1
}

function pawnMovement(x, y)
{
    //peao branco
    if(pieces[ board[selected] ].yImg === 0)
    {
        //caso haja alguma casa acima
        if(y - 1 >= 0)
        {
            //checa os movimentos possiveis
            if(board[ x + (y - 1) * 8 ] === undefined)
            {
                moves.push(x + (y - 1) * 8)
    
                //caso seja o primeiro movimento, checa se a segunda casa acima esta vazia
                if(y === 6 && board[ x + (y - 2) * 8 ] === undefined) moves.push(x + (y - 2) * 8)
            }

            //checa as capturas possiveis
            if(x - 1 >= 0 && board[ (x - 1) + (y - 1) * 8] !== undefined && pieces[board[ (x - 1) + (y - 1) * 8]].yImg === 200)
            {
                captures.push((x - 1) + (y - 1) * 8)
            }
            if(x + 1 <= 7 && board[ (x + 1) + (y - 1) * 8] !== undefined && pieces[board[ (x + 1) + (y - 1) * 8]].yImg === 200)
            {
                captures.push((x + 1) + (y - 1) * 8)
            }
        }
    }
    //peao preto, mesmos procedimentos acima
    else
    {
        if(y + 1 <= 7)
        {
            if(board[ x + (y + 1) * 8 ] === undefined)
            {
                moves.push(x + (y + 1) * 8)

                if(y === 1 && board[ x + (y + 2) * 8 ] === undefined) moves.push(x + (y + 2) * 8)
            }

            if(x - 1 >= 0 && board[ (x - 1) + (y + 1) * 8] !== undefined && pieces[board[ (x - 1) + (y + 1) * 8]].yImg === 0)
            {
                captures.push((x - 1) + (y + 1) * 8)
            }
            if(x + 1 <= 7 && board[ (x + 1) + (y + 1) * 8] !== undefined && pieces[board[ (x + 1) + (y + 1) * 8]].yImg === 0)
            {
                captures.push((x + 1) + (y + 1) * 8)
            }
        }
    }

    if(moves.length > 0 || captures.length > 0) drawMovement()
    else selected = -1
}

function drawMovement()
{
    //mostra as capturas possiveis
    render.strokeStyle = "#a00c"

    captures.forEach(pos => {
        render.strokeRect(pos % 8 * tileSize, Math.floor(pos / 8) * tileSize, tileSize, tileSize)
    });

    //mostra os movimentos possiveis
    render.fillStyle = "#000c"

    moves.forEach(pos => {
        let x = pos % 8 * tileSize + tileSize / 2
        let y = Math.floor(pos / 8) * tileSize + tileSize / 2

        render.beginPath()
        render.arc(x, y, tileSize * .15, 0, 2 * Math.PI)
        render.fill()
    })

    //destaca a peca selecionada
    render.strokeStyle = "#000c"
    render.lineWidth = 2
    render.strokeRect(selected % 8 * tileSize, Math.floor(selected / 8) * tileSize, tileSize, tileSize)
}

//movimento diagonal
function diagMovement(x, y)
{
    let k, l, blocked

    for(let i = -1; i <= 1; i += 2)
    {
        for(let j = -1; j <= 1; j += 2)
        {
            //ordem das iteracoes: diagonais supeior esquerda,
            //inferior esquerda, superior direita, inferior direita

            k = i
            l = j
            blocked = false

            //caso a casa esteja dentro do tabuleiro
            while(x + k >= 0 && x + k <= 7 && y + l >= 0 && y + l <= 7 && !blocked)
            {
                let pos = (x + k) + (y + l) * 8

                //caso a casa esteja vazia, o movimento e valido
                if(board[pos] === undefined) moves.push(pos)
    
                else
                {
                    blocked = true
    
                    //caso a peca seja de outra cor, a captura e valida
                    if(pieces[ board[selected] ].yImg === 0 && pieces[ board[pos] ].yImg === 200
                        || pieces[ board[selected] ].yImg === 200 && pieces[ board[pos] ].yImg === 0) captures.push(pos)
                }

                k += i
                l += j
            }
        }
    }
}

//movimento vertical e horizontal
function vertHorMovement(x, y)
{
    let j, blocked

    for(let i = -1; i <= 1; i += 2)
    {
        //casas no eixo x
        //primeira iteracao = casas a esquerda
        //segunda iteracao = casas a direita
        j = i
        blocked = false

        //caso a casa esteja dentro do tabuleiro
        while(x + j >= 0 && x + j <= 7 && !blocked)
        {
            let pos = (x + j) + y * 8

            //caso a casa esteja vazia, o movimento e valido
            if(board[pos] === undefined) moves.push(pos)

            else
            {
                blocked = true

                //caso a peca seja de outra cor, a captura e valida
                if(pieces[ board[selected] ].yImg === 0 && pieces[ board[pos] ].yImg === 200
                    || pieces[ board[selected] ].yImg === 200 && pieces[ board[pos] ].yImg === 0) captures.push(pos)
            }

            j += i
        }

        //casas no eixo y, mesmo procedimento acima
        //primeira iteracao = casas acima
        //segunda iteracao = casas abaixo
        j = i
        blocked = false

        while(y + j >= 0 && y + j <= 7 && !blocked)
        {
            let pos = x + (y + j) * 8

            if(board[pos] === undefined) moves.push(pos)

            else
            {
                blocked = true

                if(pieces[ board[selected] ].yImg === 0 && pieces[ board[pos] ].yImg === 200
                    || pieces[ board[selected] ].yImg === 200 && pieces[ board[pos] ].yImg === 0) captures.push(pos)
            }

            j += i
        }
    }
}