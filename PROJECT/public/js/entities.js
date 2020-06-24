import Entity from './entity.js';
import Jump from './traits/jump.js'
import Go from './traits/go.js'
import Velocity from './traits/Velocity.js'
import { loadPlayerSprite } from './Sprites.js';




export function createPlayer() {
    return loadPlayerSprite()
        .then(sprite => {
            const player = new Entity();
            player.size.set(14,16)
            
            player.addTrait(new Go())
            player.addTrait(new Jump())
            //player.addTrait(new Velocity())


            player.draw = function drawplayer(context) {
                sprite.draw('idle', context, this.pos.x, this.pos.y)
            }

            return player
        })
}