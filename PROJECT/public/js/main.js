import Camera from './Camera.js'
import Timer from './timer.js'
import { loadLevel } from './loaders.js';
import { createPlayer } from './entities.js';
import {setupKeyboard} from './input.js'





const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');








Promise.all([
    createPlayer(),
  
    loadLevel('1-1'),

])
    .then(([player,  level]) => {

        const camera = new Camera()
        window.camera = camera


        player.pos.set(64, 180)

        level.entities.add(player)



        const input = setupKeyboard(player)
        input.listenTo(window)

        

        const timer = new Timer(1 / 60)

        timer.update = function update(deltaTime) {


            level.update(deltaTime)

            if (player.pos.x > 100){
                camera.pos.x = player.pos.x - 100
            }

            level.comp.draw(context, camera)


        }
        timer.start(0)
    })



