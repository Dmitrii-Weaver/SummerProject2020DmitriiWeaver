import { Trait, Sides } from '../entity.js'

export default class Velocity extends Trait {
    constructor() {
        super('velocity')
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



