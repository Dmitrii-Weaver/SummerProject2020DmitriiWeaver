
import Trait from '../trait.js'

export default class Velocity extends Trait {
    constructor() {
        super()
        this.enabled = true
    }

    update(entity, {deltaTime}, level) {
        if (!this.enabled){
            return
        }
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }

}



