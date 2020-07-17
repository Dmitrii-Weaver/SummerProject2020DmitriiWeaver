
import Timer from './timer.js'
import {createPlayer, createPlayerEnv} from './player.js'
import { createLevelLoader } from './loaders/levelloader.js';
import { loadFont } from './loaders/font.js';
import { loadEntities } from './entities.js'
import { setupKeyboard } from './input.js'
import { createCollisionLayer } from './layers/collision.js'
import { createDashboardLayer } from './layers/dashboard.js'
import { createPlayerProgress } from './layers/PlayerProgress.js'
import SceneRunner from './sceneRunner.js';
import CompositionScene from './compositionScene.js'

async function main(canvas) {
    const videoContext = canvas.getContext('2d');
    const audioContext = new AudioContext()
    const [entityFactory, font] = await Promise.all([
        loadEntities(audioContext),
        loadFont()
    ])
    

    const loadLevel = await createLevelLoader(entityFactory)
   
   const sceneRunner = new SceneRunner()
   
    const level = await loadLevel('1-2')

    const playerProgressLayer = createPlayerProgress(font,level)
    const dashboardLayer = createDashboardLayer(font, level)

    const player = createPlayer(entityFactory.player()) 
    player.player.name = "MARIO"
    level.entities.add(player)
    const playerEnv = createPlayerEnv(player)
    level.entities.add(playerEnv)

    const waitScreen = new CompositionScene()
    waitScreen.comp.layers.push(dashboardLayer)
    waitScreen.comp.layers.push(playerProgressLayer)


    level.comp.layers.push(createCollisionLayer(level))
    level.comp.layers.push(dashboardLayer)

    const inputRouter = setupKeyboard(window)
    inputRouter.addReceiver(player)

    sceneRunner.addScene(waitScreen)
    sceneRunner.addScene(level)

    const gameContext = {
        audioContext,
        videoContext,
        deltaTime: null,
        entityFactory
    }



    const timer = new Timer(1 / 60)

    timer.update = function update(deltaTime) {
        gameContext.deltaTime = deltaTime
        sceneRunner.update(gameContext)
    }
    timer.start()
    sceneRunner.runNext()
}

const canvas = document.getElementById('screen');
const start = () => {
    window.removeEventListener('click', start)
    main(canvas)
}
window.addEventListener('click', start)


