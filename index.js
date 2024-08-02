
console.log("Hello World");
const canvas  = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024; // width of the screen in pixels
canvas.height = 576; // height of the screen in pixels

const scaledCanvas  = {
    width: canvas.width/4,
    height: canvas.height/4
}
const gravity = 0.5;

const tileCollisions2d = []
for (let i=0; i<tileCollisions.length; i+=36){
    tileCollisions2d.push(tileCollisions.slice(i,i+36))
}
const floorCollisions2d = []
for (let i=0; i<floorCollisions.length; i+=36){
    floorCollisions2d.push(floorCollisions.slice(i,i+36))
}


const collisoionBlocks = []
tileCollisions2d.forEach((row,y) => {
    row.forEach((symbol,x) => {
      if(symbol === 202){
        console.log('draw a block here')
        collisoionBlocks.push(new CollisoionBlock({
            position: {
                x:x*16, 
                y: y*16}
        }))

      }  
    })

})

floorCollisions2d.forEach((row,y) => {
    row.forEach((symbol,x) => {
      if(symbol === 202){
        console.log('draw a block here')
        collisoionBlocks.push(new CollisoionBlock({
            position: {
                x:x*16, 
                y: y*16}
        }))

      }  
    })

})





// player implementation
const player = new Player({
    position:{
        x: 0,
        y: 0    
    },
    collisoionBlocks
}
)
const keys = {
    d:{pressed: false},
    a:{pressed:false },

}

// sprites implementation
const background = new Sprite({position:{
    x:0,
    y:0
},
imageSrc: 'images/background.png'
})





function animate(){
    window.requestAnimationFrame(animate)
    
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(4,4)
    c.translate(0,-background.image.height+scaledCanvas.height)
    background.update()
    collisoionBlocks.forEach((CollisoionBlock)=>{
        CollisoionBlock.update()
    })
    c.restore()

    player.update()

    player.velocity.x =  0
    if (keys.d.pressed) player.velocity.x=5
    else if (keys.a.pressed) player.velocity.x = -5


}

animate()
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            break
        case 'a':
            keys.a.pressed = true;
            break
        case 'w':
            player.velocity.y = -20;
            break
        
  
        
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            player.velocity.x = 1;
            break
        case 'a':
            keys.a.pressed = false;
            player.velocity.x = -1;
            break        
    }
})