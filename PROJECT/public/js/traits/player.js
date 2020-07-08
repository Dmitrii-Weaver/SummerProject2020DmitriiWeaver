import { Trait, Sides } from '../entity.js'

export default class player extends Trait {
    constructor() {
        super('player')
        this.lives = 3
        this.score = 0
    }

}





