import Camera from './Camera.js'
import Timer from './timer.js'
import Entity from './entity.js'
import playerController from './traits/playerController.js'
import { createLevelLoader } from './loaders/levelloader.js';
import { loadFont } from './loaders/font.js';
import { loadEntities } from './entities.js'
import { setupKeyboard } from './input.js'
import { createCollisionLayer } from './layers/collision.js'
import { createDashboardLayer } from './layers/dashboard.js'

function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity()
    const playerControl = new playerController()
    playerControl.checkpoint.set(64, 64)
    playerControl.setPlayer(playerEntity)
    playerEnv.addTrait(playerControl)
    return playerEnv
}

async function main(canvas) {
    const context = canvas.getContext('2d');

    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont()
    ])
    const loadLevel = await createLevelLoader(entityFactory)
    const level = await loadLevel('1-1')

    const camera = new Camera()

    const player = entityFactory.player()

    const playerEnv = createPlayerEnv(player)
    level.entities.add(playerEnv)

    level.comp.layers.push(createCollisionLayer(level))
    level.comp.layers.push(createDashboardLayer(font))


    const input = setupKeyboard(player)
    input.listenTo(window)



    const timer = new Timer(1 / 60)

    timer.update = function update(deltaTime) {


        level.update(deltaTime)


        camera.pos.x = Math.max(0, player.pos.x - 100)


        level.comp.draw(context, camera)
    }
    timer.start(0)
}

const canvas = document.getElementById('screen');
main(canvas)


