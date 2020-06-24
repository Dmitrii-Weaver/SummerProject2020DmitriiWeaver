import { loadImage } from './loaders.js';
import SpriteSheet from './SpriteSheet.js';
export function loadPlayerSprite() {
    return loadImage('/img/characters.gif')
        .then(image => {
            const sprites = new SpriteSheet(image);
            sprites.define('idle', 276, 44, 16, 16);
            return sprites
        });
}

