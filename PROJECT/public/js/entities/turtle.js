import Entity, {Sides} from '../entity.js';
import PendulumWalk from   '../traits/PendulumWalk.js'
import { loadSpriteSheet } from '../loaders.js';

export function loadTurtle(){
    return loadSpriteSheet('turtle')
    .then(createTurtleFactory)
}

function createTurtleFactory(sprite){
    const walkAnim = sprite.animations.get('walk')
    function drawTurtle(context){
        sprite.draw(walkAnim(this.lifeTime), context,0,0, this.vel.x < 0)
    }
    return function createTurtle(){

        const turtle = new Entity()
        turtle.size.set(16,16)
        turtle.offset.y = 8
        turtle.addTrait(new PendulumWalk())
        turtle.draw = drawTurtle
        return turtle
    }
}