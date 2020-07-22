import Level from '../level.js'
import Entity from '../entity.js'
import { Matrix } from '../math.js'
import { createSpriteLayer } from '../layers/sprites.js';
import { createBackgroundLayer } from '../layers/background.js'
import { loadMusicSheet } from './music.js'
import { loadSpriteSheet } from './sprite.js'
import { loadJSON } from '../loaders.js'
import LevelTimer from '../traits/levelTimer.js';
import Trigger from '../traits/trigger.js';
import Trait from '../trait.js'

function createTimer() {
    const timer = new Entity()
    timer.addTrait(new LevelTimer)
    return timer
}

function createSpawner(){
    class Spawner extends Trait{
        constructor(){
            super()
            this.entities = []
            this.offsetX = 64
        }

        addEntity(entity){
            this.entities.push(entity)
            this.entities.sort((a,b) => a.pos.x < b.pos.x ? -1 : 1)

        }
        update(entity, gameContext, level){
            const cameraMaxX = level.camera.pos.x + level.camera.size.x + this.offsetX
            while (this.entities[0]){
                if (cameraMaxX > this.entities[0].pos.x){
                    level.entities.add(this.entities.shift())
                }
                else break
            }
        }
    }

    return new Spawner()
}


function loadPattern(name) {
    return loadJSON(`/sprites/patterns/${name}.json`)
}


function setupBehaviour(level) {
    const timer = createTimer()
    level.entities.add(timer)

    level.events.listen(LevelTimer.EVENT_TIMER_OK, () => {
        level.music.playTheme()
    })
    level.events.listen(LevelTimer.EVENT_TIMER_HURRY, () => {
        level.music.playHurryTheme()
    })

}

function setupBackgrounds(levelSpec, level, backgroundSprites, patterns) {
    levelSpec.layers.forEach(layer => {
        const grid = createGrid(layer.tiles, patterns)

        const backgroundLayer = createBackgroundLayer(level, grid, backgroundSprites)
        level.comp.layers.push(backgroundLayer)
        level.tileCollider.addGrid(grid)
    })
}

function setupEntities(levelSpec, level, entityFactory) {
    const spawner = createSpawner()
    levelSpec.entities.forEach(({ name, pos: [x, y] }) => {
        const createEntity = entityFactory[name]
        const entity = createEntity()
        entity.pos.set(x, y)
        spawner.addEntity(entity)

    })

    const entityProxy = new Entity()
    entityProxy.addTrait(spawner)
    level.entities.add(entityProxy)

    const spriteLayer = createSpriteLayer(level.entities)
    level.comp.layers.push(spriteLayer)
}
function setupTriggers(levelSpec, level) {
    if (!levelSpec.triggers) {
        return
    }
    for (const triggerSpec of levelSpec.triggers) {  
        const trigger = new Trigger()
        trigger.conditions.push((entity, touches, gc, level) => {
            level.events.emit(level.EVENT_TRIGGER, triggerSpec, entity, touches)
        })
        const entity = new Entity()
        entity.addTrait(trigger)
        entity.size.set(16,256)
        entity.pos.set(triggerSpec.pos[0], triggerSpec.pos[1])
        level.entities.add(entity)
    }
}

export function createLevelLoader(entityFactory) {
    return function loadLevel(name) {
        return loadJSON(`/levels/${name}.json`)
            .then(levelSpec => Promise.all([
                levelSpec,
                loadSpriteSheet(levelSpec.spriteSheet),
                loadMusicSheet(levelSpec.musicSheet),
                loadPattern(levelSpec.patternSheet)
            ]))
            .then(([levelSpec, backgroundSprites, musicPlayer, patterns]) => {
                console.log(musicPlayer)
                const level = new Level()
                level.name = name
                level.music.setPlayer(musicPlayer)

                setupBackgrounds(levelSpec, level, backgroundSprites, patterns)
                setupEntities(levelSpec, level, entityFactory)
                setupTriggers(levelSpec, level)
                setupBehaviour(level)
                return level
            })
    }
}

function createGrid(tiles, patterns) {
    const grid = new Matrix()
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, tile)

    }
    return grid
}

function* expandSpan(xStart, xLength, yStart, yLength) {
    const xEnd = xStart + xLength
    const yEnd = yStart + yLength
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield ({ x, y })
        }
    }
}
function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range
        return expandSpan(xStart, xLength, yStart, yLength)
    }

    else if (range.length === 3) {
        const [xStart, xLength, yStart] = range
        return expandSpan(xStart, xLength, yStart, 1)
    }

    else if (range.length === 2) {
        const [xStart, yStart] = range
        return expandSpan(xStart, 1, yStart, 1)
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range)
    }
}


function* expandTiles(tiles, patterns) {
    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const DerivedX = x + offsetX
                const DerivedY = y + offsetY
                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles
                    yield* walkTiles(tiles, DerivedX, DerivedY)

                }
                else {
                    yield {
                        tile, x: DerivedX, y: DerivedY
                    }

                }
            }
        }
    }
    yield* walkTiles(tiles, 0, 0)
}