import Entity from '../entity.js';
import { loadSpriteSheet } from '../loaders/sprite.js';
import Killable from '../traits/killable.js'
import velocity from '../traits/justvel.js'
import gravity from '../traits/gravity.js';
import Trait from '../trait.js'
import Stomper from '../traits/stomper.js';

export function loadBullet() {
    return loadSpriteSheet('bullet')
        .then(createBulletFactory)
}

class behaviour extends Trait {
    constructor() {
        super()
        this.gravity = new gravity()
    }
    collides(us, them) {
        if (us.traits.get(Killable).dead) {
            return
        }
        if (them.traits.has(Stomper)) {
            if (them.vel.y > us.vel.y) {
                us.traits.get(Killable).kill()
                us.vel.set(100, -200)
            }
            else{
                them.traits.get(Killable).kill()
            }
            
        }
    }
    update(entity, gameContext, level){
        if (entity.traits.get(Killable).dead) {
            this.gravity.update(entity,gameContext,level)
        }
    }
}

function createBulletFactory(sprite) {

    function drawBullet(context) {
        sprite.draw("bullet", context, 0, 0, this.vel.x < 0)
    }
    return function createBullet() {
        const Bullet = new Entity()
        Bullet.size.set(16, 14)

        Bullet.addTrait(new behaviour())
        Bullet.addTrait(new velocity())
        Bullet.addTrait(new Killable())
        Bullet.draw = drawBullet
        return Bullet
    }
}