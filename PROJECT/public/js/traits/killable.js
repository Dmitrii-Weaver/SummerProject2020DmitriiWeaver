import Trait from '../trait.js'
import Player from './player.js'

export default class Killable extends Trait {
    constructor() {
        super()
        this.dead = false
        this.deadTime = 0
        this.removeAfter = 2
    }

    kill() {
        this.queue(() => this.dead = true)
    }

    revive() {
        this.dead = false
        this.deltaTime = 0
    }

    update(entity, { deltaTime }, level) {
        if (this.dead) {
            this.deadTime += deltaTime
            if (this.deadTime > this.removeAfter) {
                this.queue(() => {

                    level.entities.delete(entity)

                })
            }
        }
    }


}

