import { Trait, Sides } from '../entity.js'

export default class Stomper extends Trait {
    constructor() {
        super('stomper')
        this.bounceSpeed = 400
        this.didStomp = false

        this.onStomp = function(){
        }

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
            this.bounce(us,them)
            this.onStomp(us, them)
            this.didStomp = true
        }
    }

    update(entity){
        if (this.didStomp){
            entity.audio.playAudio('stomp')
            this.didStomp = false
        }
    }

}

