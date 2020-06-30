import { loadPlayer } from './entities/player.js';
import {loadEnemy1} from './entities/enemy1.js';
import {loadTurtle} from './entities/turtle.js';

export function loadEntities(){
    const entityFactories = {};

    function addAs(name) {
        return (factory => entityFactories[name] = factory)
    }

    return Promise.all([
        loadPlayer().then(addAs('player')),
        loadEnemy1().then(addAs('enemy1')),
        loadTurtle().then(addAs('turtle'))
    ])
    .then(() => entityFactories)
}