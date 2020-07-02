import { Trait, Sides } from '../entity.js'

export default class physics extends Trait {
    constructor() {
        super('physics')
        this.enabled = true
    }

    update(entity, deltaTime, level) {
        if (!this.enabled){
            return
        }
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity)

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider.checkY(entity)

        entity.vel.y += level.gravity * deltaTime
    }

}



