import Entity from '../entity.js';
import Jump from '../traits/jump.js'
import Go from '../traits/go.js'
import { loadSpriteSheet } from '../loaders.js';

const FAST_DRAG = 1 / 5000
const SLOW_DRAG = 1 / 1000

export function loadPlayer() {
    return loadSpriteSheet('player')
        .then(createPlayerFactory)
}

function createPlayerFactory(sprite) {


    const runAnim = sprite.animations.get("run")
    function routeFrame(player) {
        if (player.jump.falling) {
            return 'jump'
        }
        if (player.go.distance > 0) {
            if (player.vel.x > 0 && player.go.dir < 0 || player.vel.x < 0 && player.go.dir > 0) {
                return "break"
            }

            return runAnim(player.go.distance)
        }

        return 'idle'
    }
    function setTurboState(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG

    }
    function drawplayer(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0)
    }

    return function createPlayer() {
        const player = new Entity();
        player.size.set(14, 16)

        player.addTrait(new Go())
        player.addTrait(new Jump())


        player.turbo = setTurboState

        player.draw = drawplayer

        player.turbo(false)

        return player
    }
}