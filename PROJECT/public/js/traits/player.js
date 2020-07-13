import { Trait, Sides } from '../entity.js'
import Stomper from '../traits/stomper.js'

export default class player extends Trait {
    constructor() {
        super('player')
        this.name = "UNNAMED"
        this.coins = 0
        this.lives = 3
        this.score = 0

        this.listen(Stomper.EVENT_STOMP, () => {
            this.score += 100
        })
    }

}





