import { VIEWSETTINGS } from './viewSettings.js';

export async function createBackgroundFar(app) {

    let backgroundfar_layer = new PIXI.Container();
    backgroundfar_layer.position.set(0,0);

    backgroundfar_layer.addChild(loadMoonFar(320, 50))
    loadGroundMultiFar(app, backgroundfar_layer, 64, 100, 0.5)
    loadGroundMultiFar(app, backgroundfar_layer, 64, 116, 0.5)
    backgroundfar_layer.addChild(loadTreeFar(app, backgroundfar_layer, 32, 60))
    backgroundfar_layer.addChild(loadTreeFar(app, backgroundfar_layer, 100, 60))
    backgroundfar_layer.addChild(loadTreeFar(app, backgroundfar_layer, 150, 60))
    backgroundfar_layer.addChild(loadTreeFar(app, backgroundfar_layer, 256, 60))
    backgroundfar_layer.addChild(loadTreeFar(app, backgroundfar_layer, 324, 60))
    backgroundfar_layer.addChild(loadTreeFar(app, backgroundfar_layer, 400, 60))
    backgroundfar_layer.addChild(loadTreeFar(app, backgroundfar_layer, 500, 60))
    backgroundfar_layer.addChild(loadTreeFar(app, backgroundfar_layer, 560, 60))
    backgroundfar_layer.addChild(loadTreeFar(app, backgroundfar_layer, 600, 60))

    return backgroundfar_layer
}

function loadTreeFar(app, container, xpos, ypos) { 
    const X_POS_REUSE = -64
    let tree = PIXI.Sprite.from('../images/tree.png');
    tree.scale.x = 0.5;
    tree.scale.y = 0.5;
    tree.x = xpos
    tree.y =  ypos
    app.ticker.add((delta) => {
        if (tree.x < X_POS_REUSE) {
            tree.x = VIEWSETTINGS.width + 1
        }
        tree.x -= 0.4
        
    });

    return tree
}

function loadMoonFar(xpos, ypos, scale) { 
    let moon = PIXI.Sprite.from('../images/moon.png');
    moon.anchor.set(0.5, 0.5)
    moon.x = xpos
    moon.y = ypos

    return moon
}

function loadGroundFar(app, container, xpos, ypos) { 
    const X_POS_REUSE = -32
    let ground = PIXI.Sprite.from('../images/ground.png');
    ground.anchor.set(0.5, 0.5)
    //ground.anchor.set(0.5, 0.0)
    ground.scale.x = 0.5;
    ground.scale.y = 0.5;
    ground.x = xpos
    ground.y =  ypos
    app.ticker.add((delta) => {
        if (ground.x < X_POS_REUSE) {
            ground.x = VIEWSETTINGS.width + 1
        }
        ground.x -= 0.4
        
    });

    return ground
}

function loadGroundMultiFar(app, layer, xstart, ystart, scale) {
    var count = 12
    for (var i = 0; i < count; ++i) {
        layer.addChildAt(
                loadGroundFar(app, layer, xstart + (scale*128*i), ystart, scale), 0)
    }
}