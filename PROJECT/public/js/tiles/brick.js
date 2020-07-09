import { Sides } from '../entity.js'

function handleX({entity, match}) {
    if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
            entity.obstruct(Sides.RIGHT, match)
        }
    }
    else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
            entity.obstruct(Sides.LEFT, match)
        }
    }
    else {
        return
    }
}
function handleY({entity, match, resolver, gameContext, level}) {
    if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
            entity.obstruct(Sides.BOTTOM, match)
        }
    }
    else if (entity.vel.y < 0) {
        if (entity.player) {
            const grid = resolver.matrix
            grid.delete(match.indexX, match.indexY)
            const enemy1 = gameContext.entityFactory.enemy1()
            enemy1.vel.set(50, -400)
            enemy1.pos.set(entity.pos.x, match.y1)
            level.entities.add(enemy1)
        }
        if (entity.bounds.top < match.y2) {
            entity.obstruct(Sides.TOP, match)
        }
    }
}

export const brick = [handleX, handleY]