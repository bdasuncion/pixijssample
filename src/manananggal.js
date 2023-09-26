//import { sound } from '../node_modules/@pixi/sound';
//const manananggal_spriteSheet = 
class Manananggal {
    constructor() {
        this.width = 128
        this.height = 64
        this.path = '../images/manananggal/manananggal.bmp'
    }
}

//sound.add('deathroar', '../sounds/deathroar.wav');
export async function loadManananggal(app, maskContainer, xpos, ypos) { 
    const spritesheetpath = '../images/manananggal/manananggal_spritesheet.json'
    const MAX_SCALE = 1.5
    const DELTA_XMAX = 96
    const DIRECTION_LEFT = -1
    const DIRECTION_RIGHT = 1
    var deltaX = 0, direction = DIRECTION_LEFT 
    await PIXI.Assets.load(spritesheetpath)
    const animations = PIXI.Assets.cache.get(spritesheetpath).data.animations;
    const flyAnimation = PIXI.AnimatedSprite.fromFrames(animations["fly"]);
    const dieAnimation = PIXI.AnimatedSprite.fromFrames(animations["die"]);
    var x = xpos, y = ypos
    flyAnimation.animationSpeed = 1 / 6;                     // 6 fps
    flyAnimation.position.set(x, y);
    flyAnimation.play();
    maskContainer.addChildAt(flyAnimation, 0)

    flyAnimation.eventMode = 'static'
    flyAnimation.onclick = (event) => {     
        //PIXI.Sound.from('../sounds/deathroar.wav')
        //sound.play()
        //sound.play('deathroar')
        removeManananggal(flyAnimation, dieAnimation, maskContainer)
    }

    flyAnimation.scale.x = 0.5;
    flyAnimation.scale.y = 0.5;
    //character.x = 1024
    app.ticker.add((delta) => {
        //character.x += 0.5
       // character.scale.x += 0.01;
       // character.scale.y += 0.01;
       var move = 0
       if (deltaX < -DELTA_XMAX && direction == DIRECTION_LEFT) {
        direction = DIRECTION_RIGHT
       } else if (deltaX > DELTA_XMAX && direction == DIRECTION_RIGHT) {
        direction = DIRECTION_LEFT
       }

       if (flyAnimation.scale.x < MAX_SCALE) {
            flyAnimation.scale.x += 0.01;
            flyAnimation.scale.y += 0.01;
       }

       deltaX += direction
       flyAnimation.position.x += direction*2

    });

    return flyAnimation
}

function removeManananggal(flyAnimation, dieAnimation, maskContainer) {
    maskContainer.removeChild(flyAnimation)
    dieAnimation.animationSpeed = 1 / 6;                     // 6 fps
    dieAnimation.position.set(flyAnimation.position.x, flyAnimation.position.y);
    dieAnimation.loop = false
    dieAnimation.scale.x = flyAnimation.scale.x
    dieAnimation.scale.y = flyAnimation.scale.y
    dieAnimation.onFrameChange = (current) => {
        dieAnimation.setTransform(flyAnimation.position.x, flyAnimation.position.y,
            flyAnimation.scale.x, flyAnimation.scale.y, current*0.3, 0, 0)
    }
    dieAnimation.play();
    maskContainer.addChild(dieAnimation)
    dieAnimation. onComplete  = () => {
        dieAnimation.renderable = false
    }
}