import Entity, { Trait, Sides } from '../entity.js'
import Stomper from '../traits/stomper.js'
import { coin } from '../tiles/coin.js'

const COIN_LIVE_THRESHOLD = 100

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
    addCoins(count){
        this.coins+=count
        this.queue(entity => entity.sounds.add('coin'))
        if(this.coins >=  COIN_LIVE_THRESHOLD){
            const lifeCount = Math.floor(this.coins/COIN_LIVE_THRESHOLD)
            this.addLives(lifeCount)
            this.coins = this.coins % COIN_LIVE_THRESHOLD
        }
    }
    addLives(count){
        this.lives += count
    }

}





