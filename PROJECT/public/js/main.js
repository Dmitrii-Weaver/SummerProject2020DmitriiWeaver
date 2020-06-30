import Camera from './Camera.js'
import Timer from './timer.js'
import { loadLevel } from './loaders/levelloader.js';
import { loadPlayer } from './entities/player.js';
import {loadEnemy1} from './entities/enemy1.js';
import {setupKeyboard} from './input.js'





const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');








Promise.all([
    loadPlayer(),
    loadEnemy1(),
    loadLevel('1-1'),

])
    .then(([createPlayer, createEnemy1,  level]) => {

        const camera = new Camera()
        window.camera = camera

        const player = createPlayer()
        player.pos.set(64, 180)

        const enemy1 = createEnemy1()
        enemy1.pos.x = 220
        level.entities.add(enemy1)

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



