import { loadManananggal } from './manananggal.js';
import { VIEWSETTINGS } from './viewSettings.js';

export const TYPE_MANANANGGAL = "manananggal"

export async function createEnemy(app, maskContainer, generate) {
    if (generate.type === TYPE_MANANANGGAL) {
        await loadManananggal(app, maskContainer, generate.x, generate.y)
    }
}

export async function createMananaggalAt(app, maskContainer) {
    loadManananggal(app, maskContainer, Math.floor(Math.random()*VIEWSETTINGS.width + 32), 
     Math.floor(Math.random()*(VIEWSETTINGS.height - 100)))
}