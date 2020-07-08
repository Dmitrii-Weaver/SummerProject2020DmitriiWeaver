import { Trait, Sides } from '../entity.js'

export default class Stomper extends Trait {
    constructor() {
        super('stomper')
        this.bounceSpeed = 400

    }

    bounce(us, them) {
        us.bounds.bottom = them.bounds.top
        us.vel.y = -this.bounceSpeed
    }

    collides(us, them){
        if(!them.Killable || them.Killable.dead){
            return
        }   
        if (us.vel.y > them.vel.y){
            this.queue(() => this.bounce(us,them))
            us.sounds.add('stomp')
            this.events.emit('stomp', us, them)
        }
    }


}

