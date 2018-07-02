// generate the noise
var noise = new SimplexNoise('seed')

for(var i=0; i<2000; i+=10){
    for(var j=0; j<2000; j+=10){
        value = noise.noise2D(i*.00625, j*.00625);
        // console.log(value)
        if(value<0){
            color='#000000'
        }else{
            color='#0000ff';
        }
        ctx.fillStyle = color;
        ctx.fillRect(i, j, 20, 20);
    }
}