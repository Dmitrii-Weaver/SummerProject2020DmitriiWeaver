import Entity from '../entity.js';
import { loadSpriteSheet } from '../loaders/sprite.js';
import PendulumMove from '../traits/pendulumMove.js'
import Killable from '../traits/killable.js'
import Solid from '../traits/solid.js'
import physics from '../traits/physics.js'
import Trait from '../trait.js'
import Stomper from '../traits/stomper.js';
import Player from '../traits/player.js';

export function loadEnemy1() {
    return loadSpriteSheet('enemy1')
        .then(createEnemy1Factory)
}

class behaviour extends Trait {

    collides(us, them) {
        if (us.traits.get(Killable).dead) {
            return
        }
        if (them.traits.has(Stomper)) {
            if (them.vel.y > us.vel.y) {
                us.traits.get(PendulumMove).speed = 0
                us.traits.get(Killable).kill()
            }
            else {
                
               
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
}

function createEnemy1Factory(sprite) {
    const walkAnim = sprite.animations.get('walk')

    function routeAnim(enemy1) {
        if (enemy1.traits.get(Killable).dead) {
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