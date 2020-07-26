import Entity from '../entity.js';
import Jump from '../traits/jump.js'
import Solid from '../traits/solid.js'
import physics from '../traits/physics.js'
import Stomper from '../traits/stomper.js'
import Go from '../traits/go.js'
import { loadSpriteSheet } from '../loaders/sprite.js';
import Killable from '../traits/killable.js';
import { loadAudioBoard } from '../loaders/audio.js';
import Player from '../traits/player.js';

const FAST_DRAG = 1 / 5000
const SLOW_DRAG = 1 / 1000

export function loadPlayer(audioContext) {
    return Promise.all([
        loadSpriteSheet('player'),
        loadAudioBoard('player', audioContext)
    ])
        .then(([sprite, audio]) => {
            return createPlayerFactory(sprite, audio)
        })
}

function createPlayerFactory(sprite, audio) {
    const runAnim = sprite.animations.get("run")
    const undyingRunAnim = sprite.animations.get("run-undying")

    function routeFrame(player) {
        if (player.traits.get(Jump).falling && player.traits.get(Player).canDie == true && player.traits.get(Player).lives != 0) {
            return 'jump'
        }
        else if (player.traits.get(Jump).falling && player.traits.get(Player).canDie == false && player.traits.get(Player).lives == 0) {
            return 'jump-undying'
        }
        if (player.traits.get(Go).distance > 0) {
            if (player.vel.x > 0 && player.traits.get(Go).dir < 0 || player.vel.x < 0 && player.traits.get(Go).dir > 0) {
                if (player.traits.get(Player).canDie == false || player.traits.get(Player).lives==1) {
                    return "break-undying"
                }
                else {
                    return "break"
                }
            }
            if ( player.traits.get(Player).canDie == false || player.traits.get(Player).lives == 0){
                return undyingRunAnim(player.traits.get(Go).distance)
            }
            else if( player.traits.get(Player).canDie == true && player.traits.get(Player).lives != 0){
                return runAnim(player.traits.get(Go).distance)
            }
            
        }

        if (player.traits.get(Player).canDie == true && player.traits.get(Player).lives != 0) {
            return "idle"
        }
        else{
            return "idle-undying"
        }
    }
    function setTurboState(turboOn) {
        this.traits.get(Go).dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG

    }
    function drawplayer(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.traits.get(Go).heading < 0)
    }

    return function createPlayer() {
        const player = new Entity();
        player.audio = audio
        player.size.set(16, 16)

        player.addTrait(new Go())
        player.addTrait(new Solid())
        player.addTrait(new physics())
        player.addTrait(new Jump())
        player.addTrait(new Stomper())
        player.addTrait(new Killable())

        player.traits.get(Killable).removeAfter = 0


        player.turbo = setTurboState

        player.draw = drawplayer

        player.turbo(false)

        return player
    }
}