import Entity, { Sides, Trait } from '../entity.js';
import { loadSpriteSheet } from '../loaders.js';
import PendulumWalk from '../traits/PendulumWalk.js'
import Killable from '../traits/killable.js'

export function loadEnemy1() {
    return loadSpriteSheet('enemy1')
        .then(createEnemy1Factory)
}

class behaviour extends Trait {
    constructor() {
        super('behaviour')
    }
    collides(us, them) {
        if (us.Killable.dead) {
            return
        }
        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.pendulumWalk.speed = 0
                them.stomper.bounce()
                us.Killable.kill()
            }
            else{
                them.Killable.kill()
            }
            
        }
    }
}

function createEnemy1Factory(sprite) {
    const walkAnim = sprite.animations.get('walk')

    function routeAnim(enemy1) {
        if (enemy1.Killable.dead) {
            return 'flat'
        }
        return walkAnim(enemy1.lifeTime)
    }
    function drawEnemy1(context) {
        sprite.draw(routeAnim(this), context, 0, 0)
    }
    return function createEnemy1() {
        const enemy1 = new Entity()
        enemy1.size.set(16, 16)
        enemy1.addTrait(new PendulumWalk())
        enemy1.addTrait(new behaviour())
        enemy1.addTrait(new Killable())
        enemy1.draw = drawEnemy1
        return enemy1
    }
}