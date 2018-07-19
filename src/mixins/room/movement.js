import gameConfig from '../../config/game.json';

import CurrentRoom from '../../scenes/play-game/current-room';

export default (superclass) => class extends superclass {
    onEdge (currentRoom, direction) {
        if (!(currentRoom instanceof CurrentRoom))
            throw 'current room provided is not an instance of CurrentRoom';

        if (!direction.match(/^(north|south|east|west)$/))
            throw 'direction is not valid (north|south|east|west)'

        if (direction === 'north')
            this.setY(this.scene.cameras.main.height - this.body.height/2 - 1);
        else if (direction === 'south')
            this.setY(1 + this.body.height/2);
        else if (direction === 'east')
            this.setX(1 + this.body.width/2);
        else if (direction === 'west')
            this.setX(this.scene.cameras.main.width - this.body.width/2 - 1);

        // call exit room after - to allow for the exitRoom to move to some other location
        this.exitRoom(currentRoom, direction);
    }

    findExit (roomId, direction) {
        if (typeof gameConfig.rooms[roomId] !== 'object')
            return null;

        if (typeof gameConfig.rooms[roomId].exits !== 'object')
            throw `exits not defined for room ${roomId}`;

        let exit = gameConfig.rooms[roomId].exits[direction];

        if (typeof gameConfig.rooms[roomId] !== 'object')
            return null
        
        return exit;
    }

    exitRoom (currentRoom, direction) {
        let exit = this.findExit(currentRoom.roomId, direction);

        if (exit != null) {
            if (typeof this.setCurrentRoom === 'function')
                this.setCurrentRoom(exit);

            currentRoom.changeRoom(exit);
        } else {
            console.log(`${this.constructor.name} needs to exit room ${currentRoom.roomId} at ${direction}`);
        }
    }
}