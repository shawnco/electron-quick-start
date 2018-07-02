// const CITIES_TO_GEN = 3;

// for(var i=0; i<CITIES_TO_GEN; i++){
//     console.log('generating city', i);
//     // pick the offset to generate it at
//     offTop = Math.floor(Math.random()*5)*GRID;
//     offLeft =  Math.floor(Math.random()*5)*GRID;
//     delta = Math.sqrt((offTop*offTop) + (offLeft*offLeft));
//     generateCity(delta);
// }
// generateCity(0);
generateCity(1000);
drawSupergrid();