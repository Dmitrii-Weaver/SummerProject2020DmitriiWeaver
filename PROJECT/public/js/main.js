import Camera from './Camera.js'
import Timer from './timer.js'
import { createLevelLoader } from './loaders/levelloader.js';
import { loadEntities } from './entities.js'
import { setupKeyboard } from './input.js'
import { createCollisionLayer } from './Layers.js'

async function main(canvas){
    const context = canvas.getContext('2d');
    const entityFactory = await loadEntities()
    const loadLevel = await createLevelLoader(entityFactory)
    const level = await loadLevel('1-1')

        const camera = new Camera()

        const player = entityFactory.player()
        player.pos.set(64, 180)

        level.entities.add(player)

        level.comp.layers.push(createCollisionLayer(level))


        const input = setupKeyboard(player)
        input.listenTo(window)



        const timer = new Timer(1 / 60)

        timer.update = function update(deltaTime) {


            level.update(deltaTime)

            if (player.pos.x > 100) {
                camera.pos.x = player.pos.x - 100
            }

            level.comp.draw(context, camera)


        }
        timer.start(0)
    }

    const canvas = document.getElementById('screen');
    main(canvas)


