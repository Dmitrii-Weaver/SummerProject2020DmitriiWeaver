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


        for (const i of findPlayers(level.entities)) {
            this.count++
        }
        if (this.count == 0 ) {
            const player = this.gc.entityFactory.player()
            makePlayer(player, 'BOAR')
            player.pos.x = 100
            player.pos.y = 32
            player.vel.x = 0
            player.vel.y = 0
            level.entities.add(player)


            const inputRouter = setupKeyboard(window)
            inputRouter.addReceiver(player)
        }
        this.count = 0
    }
}

