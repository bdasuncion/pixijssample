import { VIEWSETTINGS } from './viewSettings.js';

export async function createForeground(app) {

    let foreground_layer = new PIXI.Container();
    foreground_layer.position.set(0,0);

    loadGroundMultiForeground(app, foreground_layer, 64,300, 2.5)
    foreground_layer.addChild(loadTreeMid(app, foreground_layer, 64,20))
    //foreground_layer.addChild(loadTreeMid(app, foreground_layer, 270, 20))
    foreground_layer.addChild(loadTreeMid(app, foreground_layer, 450, 20))
    //foreground_layer.addChild(loadTreeMid(app, foreground_layer, 600, 20))

    return foreground_layer
}

function loadTreeMid(app, container, xpos, ypos) { 
    const X_POS_REUSE = -64
    let tree = PIXI.Sprite.from('../images/tree.png');
    tree.scale.x = 2.5;
    tree.scale.y = 2.5;
    tree.x = xpos
    tree.y =  ypos
    app.ticker.add((delta) => {
        if (tree.x < (X_POS_REUSE*2)) {
            tree.x = (VIEWSETTINGS.width*2) + 1
        }
        tree.x -= 2.0
        
    });

    return tree
}

function loadGroundForeground(app, container, xpos, ypos) { 
    const X_POS_REUSE = -128
    let ground = PIXI.Sprite.from('../images/ground.png');
    ground.anchor.set(0.5, 0.5)
    //ground.anchor.set(0.5, 0.0)
    ground.scale.x = 2.5;
    ground.scale.y = 2.5;
    ground.x = xpos
    ground.y =  ypos
    app.ticker.add((delta) => {
        if (ground.x < X_POS_REUSE) {
            ground.x = VIEWSETTINGS.width + 1
        }
        ground.x -= 2.0
        
    });

    return ground
}

function loadGroundMultiForeground(app, layer, xstart, ystart, scale) {
    var count = 4
    for (var i = 0; i < count; ++i) {
        layer.addChildAt(
            loadGroundForeground(app, layer, xstart + (scale*128*i), ystart, scale), 0)
    }
}