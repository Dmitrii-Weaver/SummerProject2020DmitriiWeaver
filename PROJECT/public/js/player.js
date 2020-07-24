import Entity from './entity.js'
import playerController from './traits/playerController.js'
import Player from './traits/player.js'



export function createPlayerEnv(playerEntity, gameContext) {
    const playerEnv = new Entity()
    const playerControl = new playerController(gameContext)
    playerControl.checkpoint.set(64, 64)
    playerControl.setPlayer(playerEntity)
    playerEnv.addTrait(playerControl)
    return playerEnv
}

export function makePlayer(entity, name){
    const player = new Player()
    player.name = "BOAR"
    entity.addTrait(player)
    
}

export function* findPlayers(entities) {
    for(const entity of entities){
        if(entity.traits.has(Player)){
            yield entity
        }
    }
}