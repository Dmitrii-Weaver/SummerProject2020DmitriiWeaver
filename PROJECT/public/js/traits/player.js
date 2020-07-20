import Trait from '../trait.js'
import Stomper from '../traits/stomper.js'


const COIN_LIVE_THRESHOLD = 100

export default class Player extends Trait {
    constructor() {
        super()
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
        while (this.coins >=  COIN_LIVE_THRESHOLD){
           this.addLives(1)
            this.coins -=  COIN_LIVE_THRESHOLD
        }
    }
    addLives(count){
        this.lives += count
    }

}





