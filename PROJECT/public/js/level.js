
import Compositor from './Compositor.js'
import MusicController from './musicController.js'
import EntityCollider from './entityCollider.js'
import TileCollider from './tilecollider.js'
import EventEmitter from './eventEmitter.js'


export default class Level {
    constructor() {
        this.gravity = 1500
        this.totalTime = 0

        this.events = new EventEmitter()
        this.music = new MusicController()

        this.comp = new Compositor()
        this.entities = new Set()

        this.entityCollider = new EntityCollider(this.entities)
        this.tileCollider = new TileCollider()


    }


    update(gameContext) {
        this.entities.forEach(entity => {
            entity.update(gameContext, this)
        })

        this.entities.forEach(entity => {
                this.entityCollider.check(entity)
            
        })

        this.entities.forEach(entity => {
            entity.finalize()
        })

        this.totalTime += gameContext.deltaTime
    }
}