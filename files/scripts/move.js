function move_king(x, y)
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

    if(moves.length > 0 || captures.length > 0) canvas_movement()
    else selected = -1
}

function move_queen(x, y)
{
    move_diag(x, y)
    move_vert(x, y)

    if(moves.length > 0 || captures.length > 0) canvas_movement()
    else selected = -1
}

function move_bishop(x, y)
{
    move_diag(x, y)

    if(moves.length > 0 || captures.length > 0) canvas_movement()
    else selected = -1
}

function move_knight(x, y)
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

    if(moves.length > 0 || captures.length > 0) canvas_movement()
    else selected = -1
}

function move_rook(x, y)
{
    move_vert(x, y)

    if(moves.length > 0 || captures.length > 0) canvas_movement()
    else selected = -1
}

function move_pawn(x, y)
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

    if(moves.length > 0 || captures.length > 0) canvas_movement()
    else selected = -1
}

//movimento diagonal
function move_diag(x, y)
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
function move_vert(x, y)
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