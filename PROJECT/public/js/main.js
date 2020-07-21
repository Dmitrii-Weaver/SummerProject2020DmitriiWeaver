
import Level from './level.js'
import Timer from './timer.js'
import { createPlayer, createPlayerEnv } from './player.js'
import { createLevelLoader } from './loaders/levelloader.js';
import { loadFont } from './loaders/font.js';
import { loadEntities } from './entities.js'
import { setupKeyboard } from './input.js'
import { createColorLayer } from './layers/color.js'
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


    const player = createPlayer(entityFactory.player())
    player.player.name = "MARIO"


    const inputRouter = setupKeyboard(window)
    inputRouter.addReceiver(player)

    let shouldUpdate = false



    async function runLevel(name) {

        shouldUpdate = false
        const level = await loadLevel(name)

        level.events.listen(level.EVENT_TRIGGER, (spec, trigger, touches) => {
            if (spec.type === 'goto') {
                for (const entity of touches) {
                    if (entity.player) {
                        runLevel(spec.name)
                        return;
                    }
                }
            }
        })

        const playerProgressLayer = createPlayerProgress(font, level)
        const dashboardLayer = createDashboardLayer(font, level)


        player.pos.set(0, 0)
        level.entities.add(player)
        const playerEnv = createPlayerEnv(player)
        level.entities.add(playerEnv)

        const waitScreen = new CompositionScene()
        waitScreen.comp.layers.push(createColorLayer('#000'))
        waitScreen.comp.layers.push(dashboardLayer)
        waitScreen.comp.layers.push(playerProgressLayer)
        sceneRunner.addScene(waitScreen)

        level.comp.layers.push(createCollisionLayer(level))
        level.comp.layers.push(dashboardLayer)
        sceneRunner.addScene(level)

        sceneRunner.runNext()
        shouldUpdate = true

    }

    const gameContext = {
        audioContext,
        videoContext,
        deltaTime: null,
        entityFactory
    }



    const timer = new Timer(1 / 60)

    timer.update = function update(deltaTime) {
        gameContext.deltaTime = deltaTime
        if (shouldUpdate) {
            sceneRunner.update(gameContext)
        }
    }
    timer.start()
    runLevel('debug-progr')
    window.runLevel = runLevel
}

const canvas = document.getElementById('screen');
const start = () => {
    window.removeEventListener('click', start)
    main(canvas)
}
window.addEventListener('click', start)


