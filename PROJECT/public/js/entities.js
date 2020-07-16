import { loadPlayer } from './entities/player.js';
import {loadEnemy1} from './entities/enemy1.js';
import {loadTurtle} from './entities/turtle.js';
import {loadBullet} from './entities/bullet.js'
import {loadCannon} from './entities/cannon.js'
export function loadEntities(audioContext){
    const entityFactories = {};

    function addAs(name) {
        return (factory => entityFactories[name] = factory)
    }

    return Promise.all([
        loadPlayer(audioContext).then(addAs('player')),
        loadEnemy1(audioContext).then(addAs('enemy1')),
        loadTurtle(audioContext).then(addAs('turtle')),
        loadBullet(audioContext).then(addAs('Bullet')),
        loadCannon(audioContext).then(addAs('cannon'))

    ])
    .then(() => entityFactories)
}