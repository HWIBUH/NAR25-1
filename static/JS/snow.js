canvas = document.getElementById("snow-canvas");
ctx = canvas.getContext("2d");

width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;

const maxSnow = 30;
let snow = [];

class snowflake{
    constructor(x, y, r, spd)
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.spd = spd;
        this.start = 0;
        this.end = 2*Math.PI
    }

    draw()
    {
        ctx.beginPath();
        // ctx.fillStyle = "#153C39";
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, this.r, this.start, this.end);
        ctx.fill();
    }

    fall()
    {
        this.y += this.spd;
    }
}

setInterval(() => {
    let x = Math.random()*canvas.width;
    let r = Math.random()*3 + 2.5;
    let spd = Math.random()*1.5 + 0.2;
    if(snow.length < maxSnow)
    {
        snow.push(new snowflake(x, 0, r, spd));
    }
}, 200);

function snowFall()
{
    ctx.clearRect(0, 0, width, height);
    for(let i=snow.length-1; i>=0; i--)
    {
        snow[i].draw();
        snow[i].fall();

        if(snow[i].y > height)
        {
            snow.splice(i, 1);
        }
    }
    requestAnimationFrame(snowFall);
}

snowFall();