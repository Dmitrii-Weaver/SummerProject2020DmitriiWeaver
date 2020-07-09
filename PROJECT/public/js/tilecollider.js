import TileResolver from './TileResolver.js'
import {ground} from './tiles/ground.js'
import {brick} from './tiles/brick.js'

const handlers = {
    brick,
    ground

}

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix)
    }


    checkX(entity) {
        let x
        if (entity.vel.x > 0) {
            x = entity.bounds.right
        }
        else if (entity.vel.x < 0) {
            x = entity.bounds.left
        }
        else {
            return
        }

        const matches = this.tiles.searchByRange(
            x, x,
            entity.bounds.top, entity.bounds.bottom)

        matches.forEach(match => {
            this.handle(0,entity, match, this.tiles)

        })

    }
    checkY(entity) {
        let y
        if (entity.vel.y > 0) {
            y = entity.bounds.bottom
        }
        else if (entity.vel.y < 0) {
            y = entity.bounds.top
        }
        else {
            return
        }

        const matches = this.tiles.searchByRange(
            entity.bounds.left, entity.bounds.right,
            y, y)

        matches.forEach(match => {
            this.handle(1,entity, match, this.tiles)
        })

    }

    handle(index, entity,match, tiles){
        const handler = handlers[match.tile.type]
        if (handler) {
            handler[index](entity, match, tiles)
        }

    }
}