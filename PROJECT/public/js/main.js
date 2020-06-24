
import Timer from './timer.js'
import { loadLevel } from './loaders.js';
import { createPlayer } from './entities.js';
import{createCollisionLayer} from './layers.js'
import {setupKeyboard} from './input.js'





const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');








Promise.all([
    createPlayer(),
  
    loadLevel('1-1'),

])
    .then(([player,  level]) => {


        player.pos.set(64, 180)
        createCollisionLayer(level)

        level.entities.add(player)
        level.comp.layers.push(createCollisionLayer(level));
  
        const input = setupKeyboard(player)
        input.listenTo(window)

        const timer = new Timer(1 / 60)

        timer.update = function update(deltaTime) {


            level.update(deltaTime)
            level.comp.draw(context)


        }
        timer.start(0)
    })



