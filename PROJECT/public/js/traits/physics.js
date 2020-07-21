import { Trait, Sides } from '../entity.js'

export default class physics extends Trait {
    constructor() {
        super('physics')
        this.enabled = true
    }

    update(entity, gameContext, level) {
        const {deltaTime} = gameContext 
        if (!this.enabled){
            return
        }
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity, gameContext, level)

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider.checkY(entity, gameContext, level)

        entity.vel.y += level.gravity * deltaTime
    }

}



