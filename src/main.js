import { stageScroller  } from "./stagescroller.js";
        
    function mainApp() {
        let app = new PIXI.Application({ width: 720, height: 360 });
        document.body.appendChild(app.view);

        //let sprite = PIXI.Sprite.from('background.jpg');
        //sprite.width = 1080
        //sprite.height = 1980
        stageScroller(app).then((mask) => {
            app.stage.addChild(mask);
        })
        

    }

    mainApp()


