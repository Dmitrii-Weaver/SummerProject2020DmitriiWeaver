import Timer from './timer.js'
import { makePlayer, createPlayerEnv, findPlayers } from './player.js'
import { createLevelLoader } from './loaders/levelloader.js';
import { loadFont } from './loaders/font.js';
import { loadEntities } from './entities.js'
import { setupKeyboard } from './input.js'
import { createColorLayer } from './layers/color.js'
import { createCollisionLayer } from './layers/collision.js'
import { createDashboardLayer } from './layers/dashboard.js'
import { createPlayerProgress } from './layers/PlayerProgress.js'
import SceneRunner from './sceneRunner.js';
import TimedScene from './timedScene.js'
import Scene from './scene.js';
import { createTextLayer } from './layers/text.js'


async function main(canvas) {
    const videoContext = canvas.getContext('2d');
    const audioContext = new AudioContext()
    const [entityFactory, font] = await Promise.all([
        loadEntities(audioContext),
        loadFont()
    ])

    const gameContext = {
        audioContext,
        videoContext,
        deltaTime: null,
        entityFactory
    }

    const loadLevel = await createLevelLoader(entityFactory)

    const sceneRunner = new SceneRunner()


    const player = entityFactory.player()
    makePlayer(player, "PLAYER")

    window.player = player


    const inputRouter = setupKeyboard(window)
    inputRouter.addReceiver(player)

    let shouldUpdate = false


    const loadScreen = new Scene()
    loadScreen.comp.layers.push(createColorLayer('#000'))
    loadScreen.comp.layers.push(createTextLayer(font, `BE A BOAR. DO THE ROAR.`))
    sceneRunner.addScene(loadScreen)

    const next = () => {
        window.removeEventListener('click', next)
        sceneRunner.runNext()
    }
    window.addEventListener('click', next)



    async function runLevel(name) {

        shouldUpdate = false

        const level = await loadLevel(name)

        level.events.listen(level.EVENT_TRIGGER, (spec, trigger, touches) => {
            if (spec.type === 'goto') {
                for (const _ of findPlayers(touches)) {
                    runLevel(spec.name)
                    return;
                }
            }
        })

        const playerProgressLayer = createPlayerProgress(font, level)
        const dashboardLayer = createDashboardLayer(font, level)


        player.pos.set(32, 150)
        level.entities.add(player)
        const playerEnv = createPlayerEnv(player, gameContext)
        level.entities.add(playerEnv)

        const waitScreen = new TimedScene()
        waitScreen.comp.layers.push(createColorLayer('#000'))
        waitScreen.comp.layers.push(dashboardLayer)
        waitScreen.comp.layers.push(playerProgressLayer)
        sceneRunner.addScene(waitScreen)

        //level.comp.layers.push(createCollisionLayer(level))
        level.comp.layers.push(dashboardLayer)
        sceneRunner.addScene(level)

        sceneRunner.runNext()

        shouldUpdate = true

    }





    const timer = new Timer(1 / 60)

    timer.update = function update(deltaTime) {
        gameContext.deltaTime = deltaTime

        if (shouldUpdate){
        sceneRunner.update(gameContext)
    }

    }
    timer.start()
    runLevel('1-1')
    window.runLevel = runLevel
}

const canvas = document.getElementById('screen');
main(canvas)
