import Entity from './entity.js'
import playerController from './traits/playerController.js'
import player from './traits/player.js'



export function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity()
    const playerControl = new playerController()
    playerControl.checkpoint.set(64, 64)
    playerControl.setPlayer(playerEntity)
    playerEnv.addTrait(playerControl)
    return playerEnv
}

export function createPlayer(entity){
    entity.addTrait(new player())
    return entity
}

export function* findPlayers(level) {
    for(const entity of level.entities){
        if(entity.player){
            yield entity
        }
    }
}