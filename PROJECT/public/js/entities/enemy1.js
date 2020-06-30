import Entity, {Sides} from '../entity.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadEnemy1(){
    return loadSpriteSheet('enemy1')
    .then(createEnemy1Factory)
}

function createEnemy1Factory(sprite){
    const walkAnim = sprite.animations.get('walk')
    function drawEnemy1(context){
        sprite.draw(walkAnim(this.lifeTime), context,0,0)
    }
    return function createEnemy1(){
        const enemy1 = new Entity()
        enemy1.size.set(16,16)
        enemy1.addTrait({
            NAME:'walk',
            speed: -30,
            obstruct(enemy1, side){
                if(side === Sides.LEFT || side===Sides.RIGHT){
                   this.speed = -this.speed 
                }
            },
            update(enemy1){
                enemy1.vel.x =  this.speed
            }
        })

        enemy1.draw = drawEnemy1
        return enemy1
    }
}