import Level from '../level.js'
import Entity from '../entity.js'
import { Matrix } from '../math.js'
import { createSpriteLayer } from '../layers/sprites.js';
import {createBackgroundLayer} from '../layers/background.js'
import {  loadMusicSheet } from './music.js'
import {  loadSpriteSheet } from './sprite.js'
import { loadJSON } from '../loaders.js'
import LevelTimer from '../traits/levelTimer.js';

function createTimer(){
    const timer = new Entity()
    timer.addTrait(new LevelTimer)
    return timer
}

function setupBehaviour(level){
    const timer = createTimer()
    level.entities.add(timer)

    level.events.listen(LevelTimer.EVENT_TIMER_OK, ()=>{
        level.music.playTheme()
    })
    level.events.listen(LevelTimer.EVENT_TIMER_HURRY, () => {
        level.music.playHurryTheme()
    })

}

function setupBackgrounds(levelSpec, level, backgroundSprites) {
    levelSpec.layers.forEach(layer => {
        const grid = createGrid(layer.tiles, levelSpec.patterns)

        const backgroundLayer = createBackgroundLayer(level, grid, backgroundSprites)
        level.comp.layers.push(backgroundLayer)
        level.tileCollider.addGrid(grid)
    })
}

function setupEntities(levelSpec, level, entityFactory) {

    levelSpec.entities.forEach(({name, pos:[x,y]}) => {
        const createEntity = entityFactory[name]
        const entity = createEntity()
        entity.pos.set(x,y)
        level.entities.add(entity)

    })
    const spriteLayer = createSpriteLayer(level.entities)
    level.comp.layers.push(spriteLayer)
}

export function createLevelLoader(entityFactory) {
    return function loadLevel(name) {
        return loadJSON(`/levels/${name}.json`)
            .then(levelSpec => Promise.all([
                levelSpec,
                loadSpriteSheet(levelSpec.spriteSheet),
                loadMusicSheet(levelSpec.musicSheet)
            ]))
            .then(([levelSpec, backgroundSprites, musicPlayer]) => {
                console.log(musicPlayer)
                const level = new Level()
                level.music.setPlayer(musicPlayer)
                
                setupBackgrounds(levelSpec, level, backgroundSprites)
                setupEntities(levelSpec, level, entityFactory)
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