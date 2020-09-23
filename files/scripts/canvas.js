function canvas_config()
{
    setInterval(canvasSize, 1000)
    canvas_board()
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

        canvas_board()
    }
}

//desenha o tabuleiro
function canvas_board()
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
            if(board[i + j * 8] !== undefined) canvas_piece(pieces[ board[i + j * 8] ], i * tileSize, j * tileSize)
        }
    }
}

//desenha as pecas
function canvas_piece(piece, x, y)
{
    //desenha a peca pegando as informacoes do vetor pieces
    render.drawImage(pieces_img, piece.xImg, piece.yImg, 200, 200, x, y, tileSize, tileSize)
}

//desenha os movimentos possiveis
function canvas_movement()
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