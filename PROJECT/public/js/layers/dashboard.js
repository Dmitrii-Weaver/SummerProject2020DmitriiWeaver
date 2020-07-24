import { findPlayers } from "../player.js"
import Player from '../traits/player.js'
import levelTimer from '../traits/levelTimer.js'

function getPlayerTrait(entities) {
    for (const entity of findPlayers(entities)) {
        return entity.traits.get(Player)
    }
}
function getTimerTrait(entities) {
    for (const entity of entities) {
        if (entity.traits.has(levelTimer)) {
            return entity.traits.get(levelTimer)
        }

    }
}

let name
let score
let lives
let acorns
export function createDashboardLayer(font, level) {


    const LINE1 = font.size * 2
    const LINE2 = font.size * 3


    const timerTrait = getTimerTrait(level.entities)

    return function drawDashboard(context) {
        const playerTrait = getPlayerTrait(level.entities)

        if (playerTrait != undefined) {
            name =playerTrait.name
            score=playerTrait.score
            lives =playerTrait.lives
            acorns =playerTrait.acorns
       }

        font.print(name, context, 24, LINE1)
        font.print(score.toString().padStart(6, '0'), context, 24, LINE2)

        font.print('+' + lives.toString().padStart(2, '0'), context, 96, LINE1)
        font.print('@x' + acorns.toString().padStart(2, '0'), context, 88, LINE2)

        font.print('WORLD', context, 136, LINE1)
        font.print(level.name, context, 144, LINE2)
        font.print('TIME', context, 200, LINE1)
        font.print(timerTrait.currentTime.toFixed().toString().padStart(3, '0'), context, 216, LINE2)
    }
}