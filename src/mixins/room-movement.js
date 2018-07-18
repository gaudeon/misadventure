import gameConfig from '../config/game.json';

import CurrentRoom from '../scenes/play-game/current-room';

export default (superclass) => class extends superclass {
    setCurrentRoom (roomId) {
        if (this.isValidRoom(roomId))
            this.currentRoomId = roomId;
    }

    getCurrentRoom () { return this.currentRoomId }

    currentRoomInfo () {
        if (this.currentRoomId)
            return gameConfig.rooms[this.currentRoomId];

        return null
    }

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

    isValidRoom (roomId) { return typeof gameConfig.rooms[roomId] === 'object' }

    findExit (roomId, direction) {
        if (!this.isValidRoom(roomId))
            return null;

        if (typeof gameConfig.rooms[roomId].exits !== 'object')
            throw `exits not defined for room ${roomId}`;

        let exit = gameConfig.rooms[roomId].exits[direction];

        if (!this.isValidRoom(exit))
            return null
        
        return exit;
    }

    exitRoom (currentRoom, direction) {
        let exit = this.findExit(currentRoom.roomId, direction);

        if (exit != null) {
            this.setCurrentRoom(exit);

            currentRoom.changeRoom(exit);
        } else {
            console.log(`${this.constructor.name} needs to exit room ${currentRoom.roomId} at ${direction}`);
        }
    }
}