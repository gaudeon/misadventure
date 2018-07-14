import gameConfig from '../config/game.json';

export default class Room {
    constructor (number) {
        this.roomNumber = number;
        let roomConfig = gameConfig.rooms[number];
        this.exits = roomConfig.exits;
        this.map = roomConfig.map;
        this.fog = roomConfig.fog;
    }

    // direction should be one of 'north', 'east', 'south', or 'west'
    exit (direction) {
        return this.exits[direction];
    }
}
