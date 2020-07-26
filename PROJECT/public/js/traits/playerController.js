import Trait from '../trait.js'
import { Vec2 } from '../math.js'
import { findPlayers, makePlayer } from '../player.js'
import Player from './player.js'
import { setupKeyboard } from '../input.js'
export default class playerController extends Trait {
    constructor(gameContext) {
        super()
        this.checkpoint = new Vec2(0, 0)
        this.player = null
        this.gc = gameContext
        this.count = 0
    }

    setPlayer(entity) {
        this.player = entity

    }
    update(entity, { deltaTime }, level,) {


    }
}

