import Entity, { Sides, Trait } from '../entity.js';
import { loadSpriteSheet } from '../loaders/sprite.js';
import PendulumMove from '../traits/pendulumMove.js'
import Killable from '../traits/killable.js'
import Solid from '../traits/solid.js'
import physics from '../traits/physics.js'

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
                us.pendulumMove.speed = 0
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
        enemy1.addTrait(new Solid())
        enemy1.addTrait(new physics())
        enemy1.addTrait(new PendulumMove())
        enemy1.addTrait(new behaviour())
        enemy1.addTrait(new Killable())
        enemy1.draw = drawEnemy1
        return enemy1
    }
}