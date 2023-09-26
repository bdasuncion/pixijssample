import { VIEWSETTINGS } from './viewSettings.js';

export async function createBackgroundMid(app) {

    let backgroundmid_layer = new PIXI.Container();
    backgroundmid_layer.position.set(0,0);

    loadGroundMultiMid(app, backgroundmid_layer, 64,164, 1.0)
    loadGroundMultiMid(app, backgroundmid_layer, 64,196, 1.0)
    backgroundmid_layer.addChild(loadTreeMid(app, backgroundmid_layer, 64,70))
    backgroundmid_layer.addChild(loadTreeMid(app, backgroundmid_layer, 270, 70))
    backgroundmid_layer.addChild(loadTreeMid(app, backgroundmid_layer, 450, 70))
    backgroundmid_layer.addChild(loadTreeMid(app, backgroundmid_layer, 600, 70))

    return backgroundmid_layer
}

function loadTreeMid(app, container, xpos, ypos) { 
    const X_POS_REUSE = -64
    let tree = PIXI.Sprite.from('../images/tree.png');
    tree.scale.x = 1;
    tree.scale.y = 1;
    tree.x = xpos
    tree.y =  ypos
    app.ticker.add((delta) => {
        if (tree.x < X_POS_REUSE) {
            tree.x = VIEWSETTINGS.width + 1
        }
        tree.x -= 1.0
        
    });

    return tree
}

function loadGroundMid(app, container, xpos, ypos) { 
    const X_POS_REUSE = -64
    let ground = PIXI.Sprite.from('../images/ground.png');
    ground.anchor.set(0.5, 0.5)
    //ground.anchor.set(0.5, 0.0)
    ground.scale.x = 1;
    ground.scale.y = 1;
    ground.x = xpos
    ground.y =  ypos
    app.ticker.add((delta) => {
        if (ground.x < X_POS_REUSE) {
            ground.x = VIEWSETTINGS.width + 1
        }
        ground.x -= 1.0
        
    });

    return ground
}

function loadGroundMultiMid(app, layer, xstart, ystart, scale) {
    var count = 6
    for (var i = 0; i < count; ++i) {
        layer.addChildAt(
                loadGroundMid(app, layer, xstart + (scale*128*i), ystart, scale), 0)
    }
}