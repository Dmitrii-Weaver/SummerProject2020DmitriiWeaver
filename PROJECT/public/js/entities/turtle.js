import Entity, { Sides, Trait } from '../entity.js';
import PendulumMove from '../traits/pendulumMove.js'
import { loadSpriteSheet } from '../loaders.js';
import Killable from '../traits/killable.js'

export function loadTurtle() {
    return loadSpriteSheet('turtle')
        .then(createTurtleFactory)
}

const STATE_WALKING = Symbol('walking')
const STATE_HIDING = Symbol('hiding')
const STATE_PANIC = Symbol('panic')

class behaviour extends Trait {
    constructor() {
        super('behaviour')
        this.state = STATE_WALKING
        this.hideTime = 0
        this.hideDuration = 5
        this.walkSpeed = null
        this.panicSpeed = 300
    }
    collides(us, them) {
        if (us.Killable.dead) {
            return
        }
        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                this.handleStomp(us, them)
            }
            else {
                this.handleNudge(us, them)
            }

        }
    }
    handleNudge(us, them) {
        if (this.state === STATE_WALKING) {
            them.Killable.kill()
        }
        else if (this.state === STATE_HIDING) {
            this.panic(us, them)
        }
        else if (this.state === STATE_PANIC) {
            const travelDir = Math.sign(us.vel.x)
            const impactDir = Math.sign(us.pos.x - them.pos.x)
            if (travelDir !== 0 && travelDir !== impactDir) {
                them.Killable.kill()

            }
        }

    }
    handleStomp(us, them) {
        if (this.state == STATE_WALKING) {
            this.hide(us)
        }
        else if (this.state === STATE_HIDING) {
            us.Killable.kill()
            us.vel.set(100, -200)
            us.canCollide = false
        }
        else if (this.state === STATE_PANIC) {
            this.hide(us)
        }

    }
    hide(us) {
        us.vel.x = 0
        us.pendulumMove.enabled = false
        if(this.walkSpeed === null){
            this.walkSpeed = us.pendulumMove.speed
        }
        this.hideTime = 0
        this.state = STATE_HIDING
    }
    unhide(us) {
        us.pendulumMove.enabled = true
        us.pendulumMove.speed = this.walkSpeed
        this.state = STATE_WALKING
    }
    panic(us, them) {
        us.pendulumMove.enabled = true
        us.pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x)
        this.state = STATE_PANIC
    }
    update(us, deltaTime) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTime
            if (this.hideTime > this.hideDuration) {
                this.unhide(us)
            }
        }
    }
}


function createTurtleFactory(sprite) {
    const walkAnim = sprite.animations.get('walk')
    const wakeAnim = sprite.animations.get('wake')

    function routeAnim(turtle) {
        if (turtle.behaviour.state == STATE_HIDING) {
            if (turtle.behaviour.hideTime > 3){
                return wakeAnim(turtle.behaviour.hideTime)
            }
            return "hiding"
        }
        if (turtle.behaviour.state === STATE_PANIC){
            return "hiding"
        }
        return walkAnim(turtle.lifeTime)
    }

    function drawTurtle(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0)
    }
    return function createTurtle() {

        const turtle = new Entity()
        turtle.size.set(16, 16)
        turtle.offset.y = 8
        turtle.addTrait(new PendulumMove())
        turtle.addTrait(new Killable())
        turtle.addTrait(new behaviour())
        turtle.draw = drawTurtle
        return turtle
    }
}