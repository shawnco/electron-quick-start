// For now assume we only ever have one canvas and thus one context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

const SUPERSIZE = 2000;
const GRID = 250;

// Specify a canvas context and 2 points
function drawPoint(p) {
    var radius = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
}

function drawLine(p1, p2, delta) {
    if(p1 === null || p2 === null){
        return;
    }
    ctx.beginPath();
    // ctx.moveTo(p1.x + (delta == null ? 0 : delta), p1.y + (delta == null ? 0 : delta));
    // ctx.lineTo(p2.x + (delta == null ? 0 : delta), p2.y + (delta == null ? 0 : delta));
    if(delta){
        ctx.moveTo(p1.x + delta, p1.y + delta);
        ctx.lineTo(p2.x + delta, p2.y + delta);
    }else{
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
    }
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

function eraseLine(p1, p2){
    if(p1 === null || p2 === null){
        return;
    }
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
}

// Return if the given pixel is white
function isWhite(x,y){
    var data = ctx.getImageData(x, y, 1, 1).data;
    return data[0] === 0 && data[1] === 0 && data[2] === 0 && data[3] === 0;
}

function generateCity(delta){
    const SIZE = 400
    var bbox = {
        xl: 0,
        xr: SIZE,
        yt: 0,
        yb: SIZE
    };
    
    // generate 5 random sites, let's go for broke
    var sites = [];
    for(var i=0; i<10; i++){
        sites.push(new Point(SIZE*Math.random(0, SIZE), SIZE*Math.random(0, SIZE)))
    }
    
    var v = new voronoi();
    var diagram = v.compute(sites, bbox);
    
    // draw the edges
    var edges = diagram.edges;
    for(var e in edges){
        if(edges[e].lSite === null || edges[e].rSite === null) break;
        drawLine(edges[e].lSite, edges[e].rSite, delta);
    }
    
    // draw the grid from top to bottom of diagram
    for(var i=0; i<SIZE; i+=10){
        // first go down to find first nonwhite
        console.log('rendering at',i);
        var topPt=0;
        var btmPt=0;
        for(j=0; j<SIZE; j++){
            if(!isWhite(i,j)){
                topPt=j;
                break;
            }
        }
        for(j=SIZE; j>0; j--){
            if(!isWhite(i,j)){
                btmPt=j;
                break;
            }
        }
        drawLine(new Point(i, topPt), new Point(i, btmPt));
    }
    
    // draw grid from left to right of diagram
    for(var i=0; i<SIZE; i+=10){
        console.log('rendering at',i);
        var leftPt=0;
        var rightPt=0;
        for(j=0; j<SIZE; j++){
            if(!isWhite(j,i)){
                leftPt=j;
                break;
            }
        }
        for(j=SIZE;j>0;j--){
            if(!isWhite(j,i)){
                rightPt=j;
                break;
            }
        }
        drawLine(new Point(leftPt,i), new Point(rightPt, i));
    }    
}

function drawSupergrid(){
    console.log('got to here at least')
    for(var i=0; i<SUPERSIZE; i+=GRID){
        drawLine(new Point(0, i), new Point(SUPERSIZE, i))
        drawLine(new Point(i, 0), new Point(i, SUPERSIZE))
    }
}

// Class definitions
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

