import Entity from '../entity.js';
import PendulumMove from '../traits/pendulumMove.js'
import { loadSpriteSheet } from '../loaders/sprite.js';
import Killable from '../traits/killable.js'
import Solid from '../traits/solid.js'
import physics from '../traits/physics.js'
import Trait from '../trait.js'
import Stomper from '../traits/stomper.js';
import Player from '../traits/player.js';

export function loadTurtle() {
    return loadSpriteSheet('turtle')
        .then(createTurtleFactory)
}

const STATE_WALKING = Symbol('walking')
const STATE_HIDING = Symbol('hiding')
const STATE_PANIC = Symbol('panic')

class behaviour extends Trait {
    constructor() {
        super()
        this.state = STATE_WALKING
        this.hideTime = 0
        this.hideDuration = 5
        this.walkSpeed = null
        this.panicSpeed = 300
    }
    collides(us, them) {
        if (us.traits.get(Killable).dead) {
            return
        }
        if (them.traits.has(Stomper)) {
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
            if (them.traits.get(Player).lives == 0 && them.traits.get(Player).canDie == true) {
                them.sounds.add('damage')
                them.traits.get(Killable).kill()
                location.reload();
            }
            else if (them.traits.get(Player).lives != 0 && them.traits.get(Player).canDie == true) {

                them.traits.get(Player).lives--
                them.sounds.add('damage')
                them.vel.y = -100
                them.traits.get(Player).undying()
            }
        }
        else if (this.state === STATE_HIDING) {
            this.panic(us, them)
        }
        else if (this.state === STATE_PANIC) {
            const travelDir = Math.sign(us.vel.x)
            const impactDir = Math.sign(us.pos.x - them.pos.x)
            if (travelDir !== 0 && travelDir !== impactDir) {
                if (them.traits.get(Player).lives == 0 && them.traits.get(Player).canDie == true) {
                    them.sounds.add('damage')
                    them.traits.get(Killable).kill()
                    location.reload();
                }
                else if ( them.traits.get(Player).lives != 0 && them.traits.get(Player).canDie == true){
                    
                    them.traits.get(Player).lives --
                    them.sounds.add('damage')
                    them.vel.y = -100
                    them.traits.get(Player).undying()
                }

            }
        }

    }
    handleStomp(us, them) {
        if (this.state == STATE_WALKING) {
            this.hide(us)
        }
        else if (this.state === STATE_HIDING) {
            us.traits.get(Killable).kill()
            us.vel.set(100, -200)
            us.traits.get(Solid).obstructs = false
        }
        else if (this.state === STATE_PANIC) {
            this.hide(us)
        }

    }
    hide(us) {
        us.vel.x = 0
        us.traits.get(PendulumMove).enabled = false
        if (this.walkSpeed === null) {
            this.walkSpeed = us.traits.get(PendulumMove).speed
        }
        this.hideTime = 0
        this.state = STATE_HIDING
    }
    unhide(us) {
        us.traits.get(PendulumMove).enabled = true
        us.traits.get(PendulumMove).speed = this.walkSpeed
        this.state = STATE_WALKING
    }
    panic(us, them) {
        us.traits.get(PendulumMove).enabled = true
        us.traits.get(PendulumMove).speed = this.panicSpeed * Math.sign(them.vel.x)
        this.state = STATE_PANIC
    }
    update(us, gameContext) {
        const deltaTime = gameContext.deltaTime
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
        if (turtle.traits.get(behaviour).state == STATE_HIDING) {
            if (turtle.traits.get(behaviour).hideTime > 3) {
                return wakeAnim(turtle.traits.get(behaviour).hideTime)
            }
            return "hiding"
        }
        if (turtle.traits.get(behaviour).state === STATE_PANIC) {
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
        turtle.addTrait(new Solid())
        turtle.addTrait(new physics())
        turtle.addTrait(new PendulumMove())
        turtle.addTrait(new Killable())
        turtle.addTrait(new behaviour())
        turtle.draw = drawTurtle
        return turtle
    }
}