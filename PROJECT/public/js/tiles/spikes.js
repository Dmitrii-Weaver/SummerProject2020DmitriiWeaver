import { Sides } from '../entity.js'
import Player from '../traits/player.js'
import Killable from '../traits/killable.js';

function handleX({entity, match}) {

}
function handleY({entity, match,}) {
 if (entity.vel.y > 0) {
        if (entity.traits.has(Player)) {
            if (entity.traits.get(Player).lives == 0 && entity.traits.get(Player).canDie == true) {
                entity.sounds.add('damage')
                entity.traits.get(Killable).kill()
                location.reload();
            }
            else if ( entity.traits.get(Player).lives != 0 && entity.traits.get(Player).canDie == true){
                
                entity.traits.get(Player).lives --
                entity.sounds.add('damage')
                entity.vel.y = 0
                entity.vel.y = -500
                entity.traits.get(Player).undying()
            } 
        }
    }
}

export const spikes = [handleX, handleY]