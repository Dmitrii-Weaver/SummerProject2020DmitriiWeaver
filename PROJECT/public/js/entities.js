import Entity from './entity.js';
import Jump from './traits/jump.js'
import Go from './traits/go.js'
import { loadSpriteSheet } from './loaders.js';
import {createAnim} from './anim.js'


const FAST_DRAG = 1/5000
const SLOW_DRAG = 1/1000

export function createPlayer() {
    return loadSpriteSheet('player')
        .then(sprite => {
            const player = new Entity();
            player.size.set(14, 16)

            player.addTrait(new Go())
            player.go.dragFactor = SLOW_DRAG
            player.addTrait(new Jump())


            player.turbo = function setTurboState(turboOn){
                player.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG
  
            }

            const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 6)

            function routeFrame(player) {
                if(player.jump.falling){
                    return 'jump'
                }
                if (player.go.distance > 0) {
                    if(player.vel.x > 0 && player.go.dir < 0 || player.vel.x < 0 && player.go.dir > 0){
                        return "break"
                    }

                    return runAnim(player.go.distance)
                }

                return 'idle'
            }

            player.draw = function drawplayer(context) {
                sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0)
            }

            return player
        })
}