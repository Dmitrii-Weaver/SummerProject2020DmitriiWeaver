import Trait from '../trait.js'
import Stomper from '../traits/stomper.js'


const COIN_LIVE_THRESHOLD = 100

export default class Player extends Trait {
    constructor() {
        super()
        this.name = "UNNAMED"
        this.acorns = 0
        this.lives = 3
        this.score = 0
        this.canDie = true
        this.time = 0

        this.listen(Stomper.EVENT_STOMP, () => {
            this.score += 100
        })
    }
    addCoins(count){
        this.acorns+=count
        this.queue(entity => entity.sounds.add('coin'))
        while (this.acorns >=  COIN_LIVE_THRESHOLD){
           this.addLives(1)
            this.acorns -=  COIN_LIVE_THRESHOLD
        }
    }
    addLives(count){
        this.lives += count
    }
    undying(){
        console.log('died')
        this.canDie = false
        
        setTimeout(() => this.canDie = true, 3000);
        
    }

}





