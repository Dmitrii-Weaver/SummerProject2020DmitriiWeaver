import Camera from './Camera.js'
import Timer from './timer.js'
import { loadLevel } from './loaders/levelloader.js';
import {loadEntities} from './entities.js'
import {setupKeyboard} from './input.js'
import{createCollisionLayer} from './Layers.js'
 



const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');








Promise.all([
    loadEntities(),
    loadLevel('1-1'),

])
    .then(([entity,  level]) => {

        const camera = new Camera()
        window.camera = camera

        const player = entity.player()
        player.pos.set(64, 180)

        const enemy1 = entity.enemy1()
        enemy1.pos.x = 220
        level.entities.add(enemy1)

        const turtle = entity.turtle()
        turtle.pos.x = 360
        level.entities.add(turtle)

        level.entities.add(player)

        level.comp.layers.push(createCollisionLayer(level))


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



