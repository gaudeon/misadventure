import gameConfig from '../../config/game.json';

import CurrentRoom from '../../scenes/play-game/current-room';

export default (superclass) => class extends superclass {
    onEdge (currentRoom, direction) {
        if (!(currentRoom instanceof CurrentRoom))
            throw 'current room provided is not an instance of CurrentRoom';

        if (!direction.match(/^(north|south|east|west)$/))
            throw 'direction is not valid (north|south|east|west)'

        // call exit room after - to allow for the exitRoom to move to some other location
        this.exitRoom(currentRoom, direction);
    }

    findExit (roomId, direction) {
        if (typeof gameConfig.rooms[roomId] !== 'object')
            return null;

        if (typeof gameConfig.rooms[roomId].exits !== 'object')
            throw `exits not defined for room ${roomId}`;

        let exit = gameConfig.rooms[roomId].exits[direction];

        if (typeof exit === 'object') {
            exit = exit.room;
        }

        if (typeof gameConfig.rooms[exit] !== 'object')
            return null
        
        return exit;
    }

    calculateEntryPoint (direction, exit) {
        if (direction === 'north') {
            if (typeof gameConfig.rooms[exit].exits['south'] === 'object') {
                const { topLeftTile } = gameConfig.rooms[exit].exits['south'].zone;

                this.setY( topLeftTile.y * gameConfig.tileHeight - gameConfig.tileHeight );
            } else {
                this.setY(this.scene.cameras.main.height - this.body.height/2 - 1);
            }
        }
        else if (direction === 'south') {
            if (typeof gameConfig.rooms[exit].exits['north'] === 'object') {
                const { topLeftTile, tileHeight } = gameConfig.rooms[exit].exits['north'].zone;

                this.setY( topLeftTile.y * gameConfig.tileHeight + tileHeight * gameConfig.tileHeight + gameConfig.tileHeight );
            } else {
                this.setY(1 + this.body.height/2);
            }
        }
        else if (direction === 'east') {
            if (typeof gameConfig.rooms[exit].exits['west'] === 'object') {
                const { topLeftTile, tileWidth } = gameConfig.rooms[exit].exits['west'].zone;

                this.setX( topLeftTile.x * gameConfig.tileWidth + tileWidth * gameConfig.tileWidth + gameConfig.tileWidth );
            } else {
                this.setX(1 + this.body.width/2);
            }
        }
        else if (direction === 'west') {
            if (typeof gameConfig.rooms[exit].exits['east'] === 'object') {
                const { topLeftTile } = gameConfig.rooms[exit].exits['east'].zone;

                this.setX( topLeftTile.x * gameConfig.tileWidth - gameConfig.tileWidth );
            } else {
                this.setX(this.scene.cameras.main.width - this.body.width/2 - 1);
            }
        }
    }

    exitRoom (currentRoom, direction) {
        let exit = this.findExit(currentRoom.roomId, direction);

        if (exit != null) {
            if (typeof this.setCurrentRoom === 'function')
                this.setCurrentRoom(exit);

            this.calculateEntryPoint (direction, exit);

            currentRoom.changeRoom(exit);
        } else {
            console.log(`${this.constructor.name} needs to exit room ${currentRoom.roomId} at ${direction}`);
        }
    }
}