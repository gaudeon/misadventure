import gameConfig from '../../config/game.json';

export default (superclass) => class extends superclass {
    setCurrentRoom (roomId) {
        if (typeof gameConfig.rooms[roomId] === 'object')
            this.currentRoomId = roomId;
    }

    getCurrentRoom () { return this.currentRoomId }

    currentRoomInfo () {
        if (this.currentRoomId)
            return gameConfig.rooms[this.currentRoomId];

        return null
    }
}