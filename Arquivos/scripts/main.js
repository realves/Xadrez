var canvas, render

const fps = 1000/30

window.onload = function()
{
    canvas = document.getElementById("mycanvas")
    render = canvas.getContext("2d")
    canvas.width = 640
    canvas.height = 640

    drawBoard()
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