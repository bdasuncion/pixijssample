import { VIEWSETTINGS } from './viewSettings.js';

const SCALECONST = 0.008
const YOFFSETCONSTTREE = 0.15
const YOFFSETCONSTGROUND = 0.6

export async function forwardSCroll(app) {

    let backgroundmid_layer = new PIXI.Container();
    backgroundmid_layer.position.set(0,0);

    let groundlayer = new PIXI.Container();
    groundlayer.position.set(0,0);

    backgroundmid_layer.addChild(groundlayer)

    let treelayer = new PIXI.Container();
    treelayer.position.set(0,0);
    backgroundmid_layer.addChild(loadMoon(app, backgroundmid_layer, 320, 50))
    backgroundmid_layer.addChild(treelayer)
    
    treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 270, 70, 0.3), 0)
    //treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 320, 70, 0.3), 0)
    treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 360, 70, 0.3), 0)
    loadGroundMulti(app, treelayer, 245, 100, 0.3)
    //loadGroundMulti(app, treelayer, 270, 90, 0.3)

    setTimeout(() => {
        loadGroundMulti(app, treelayer, 245, 100, 0.3)
    }, 600)

    setTimeout(() => {
        treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 290, 70, 0.3), 0)
        treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 335, 70, 0.3), 0)
        loadGroundMulti(app, treelayer, 245, 100, 0.3)
       // loadGroundMulti(app, treelayer, 270, 110, 0.3)
    }, 1200)

    setTimeout(() => {
        loadGroundMulti(app, treelayer, 245, 100, 0.3)
    }, 1800)

    setTimeout(() => {
        treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 260, 70, 0.3), 0)
        treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 350, 70, 0.3), 0)
        treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 400, 70, 0.3), 0)
        loadGroundMulti(app, treelayer, 245, 100, 0.3)
       // loadGroundMulti(app, treelayer, 270, 130, 0.3)
    }, 2400)

    setTimeout(() => {
        loadGroundMulti(app, treelayer, 245, 100, 0.3)
    }, 3000)

    setTimeout(() => {
        treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 240, 70, 0.3), 0)
        treelayer.addChildAt(loadTreeForwardScroll(app, treelayer, 380, 70, 0.3), 0)
        loadGroundMulti(app, treelayer, 245, 100, 0.3)
    }, 3600)

    setTimeout(() => {
        loadGroundMulti(app, treelayer, 245, 100, 0.3)
    }, 4200)


    setTimeout(() => {
        loadGroundMulti(app, treelayer, 245, 100, 0.3)
    }, 4800)

    return backgroundmid_layer
}

function loadGroundMulti(app, backgroundmid_layer, xstart, ystart, scale) {
    var count = 5
    for (var i = 0; i < count; ++i) {
        
            backgroundmid_layer.addChildAt(
                loadGroundForwardScroll(app, backgroundmid_layer, xstart + (scale*128*i), ystart, scale), 0)
    }
}

function loadTreeForwardScroll(app, container, xpos, ypos, scale) { 
    const X_POS_REUSE = -64
    const CENTERX = VIEWSETTINGS.width/2
    const distanceX = (xpos - CENTERX)/scale
    let tree = PIXI.Sprite.from('../images/tree.png');
    tree.anchor.set(0.5, 0.5)
    tree.scale.x = scale;
    tree.scale.y = scale;
    tree.x = xpos
    tree.y =  ypos
    app.ticker.add((delta) => {
        tree.scale.x += SCALECONST;
        tree.scale.y += SCALECONST;

        tree.x = ((distanceX)*tree.scale.x) + CENTERX
        tree.y += YOFFSETCONSTTREE
        if (tree.scale.x >= 2.5) {
            container.removeChild(tree)
            tree.scale.x = 0.5
            tree.scale.y = 0.5
            tree.y = ypos
            container.addChildAt(tree, 0)
        }
    });

    return tree
}

function loadGroundForwardScroll(app, container, xpos, ypos, scale) { 
    const X_POS_REUSE = -64
    const CENTERX = VIEWSETTINGS.width/2
    const distanceX = (xpos - CENTERX)/scale
    let ground = PIXI.Sprite.from('../images/ground.png');
    ground.anchor.set(0.5, 0.5)
    //ground.anchor.set(0.5, 0.0)
    ground.scale.x = scale;
    ground.scale.y = scale;
    ground.x = xpos
    ground.y =  ypos
    app.ticker.add((delta) => {
        ground.scale.x += SCALECONST;
        ground.scale.y += SCALECONST;

        ground.x = ((distanceX)*ground.scale.x) + CENTERX
        ground.y += YOFFSETCONSTGROUND

        if (ground.scale.x >= 2.5) {
            container.removeChild(ground)
            ground.scale.x = 0.5
            ground.scale.y = 0.5            
            ground.y = ypos
            container.addChildAt(ground, 0)
        }
    });

    return ground
}

function loadMoon(app, container, xpos, ypos, scale) { 
    let moon = PIXI.Sprite.from('../images/moon.png');
    moon.anchor.set(0.5, 0.5)
    moon.x = xpos
    moon.y = ypos

    return moon
}