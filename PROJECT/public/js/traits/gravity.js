import Trait from '../trait.js'

export default class gravity extends Trait {


    update(entity, {deltaTime}, level) {

        entity.vel.y += level.gravity * deltaTime
    }

}



