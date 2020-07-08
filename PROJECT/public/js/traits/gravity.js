import { Trait, Sides } from '../entity.js'

export default class gravity extends Trait {
    constructor() {
        super('gravity')
    }

    update(entity, {deltaTime}, level) {

        entity.vel.y += level.gravity * deltaTime
    }

}



