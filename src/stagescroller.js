import { TYPE_MANANANGGAL, createEnemy, createMananaggalAt } from './enemyGenerator.js';
import { VIEWSETTINGS } from './viewSettings.js';
import { createBackgroundFar } from './background_far.js';
import { createBackgroundMid } from './background_mid.js';
import { createForeground } from './foreground.js';
import { forwardSCroll } from './forwardscroll_trees.js';

export async function stageScroller(app) {
    let mask = new PIXI.Graphics();
    const generateOnCount = 360
    var scrollX = 0

    mask.beginFill(0xffffff);
    mask.drawRect(0,0,VIEWSETTINGS.width,VIEWSETTINGS.height);
    mask.endFill();

    let maskContainer = new PIXI.Container();
    let enemylayer = new PIXI.Container();
    maskContainer.mask = mask;
    maskContainer.addChild(mask);
    maskContainer.position.set(4,4);
    
    maskContainer.addChild(await createBackgroundFar(app))
    maskContainer.addChild(await createBackgroundMid(app))
    maskContainer.addChild(enemylayer)
    maskContainer.addChild(await createForeground(app))
    //maskContainer.addChild(await forwardSCroll(app))
    

    app.ticker.add((delta) => {

        if (scrollX%generateOnCount == 0) {
            generateEnemyAtRandom(app, enemylayer)
        }
        scrollX += 1
    });

    return maskContainer
}

function generateEnemyAtRandom(app, maskContainer) {
    var enemycount = Math.floor(Math.random()*5 + 1);
    var i = 0
    var id = setInterval(() => {
        createMananaggalAt(app, maskContainer)
        ++i
        if (i >= enemycount) {
            clearInterval(id)
        }
    }, 500)
}
